const { getDb } = require('../db/database');

// --- Pure functions (unit testable, no DB dependency) ---

function calculateMonthlyEquivalent(price, billingCycle) {
  if (billingCycle === 'annual') return Math.round((price / 12) * 100) / 100;
  if (billingCycle === 'weekly') return Math.round(price * 4.33 * 100) / 100;
  return price;
}

function calculateRenewalDate(startDate, billingCycle) {
  const date = new Date(startDate);
  if (billingCycle === 'monthly') date.setMonth(date.getMonth() + 1);
  else if (billingCycle === 'annual') date.setFullYear(date.getFullYear() + 1);
  else if (billingCycle === 'weekly') date.setDate(date.getDate() + 7);
  return date.toISOString().split('T')[0];
}

function getUpcomingRenewals(subscriptions, daysAhead = 7) {
  const now = new Date();
  const cutoff = new Date();
  cutoff.setDate(now.getDate() + daysAhead);

  return subscriptions.filter((sub) => {
    if (sub.status !== 'active') return false;
    const renewal = new Date(sub.renewal_date);
    return renewal >= now && renewal <= cutoff;
  });
}

function calculateMonthlySummary(subscriptions) {
  const active = subscriptions.filter((s) => s.status === 'active');

  const totalMonthly = active.reduce((sum, s) => {
    return sum + calculateMonthlyEquivalent(s.price, s.billing_cycle);
  }, 0);

  const byCategory = {};
  active.forEach((s) => {
    const key = s.category_name || 'Other';
    if (!byCategory[key]) byCategory[key] = { total: 0, count: 0, color: s.category_color || '#6b7280' };
    byCategory[key].total += calculateMonthlyEquivalent(s.price, s.billing_cycle);
    byCategory[key].count += 1;
  });

  return {
    totalMonthly: Math.round(totalMonthly * 100) / 100,
    totalAnnual: Math.round(totalMonthly * 12 * 100) / 100,
    activeCount: active.length,
    byCategory,
  };
}

function validateSubscription(data) {
  const errors = [];
  if (!data.name || data.name.trim().length === 0) errors.push('Name is required.');
  if (data.name && data.name.trim().length > 100) errors.push('Name must be at most 100 characters.');
  if (data.price === undefined || data.price === null || data.price === '') errors.push('Price is required.');
  if (isNaN(Number(data.price)) || Number(data.price) < 0) errors.push('Price must be a valid positive number.');
  if (!['monthly', 'annual', 'weekly'].includes(data.billing_cycle)) errors.push('Billing cycle must be monthly, annual, or weekly.');
  if (!data.start_date || isNaN(Date.parse(data.start_date))) errors.push('A valid start date is required.');
  if (data.status && !['active', 'paused', 'cancelled'].includes(data.status)) errors.push('Status must be active, paused, or cancelled.');
  return errors;
}

// --- DB-dependent functions (require userId for isolation) ---

function getAllSubscriptions(filters = {}, userId) {
  const db = getDb();
  let query = `
    SELECT s.*, c.name AS category_name, c.color AS category_color
    FROM subscriptions s
    LEFT JOIN categories c ON s.category_id = c.id
    WHERE s.user_id = ?
  `;
  const params = [userId];

  if (filters.search) {
    query += ' AND (s.name LIKE ? OR s.notes LIKE ?)';
    params.push(`%${filters.search}%`, `%${filters.search}%`);
  }
  if (filters.category_id) {
    query += ' AND s.category_id = ?';
    params.push(filters.category_id);
  }
  if (filters.status) {
    query += ' AND s.status = ?';
    params.push(filters.status);
  }

  query += ' ORDER BY s.renewal_date ASC';
  return db.prepare(query).all(...params);
}

function getSubscriptionById(id, userId) {
  const db = getDb();
  const query = userId
    ? 'SELECT s.*, c.name AS category_name, c.color AS category_color FROM subscriptions s LEFT JOIN categories c ON s.category_id = c.id WHERE s.id = ? AND s.user_id = ?'
    : 'SELECT s.*, c.name AS category_name, c.color AS category_color FROM subscriptions s LEFT JOIN categories c ON s.category_id = c.id WHERE s.id = ?';

  return userId
    ? db.prepare(query).get(id, userId)
    : db.prepare(query).get(id);
}

function createSubscription(data, userId) {
  const db = getDb();
  const renewalDate = calculateRenewalDate(data.start_date, data.billing_cycle);

  const result = db.prepare(`
    INSERT INTO subscriptions (user_id, name, price, billing_cycle, start_date, renewal_date, category_id, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    userId,
    data.name.trim(),
    Number(data.price),
    data.billing_cycle,
    data.start_date,
    renewalDate,
    data.category_id ? Number(data.category_id) : null,
    data.status || 'active',
    data.notes || null
  );

  return getSubscriptionById(Number(result.lastInsertRowid), userId);
}

function updateSubscription(id, data, userId) {
  const db = getDb();
  const existing = getSubscriptionById(id, userId);
  if (!existing) return null;

  const startDate = data.start_date || existing.start_date;
  const billingCycle = data.billing_cycle || existing.billing_cycle;
  const renewalDate = calculateRenewalDate(startDate, billingCycle);

  db.prepare(`
    UPDATE subscriptions
    SET name = ?, price = ?, billing_cycle = ?, start_date = ?, renewal_date = ?,
        category_id = ?, status = ?, notes = ?
    WHERE id = ? AND user_id = ?
  `).run(
    (data.name || existing.name).trim(),
    data.price !== undefined ? Number(data.price) : existing.price,
    billingCycle,
    startDate,
    renewalDate,
    data.category_id !== undefined ? (data.category_id ? Number(data.category_id) : null) : existing.category_id,
    data.status || existing.status,
    data.notes !== undefined ? data.notes : existing.notes,
    id,
    userId
  );

  return getSubscriptionById(id, userId);
}

function deleteSubscription(id, userId) {
  const db = getDb();
  const result = db.prepare('DELETE FROM subscriptions WHERE id = ? AND user_id = ?').run(id, userId);
  return result.changes > 0;
}

const VALID_FREQUENCIES = ['daily', 'weekly', 'monthly', 'rarely', 'never', 'unknown'];

function reviewSubscription(id, data, userId) {
  const db = getDb();
  const existing = getSubscriptionById(id, userId);
  if (!existing) return null;

  const freq = data.usage_frequency || 'unknown';
  if (!VALID_FREQUENCIES.includes(freq)) {
    const err = new Error(`usage_frequency must be one of: ${VALID_FREQUENCIES.join(', ')}`);
    err.code = 'VALIDATION';
    throw err;
  }

  const rating = (data.value_rating !== undefined && data.value_rating !== null && data.value_rating !== '')
    ? Number(data.value_rating) : null;
  if (rating !== null && (isNaN(rating) || rating < 1 || rating > 5)) {
    const err = new Error('value_rating must be between 1 and 5');
    err.code = 'VALIDATION';
    throw err;
  }

  const notes = data.review_notes !== undefined ? data.review_notes : existing.review_notes;

  db.prepare(`
    UPDATE subscriptions
    SET usage_frequency = ?, value_rating = ?, last_reviewed_at = ?, review_notes = ?
    WHERE id = ? AND user_id = ?
  `).run(freq, rating, new Date().toISOString(), notes || null, id, userId);

  return getSubscriptionById(id, userId);
}

function getSavingsOpportunities(subscriptions) {
  return subscriptions
    .filter(s => s.status === 'active')
    .filter(s => {
      const freq = s.usage_frequency || 'unknown';
      const rating = s.value_rating;
      return freq === 'rarely' || freq === 'never' || (rating !== null && rating !== undefined && rating <= 2);
    })
    .map(s => {
      const freq   = s.usage_frequency || 'unknown';
      const rating = s.value_rating;
      let reason = '';
      if (freq === 'never')        reason = 'Never used';
      else if (freq === 'rarely')  reason = 'Rarely used';
      else if (rating !== null && rating <= 2) reason = `Low value (${rating}/5)`;
      return { ...s, reason };
    });
}

function getSummary(userId) {
  const subscriptions = getAllSubscriptions({}, userId);
  const summary  = calculateMonthlySummary(subscriptions);
  const upcoming = getUpcomingRenewals(subscriptions, 7);
  const savings  = getSavingsOpportunities(subscriptions);
  const totalSavingsMonthly = savings.reduce(
    (sum, s) => sum + calculateMonthlyEquivalent(s.price, s.billing_cycle), 0
  );
  const reviewNeededCount = subscriptions.filter(s =>
    s.status === 'active' &&
    (!s.last_reviewed_at || (s.usage_frequency || 'unknown') === 'unknown')
  ).length;

  return {
    ...summary,
    upcomingRenewals:     upcoming,
    savingsOpportunities: savings,
    totalSavingsMonthly:  Math.round(totalSavingsMonthly * 100) / 100,
    reviewNeededCount,
  };
}

module.exports = {
  calculateMonthlyEquivalent,
  calculateRenewalDate,
  getUpcomingRenewals,
  calculateMonthlySummary,
  validateSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  reviewSubscription,
  getSavingsOpportunities,
  getSummary,
};
