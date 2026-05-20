const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '../../subscription-radar.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

let db;

function getDb() {
  if (!db) {
    db = new DatabaseSync(DB_PATH);
    db.exec('PRAGMA journal_mode = WAL');
    db.exec('PRAGMA foreign_keys = ON');

    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schema);

    // Migration: add is_system to categories if not present
    try {
      db.exec('ALTER TABLE categories ADD COLUMN is_system INTEGER NOT NULL DEFAULT 0');
    } catch (_) {
      // Column already exists in databases created before this migration.
    }

    // Migration: add subscription review columns if not present
    const reviewCols = [
      'usage_frequency TEXT NOT NULL DEFAULT "unknown"',
      'value_rating INTEGER',
      'last_reviewed_at TEXT',
      'review_notes TEXT',
    ];
    reviewCols.forEach(col => {
      try { db.exec(`ALTER TABLE subscriptions ADD COLUMN ${col}`); } catch (_) {
        // Column already exists in databases created before this migration.
      }
    });

    // Ensure all system categories are flagged
    db.exec(`
      UPDATE categories SET is_system = 1
      WHERE LOWER(name) IN (
        'entertainment','fitness','food & dining','gaming','music','other','productivity'
      )
    `);
  }
  return db;
}

module.exports = { getDb };
