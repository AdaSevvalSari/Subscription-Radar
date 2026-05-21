CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL DEFAULT '#6366f1',
  is_system INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  billing_cycle TEXT NOT NULL CHECK(billing_cycle IN ('monthly', 'annual', 'weekly')),
  start_date TEXT NOT NULL,
  renewal_date TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'cancelled')),
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS usage_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscription_id INTEGER NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  logged_at TEXT NOT NULL DEFAULT (date('now')),
  notes TEXT
);

INSERT OR IGNORE INTO categories (name, color) VALUES
  ('Entertainment', '#ef4444'),
  ('Fitness', '#22c55e'),
  ('Productivity', '#3b82f6'),
  ('Food & Dining', '#f97316'),
  ('Music', '#a855f7'),
  ('Gaming', '#eab308'),
  ('Other', '#6b7280');
