const fs = require('fs');
const path = require('path');
const crypto = require('node:crypto');

const ENV_PATH = path.join(__dirname, '../.env');
const DEV_JWT_SECRET = crypto.randomBytes(32).toString('hex');
const JWT_EXPIRES_IN = '7d';

function loadEnvFile() {
  if (!fs.existsSync(ENV_PATH)) return;

  const lines = fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/);
  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && process.env[key] === undefined) process.env[key] = value;
  });
}

function getJwtSecret() {
  loadEnvFile();

  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;

  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be set in production.');
  }

  return DEV_JWT_SECRET;
}

module.exports = {
  getJwtSecret,
  JWT_EXPIRES_IN,
};
