const { getDb } = require('../db/database');

// --- Pure functions (unit testable) ---

function calculateCostPerUse(monthlyPrice, usageCount) {
  if (usageCount <= 0) return null;
  return Math.round((monthlyPrice / usageCount) * 100) / 100;
}

function simulateCancellation(monthlyEquivalentPrice) {
  const monthly = Math.round(monthlyEquivalentPrice * 100) / 100;
  const annual = Math.round(monthly * 12 * 100) / 100;
  return { monthlySavings: monthly, annualSavings: annual };
}

function detectWaste(usageCount, lastUsedDate, inactiveDaysThreshold = 30) {
  if (usageCount === 0) {
    return { isWasted: false, status: 'untracked', reason: 'No usage has been logged yet.' };
  }

  const daysSinceLastUse = lastUsedDate
    ? Math.floor((Date.now() - new Date(lastUsedDate).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  if (daysSinceLastUse !== null && daysSinceLastUse >= inactiveDaysThreshold) {
    return {
      isWasted: true,
      status: 'inactive',
      reason: `Not used in the last ${daysSinceLastUse} days.`,
    };
  }

  return { isWasted: false, status: 'active_use', reason: 'Regularly used.' };
}

function getMonthlyUsageCount(logs) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  return logs.filter((l) => new Date(l.logged_at) >= cutoff).length;
}

// --- DB-dependent functions ---

function logUsage(subscriptionId, notes = null) {
  const db = getDb();
  const result = db.prepare(
    'INSERT INTO usage_logs (subscription_id, notes) VALUES (?, ?)'
  ).run(subscriptionId, notes || null);
  return db.prepare('SELECT * FROM usage_logs WHERE id = ?').get(Number(result.lastInsertRowid));
}

function getUsageBySubscription(subscriptionId) {
  const db = getDb();
  const logs = db.prepare(
    'SELECT * FROM usage_logs WHERE subscription_id = ? ORDER BY logged_at DESC'
  ).all(subscriptionId);

  const totalCount = logs.length;
  const lastUsedDate = logs.length > 0 ? logs[0].logged_at : null;
  const monthlyCount = getMonthlyUsageCount(logs);

  return { logs, totalCount, lastUsedDate, monthlyCount };
}

function deleteUsageLog(logId) {
  const db = getDb();
  const result = db.prepare('DELETE FROM usage_logs WHERE id = ?').run(logId);
  return result.changes > 0;
}

function getWastedSubscriptions(subscriptions) {
  const db = getDb();
  return subscriptions
    .filter((s) => s.status === 'active')
    .map((s) => {
      const logs = db.prepare(
        'SELECT * FROM usage_logs WHERE subscription_id = ? ORDER BY logged_at DESC'
      ).all(s.id);
      const totalCount = logs.length;
      const lastUsedDate = logs.length > 0 ? logs[0].logged_at : null;
      const waste = detectWaste(totalCount, lastUsedDate);
      return { ...s, usageCount: totalCount, lastUsedDate, ...waste };
    })
    .filter((s) => s.isWasted);
}

module.exports = {
  calculateCostPerUse,
  simulateCancellation,
  detectWaste,
  getMonthlyUsageCount,
  logUsage,
  getUsageBySubscription,
  deleteUsageLog,
  getWastedSubscriptions,
};
