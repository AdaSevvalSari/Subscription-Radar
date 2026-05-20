const { getDb } = require('../db/database');
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const { getJwtSecret, JWT_EXPIRES_IN } = require('../config');

// --- Pure functions (unit testable) ---

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  const inputHash = crypto.scryptSync(password, salt, 64).toString('hex');
  return hash === inputHash;
}

function generateToken(userId) {
  return jwt.sign({ userId }, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN });
}

function validateRegisterInput(data) {
  const errors = [];
  if (!data.username || data.username.trim().length < 3)
    errors.push('Username must be at least 3 characters.');
  if (data.username && data.username.trim().length > 30)
    errors.push('Username must be at most 30 characters.');
  if (!data.email || !data.email.includes('@'))
    errors.push('A valid email is required.');
  if (!data.password || data.password.length < 6)
    errors.push('Password must be at least 6 characters.');
  return errors;
}

function validateLoginInput(data) {
  const errors = [];
  if (!data.username || data.username.trim().length === 0)
    errors.push('Username is required.');
  if (!data.password || data.password.length === 0)
    errors.push('Password is required.');
  return errors;
}

// --- DB-dependent functions ---

function registerUser(data) {
  const errors = validateRegisterInput(data);
  if (errors.length > 0) return { errors };

  const db = getDb();
  const existing = db.prepare(
    'SELECT id FROM users WHERE username = ? OR email = ?'
  ).get(data.username.trim(), data.email.trim());

  if (existing) return { errors: ['Username or email already in use.'] };

  const passwordHash = hashPassword(data.password);
  const result = db.prepare(
    'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)'
  ).run(data.username.trim(), data.email.trim().toLowerCase(), passwordHash);

  const userId = Number(result.lastInsertRowid);
  const token = generateToken(userId);
  return { token, userId, username: data.username.trim() };
}

function loginUser(data) {
  const errors = validateLoginInput(data);
  if (errors.length > 0) return { errors };

  const db = getDb();
  const user = db.prepare(
    'SELECT * FROM users WHERE username = ?'
  ).get(data.username.trim());

  if (!user || !verifyPassword(data.password, user.password_hash)) {
    return { errors: ['Invalid username or password.'] };
  }

  const token = generateToken(user.id);
  return { token, userId: user.id, username: user.username };
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  validateRegisterInput,
  validateLoginInput,
  registerUser,
  loginUser,
};
