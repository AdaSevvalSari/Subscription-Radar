const { getDb } = require('../db/database');

// --- Pure functions (unit testable) ---

function validateCategory(data) {
  const errors = [];
  if (!data.name || data.name.trim().length === 0) errors.push('Category name is required.');
  if (data.name && data.name.trim().length > 50) errors.push('Category name must be at most 50 characters.');
  if (data.color && !/^#[0-9A-Fa-f]{6}$/.test(data.color)) errors.push('Color must be a valid hex code (#rrggbb).');
  return errors;
}

function isCategoryInUse(categoryId, subscriptions) {
  return subscriptions.some((s) => s.category_id === categoryId);
}

// --- DB-dependent functions ---

function getAllCategories(userId) {
  const db = getDb();
  return db.prepare(`
    SELECT c.*,
      COUNT(s.id) AS subscription_count,
      COALESCE(SUM(CASE WHEN s.status = 'active' THEN 1 ELSE 0 END), 0) AS active_count,
      COALESCE(SUM(CASE WHEN s.status = 'paused' THEN 1 ELSE 0 END), 0) AS paused_count,
      COALESCE(SUM(CASE
        WHEN s.status = 'active' AND s.billing_cycle = 'monthly' THEN s.price
        WHEN s.status = 'active' AND s.billing_cycle = 'annual'  THEN s.price / 12.0
        WHEN s.status = 'active' AND s.billing_cycle = 'weekly'  THEN s.price * 52.0 / 12.0
        ELSE 0
      END), 0) AS monthly_total,
      (SELECT s2.name FROM subscriptions s2
       WHERE s2.category_id = c.id AND s2.user_id = ? AND s2.status = 'active'
       ORDER BY s2.price DESC LIMIT 1) AS top_sub_name,
      (SELECT s2.price FROM subscriptions s2
       WHERE s2.category_id = c.id AND s2.user_id = ? AND s2.status = 'active'
       ORDER BY s2.price DESC LIMIT 1) AS top_sub_price
    FROM categories c
    LEFT JOIN subscriptions s ON s.category_id = c.id AND s.user_id = ?
    GROUP BY c.id
    ORDER BY monthly_total DESC, c.name ASC
  `).all(userId, userId, userId);
}

function getCategoryById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
}

function categoryNameExists(name, excludeId = null) {
  const db = getDb();
  const row = excludeId
    ? db.prepare('SELECT id FROM categories WHERE LOWER(name) = LOWER(?) AND id != ?').get(name.trim(), excludeId)
    : db.prepare('SELECT id FROM categories WHERE LOWER(name) = LOWER(?)').get(name.trim());
  return !!row;
}

function createCategory(data) {
  const db = getDb();
  if (categoryNameExists(data.name)) {
    const err = new Error('Category already exists');
    err.code = 'DUPLICATE';
    throw err;
  }
  const result = db.prepare(
    'INSERT INTO categories (name, color, is_system) VALUES (?, ?, 0)'
  ).run(data.name.trim(), data.color || '#6366f1');
  return getCategoryById(Number(result.lastInsertRowid));
}

function updateCategory(id, data) {
  const db = getDb();
  const existing = getCategoryById(id);
  if (!existing) return null;
  if (existing.is_system) {
    const err = new Error('System category cannot be edited');
    err.code = 'SYSTEM_PROTECTED';
    throw err;
  }
  const newName = (data.name || existing.name).trim();
  if (categoryNameExists(newName, id)) {
    const err = new Error('Category already exists');
    err.code = 'DUPLICATE';
    throw err;
  }
  db.prepare('UPDATE categories SET name = ?, color = ? WHERE id = ?').run(
    newName,
    data.color || existing.color,
    id
  );
  return getCategoryById(id);
}

function deleteCategory(id) {
  const db = getDb();
  const existing = getCategoryById(id);
  if (!existing) return { deleted: false };
  if (existing.is_system) return { deleted: false, reason: 'Default categories cannot be deleted.' };
  const subs = db.prepare('SELECT id FROM subscriptions WHERE category_id = ?').all(id);
  if (subs.length > 0) return { deleted: false, reason: 'This category is used by existing subscriptions.' };
  const result = db.prepare('DELETE FROM categories WHERE id = ?').run(id);
  return { deleted: result.changes > 0 };
}

module.exports = {
  validateCategory,
  isCategoryInUse,
  categoryNameExists,
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
