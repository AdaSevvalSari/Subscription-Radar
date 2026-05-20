const API = 'http://localhost:3001/api';

// ============================================================
// SERVICE CATALOG
// ============================================================

const CATEGORY_META = {
  'entertainment': { color: '#ef4444', description: 'Streaming, movies, TV' },
  'music':         { color: '#a855f7', description: 'Music and audio services' },
  'fitness':       { color: '#22c55e', description: 'Gyms, workout apps, wellness' },
  'productivity':  { color: '#3b82f6', description: 'Work tools, AI, cloud apps' },
  'gaming':        { color: '#eab308', description: 'Games, consoles, platforms' },
  'food & dining': { color: '#f97316', description: 'Food delivery and dining' },
  'other':         { color: '#6b7280', description: 'Everything else' },
};

const BUILT_IN_CATEGORIES = [
  { name: 'Entertainment', key: 'entertainment' },
  { name: 'Music',         key: 'music'         },
  { name: 'Fitness',       key: 'fitness'        },
  { name: 'Productivity',  key: 'productivity'   },
  { name: 'Gaming',        key: 'gaming'         },
  { name: 'Food & Dining', key: 'food & dining'  },
  { name: 'Other',         key: 'other'          },
];

const CATEGORY_ALIASES = {
  'entertainment': ['entertainment', 'streaming', 'tv', 'tv & movies', 'movies', 'video'],
  'music':         ['music', 'audio', 'podcast', 'podcasts'],
  'fitness':       ['fitness', 'health', 'wellness', 'gym', 'sport', 'sports'],
  'productivity':  ['productivity', 'work', 'ai', 'cloud', 'tools', 'software', 'storage'],
  'gaming':        ['gaming', 'games', 'game'],
  'food & dining': ['food & dining', 'food', 'dining', 'delivery', 'restaurant', 'restaurants'],
  'other':         ['other', 'miscellaneous', 'misc'],
};

const SERVICE_CATALOG = [
  // Entertainment
  { id: 'netflix',         name: 'Netflix',               category: 'Entertainment', description: 'Movies & TV streaming',         popular: true,  defaultBillingCycle: 'monthly', color: '#e50914', logo: 'netflix.svg' },
  { id: 'disney-plus',     name: 'Disney+',               category: 'Entertainment', description: 'Disney, Marvel, Star Wars',     popular: true,  defaultBillingCycle: 'monthly', color: '#113ccf', logo: 'Disney_wordmark.svg' },
  { id: 'amazon-prime',    name: 'Amazon Prime Video',    category: 'Entertainment', description: 'Prime Video & benefits',        popular: true,  defaultBillingCycle: 'monthly', color: '#00a8e0', logo: 'Amazon_Prime_Video_logo.svg' },
  { id: 'youtube-prem',    name: 'YouTube Premium',       category: 'Entertainment', description: 'Ad-free YouTube + music',       popular: true,  defaultBillingCycle: 'monthly', color: '#cc0000', logo: 'youtube.svg' },
  { id: 'apple-tv',        name: 'Apple TV+',             category: 'Entertainment', description: 'Apple original content',        popular: false, defaultBillingCycle: 'monthly', color: '#555566', logo: 'appletv.svg' },
  { id: 'hbo-max',         name: 'Max',                   category: 'Entertainment', description: 'HBO, Warner & DC content',      popular: true,  defaultBillingCycle: 'monthly', color: '#5822b4', logo: 'hbomax.svg' },
  { id: 'blutv',           name: 'BluTV',                 category: 'Entertainment', description: 'Turkish series & films',        popular: true,  defaultBillingCycle: 'monthly', color: '#1b75bc', logo: 'BluTV_logo.svg' },
  { id: 'exxen',           name: 'Exxen',                 category: 'Entertainment', description: 'Turkish digital content',       popular: false, defaultBillingCycle: 'monthly', color: '#ff6000', logo: null },
  { id: 'gain',            name: 'Gain',                  category: 'Entertainment', description: 'Acun Medya streaming',          popular: false, defaultBillingCycle: 'monthly', color: '#00a0c8', logo: null },
  { id: 'mubi',            name: 'MUBI',                  category: 'Entertainment', description: 'Curated arthouse cinema',       popular: false, defaultBillingCycle: 'monthly', color: '#cc0044', logo: 'mubi.svg' },
  { id: 'puhutv',          name: 'PuhuTV',                category: 'Entertainment', description: 'Doğan Media streaming',         popular: false, defaultBillingCycle: 'monthly', color: '#e63946', logo: null },
  // Music
  { id: 'spotify',         name: 'Spotify',               category: 'Music', description: 'Music & podcast streaming',    popular: true,  defaultBillingCycle: 'monthly', color: '#1db954', logo: 'spotify.svg' },
  { id: 'apple-music',     name: 'Apple Music',           category: 'Music', description: 'Apple music service',          popular: true,  defaultBillingCycle: 'monthly', color: '#fc3c44', logo: 'applemusic.svg' },
  { id: 'youtube-music',   name: 'YouTube Music',         category: 'Music', description: 'Music from YouTube',           popular: false, defaultBillingCycle: 'monthly', color: '#cc0000', logo: 'youtubemusic.svg' },
  { id: 'deezer',          name: 'Deezer',                category: 'Music', description: 'Music streaming & lyrics',     popular: false, defaultBillingCycle: 'monthly', color: '#a238ff', logo: 'deezer.svg' },
  { id: 'tidal',           name: 'Tidal',                 category: 'Music', description: 'HiFi music streaming',         popular: false, defaultBillingCycle: 'monthly', color: '#008899', logo: 'tidal.svg' },
  { id: 'soundcloud',      name: 'SoundCloud',            category: 'Music', description: 'Independent music platform',   popular: false, defaultBillingCycle: 'monthly', color: '#ff5500', logo: 'soundcloud.svg' },
  // Fitness
  { id: 'macfit',          name: 'MacFit',                category: 'Fitness', description: 'Turkish gym membership',     popular: true,  defaultBillingCycle: 'monthly', color: '#e63946', logo: null },
  { id: 'fitbod',          name: 'Fitbod',                category: 'Fitness', description: 'AI personal trainer app',    popular: false, defaultBillingCycle: 'monthly', color: '#ff6b35', logo: null },
  { id: 'strava',          name: 'Strava',                category: 'Fitness', description: 'Running & cycling tracker',  popular: true,  defaultBillingCycle: 'annual',  color: '#fc4c02', logo: 'strava.svg' },
  { id: 'nike-training',   name: 'Nike Training Club',    category: 'Fitness', description: 'Nike workout & training',    popular: false, defaultBillingCycle: 'monthly', color: '#444444', logo: 'nike.svg' },
  { id: 'freeletics',      name: 'Freeletics',            category: 'Fitness', description: 'Bodyweight HIIT training',   popular: false, defaultBillingCycle: 'monthly', color: '#cc9900', logo: 'freeletics.svg' },
  { id: 'peloton',         name: 'Peloton',               category: 'Fitness', description: 'Connected fitness classes',  popular: false, defaultBillingCycle: 'monthly', color: '#c0392b', logo: 'peloton.svg' },
  { id: 'headspace',       name: 'Headspace',             category: 'Fitness', description: 'Meditation & mindfulness',   popular: true,  defaultBillingCycle: 'annual',  color: '#f47d31', logo: 'headspace.svg' },
  // Productivity
  { id: 'chatgpt',         name: 'ChatGPT',               category: 'Productivity', description: 'AI assistant by OpenAI',      popular: true,  defaultBillingCycle: 'monthly', color: '#10a37f', logo: 'OpenAI_Logo.svg' },
  { id: 'notion',          name: 'Notion',                category: 'Productivity', description: 'Notes & project management',  popular: true,  defaultBillingCycle: 'monthly', color: '#888888', logo: 'notion.svg' },
  { id: 'google-one',      name: 'Google One',            category: 'Productivity', description: 'Google storage & perks',      popular: true,  defaultBillingCycle: 'monthly', color: '#4285f4', logo: 'google.svg' },
  { id: 'microsoft-365',   name: 'Microsoft 365',         category: 'Productivity', description: 'Office apps & cloud',         popular: true,  defaultBillingCycle: 'monthly', color: '#0078d4', logo: 'Microsoft_Office_Word_(2019–2025).svg' },
  { id: 'dropbox',         name: 'Dropbox',               category: 'Productivity', description: 'Cloud storage & sync',        popular: false, defaultBillingCycle: 'monthly', color: '#0061ff', logo: 'dropbox.svg' },
  { id: 'icloud',          name: 'iCloud+',               category: 'Productivity', description: 'Apple cloud storage',         popular: true,  defaultBillingCycle: 'monthly', color: '#3a82f6', logo: 'icloud.svg' },
  { id: 'canva',           name: 'Canva',                 category: 'Productivity', description: 'Design for everyone',         popular: true,  defaultBillingCycle: 'monthly', color: '#00c4cc', logo: 'Canva_logo.svg' },
  { id: 'figma',           name: 'Figma',                 category: 'Productivity', description: 'Collaborative UI design',     popular: true,  defaultBillingCycle: 'monthly', color: '#f24e1e', logo: 'figma.svg' },
  { id: 'grammarly',       name: 'Grammarly',             category: 'Productivity', description: 'AI writing assistant',        popular: false, defaultBillingCycle: 'monthly', color: '#15c39a', logo: 'grammarly.svg' },
  { id: 'adobe-cc',        name: 'Adobe Creative Cloud',  category: 'Productivity', description: 'Full creative suite',         popular: true,  defaultBillingCycle: 'monthly', color: '#e81123', logo: 'Adobe_Corporate_logo.svg' },
  { id: 'github-copilot',  name: 'GitHub Copilot',        category: 'Productivity', description: 'AI pair programmer',          popular: true,  defaultBillingCycle: 'monthly', color: '#6e5494', logo: 'github.svg' },
  { id: 'duolingo',        name: 'Duolingo Plus',         category: 'Productivity', description: 'Language learning app',       popular: false, defaultBillingCycle: 'annual',  color: '#58cc02', logo: 'duolingo.svg' },
  { id: '1password',       name: '1Password',             category: 'Productivity', description: 'Password manager',            popular: false, defaultBillingCycle: 'annual',  color: '#1a8cff', logo: '1password.svg' },
  // Gaming
  { id: 'xbox-gamepass',   name: 'Xbox Game Pass',        category: 'Gaming', description: 'Xbox & PC gaming library',    popular: true,  defaultBillingCycle: 'monthly', color: '#107c10', logo: 'Xbox_logo_(2019).svg' },
  { id: 'ps-plus',         name: 'PlayStation Plus',      category: 'Gaming', description: 'PS4/PS5 online & games',      popular: true,  defaultBillingCycle: 'monthly', color: '#00439c', logo: 'playstation.svg' },
  { id: 'geforce-now',     name: 'GeForce Now',           category: 'Gaming', description: 'Cloud gaming by Nvidia',      popular: false, defaultBillingCycle: 'monthly', color: '#76b900', logo: 'nvidia.svg' },
  { id: 'ea-play',         name: 'EA Play',               category: 'Gaming', description: 'EA games subscription',       popular: false, defaultBillingCycle: 'monthly', color: '#c0392b', logo: 'ea.svg' },
  { id: 'ubisoft-plus',    name: 'Ubisoft+',              category: 'Gaming', description: 'Ubisoft games & DLC',         popular: false, defaultBillingCycle: 'monthly', color: '#0070f3', logo: 'ubisoft.svg' },
  { id: 'apple-arcade',    name: 'Apple Arcade',          category: 'Gaming', description: 'Curated iOS/Mac games',       popular: false, defaultBillingCycle: 'monthly', color: '#555566', logo: 'applearcade.svg' },
  // Food & Dining
  { id: 'yemeksepeti',     name: 'Yemeksepeti+',          category: 'Food & Dining', description: 'Food delivery membership',  popular: true,  defaultBillingCycle: 'monthly', color: '#fa0050', logo: null },
  { id: 'getir',           name: 'Getir',                 category: 'Food & Dining', description: 'Express grocery & food',    popular: true,  defaultBillingCycle: 'monthly', color: '#5d3ebc', logo: null },
  { id: 'migros',          name: 'Migros Sanal Market',   category: 'Food & Dining', description: 'Online grocery delivery',   popular: false, defaultBillingCycle: 'monthly', color: '#e32217', logo: null },
  { id: 'starbucks',       name: 'Starbucks',             category: 'Food & Dining', description: 'Coffee subscription',       popular: false, defaultBillingCycle: 'monthly', color: '#00704a', logo: 'starbucks.svg' },
];

function normalizeText(value) {
  return String(value || '').toLowerCase().trim();
}

function normalizeCategoryKey(name) {
  const n = normalizeText(name);
  for (const [key, aliases] of Object.entries(CATEGORY_ALIASES)) {
    if (aliases.includes(n)) return key;
  }
  return 'other';
}

const SYSTEM_CATEGORY_NAMES = [
  'entertainment', 'fitness', 'food & dining', 'gaming', 'music', 'other', 'productivity',
];

function isSystemCategory(cat) {
  if (!cat) return false;
  if (cat.is_system === 1 || cat.is_system === true) return true;
  return SYSTEM_CATEGORY_NAMES.includes(normalizeText(cat.name));
}

function getServicesForCategory(categoryName) {
  const key = normalizeCategoryKey(categoryName);
  return SERVICE_CATALOG.filter(s => normalizeCategoryKey(s.category) === key);
}

function findServiceByName(name) {
  if (!name) return null;
  const n = normalizeText(name);
  let svc = SERVICE_CATALOG.find(s => normalizeText(s.name) === n);
  if (svc) return svc;
  svc = SERVICE_CATALOG.find(s => n.includes(normalizeText(s.name)) || normalizeText(s.name).includes(n));
  return svc || null;
}

function getServiceVisual(name) {
  const svc = findServiceByName(name);
  return {
    color:   svc ? svc.color : getAvatarColor(name),
    initial: getInitial(name),
    service: svc,
    logo:    svc && svc.logo ? `/logos/${svc.logo}` : null,
  };
}

// ============================================================
// CURRENCY
// ============================================================

function formatCurrency(amount) {
  return '₺' + Number(amount).toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function toMonthly(price, cycle) {
  if (cycle === 'annual') return Math.round((price / 12) * 100) / 100;
  if (cycle === 'weekly') return Math.round(price * 4.33 * 100) / 100;
  return price;
}

// ============================================================
// AUTH
// ============================================================

function getToken()    { return localStorage.getItem('sr_token'); }
function getUsername() { return localStorage.getItem('sr_username'); }

function saveAuth(token, username) {
  localStorage.setItem('sr_token', token);
  localStorage.setItem('sr_username', username);
}

function clearAuth() {
  localStorage.removeItem('sr_token');
  localStorage.removeItem('sr_username');
}

function showAuthPage() {
  document.getElementById('auth-page').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
}

function showApp() {
  document.getElementById('auth-page').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('header-username').textContent = getUsername();
}

function showAuthTab(tab) {
  document.getElementById('login-form').classList.toggle('hidden', tab !== 'login');
  document.getElementById('register-form').classList.toggle('hidden', tab !== 'register');
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');
  document.getElementById('login-error').classList.add('hidden');
  document.getElementById('register-error').classList.add('hidden');
}

async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  errEl.classList.add('hidden');

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      errEl.textContent = (data.errors || ['Login failed.']).join(' ');
      errEl.classList.remove('hidden');
      return;
    }
    saveAuth(data.token, data.username);
    showApp();
    initApp();
  } catch {
    errEl.textContent = 'Connection error. Is the server running?';
    errEl.classList.remove('hidden');
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('reg-username').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const errEl    = document.getElementById('register-error');
  errEl.classList.add('hidden');

  if (username.length < 3) {
    errEl.textContent = 'Username must be at least 3 characters.';
    errEl.classList.remove('hidden');
    return;
  }
  if (password.length < 6) {
    errEl.textContent = 'Password must be at least 6 characters.';
    errEl.classList.remove('hidden');
    return;
  }

  try {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      errEl.textContent = (data.errors || ['Registration failed.']).join(' ');
      errEl.classList.remove('hidden');
      return;
    }
    saveAuth(data.token, data.username);
    showApp();
    initApp();
  } catch {
    errEl.textContent = 'Connection error. Is the server running?';
    errEl.classList.remove('hidden');
  }
}

function handleLogout() {
  clearAuth();
  showAuthPage();
}

// ============================================================
// FRONTEND VALIDATION
// ============================================================

function validateSubscriptionForm(data) {
  const errors = [];
  if (!data.name || data.name.trim().length === 0) errors.push('Name is required.');
  if (data.name && data.name.trim().length > 100) errors.push('Name must be at most 100 characters.');
  if (!data.price || isNaN(Number(data.price))) errors.push('Price must be a valid number.');
  if (Number(data.price) < 0) errors.push('Price cannot be negative.');
  if (!data.start_date) errors.push('Start date is required.');
  if (!['monthly', 'annual', 'weekly'].includes(data.billing_cycle)) errors.push('Invalid billing cycle.');
  return errors;
}

function validateCategoryForm(data) {
  const errors = [];
  if (!data.name || data.name.trim().length === 0) errors.push('Category name is required.');
  if (data.name && data.name.trim().length > 50) errors.push('Category name must be at most 50 characters.');
  if (data.color && !/^#[0-9A-Fa-f]{6}$/.test(data.color)) errors.push('Color must be a valid hex code.');
  return errors;
}

// ============================================================
// UTILITY
// ============================================================

function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

function cycleLabel(cycle) {
  return { monthly: '/ month', annual: '/ year', weekly: '/ week' }[cycle] || cycle;
}

function cycleLabelShort(cycle) {
  return { monthly: 'Monthly', annual: 'Annual', weekly: 'Weekly' }[cycle] || cycle;
}

function statusLabel(s) {
  return { active: 'Active', paused: 'Paused', cancelled: 'Cancelled' }[s] || s;
}

function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function debounce(fn, delay) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

function monthlyEquivalent(price, billingCycle) {
  if (billingCycle === 'annual')  return price / 12;
  if (billingCycle === 'weekly')  return price * 52 / 12;
  return price;
}

// Avatar helpers
const AVATAR_COLORS = [
  '#d9527a','#6366f1','#0ea5e9','#10b981',
  '#f59e0b','#8b5cf6','#ec4899','#14b8a6',
  '#f97316','#06b6d4',
];

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0x7fffffff;
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function getInitial(name) {
  return (name || '?').trim().charAt(0).toUpperCase();
}

// ============================================================
// API HELPERS
// ============================================================

async function apiFetch(path, options = {}) {
  const token = getToken();
  const res = await fetch(API + path, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (res.status === 401) {
    clearAuth();
    showAuthPage();
    throw new Error('Session expired. Please log in again.');
  }

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

// ============================================================
// STATE
// ============================================================

let categories  = [];
let currentPage = 'dashboard';

// ============================================================
// NAVIGATION
// ============================================================

function initNavigation() {
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      currentPage = btn.dataset.page;
      document.getElementById(`page-${currentPage}`).classList.add('active');
      loadPage(currentPage);
    });
  });
}

function loadPage(page) {
  if (page === 'dashboard')     loadDashboard();
  else if (page === 'subscriptions') loadSubscriptions();
  else if (page === 'categories')    loadCategories();
  else if (page === 'calendar')      loadCalendar();
}

// ============================================================
// DASHBOARD
// ============================================================

async function loadDashboard() {
  // Show loading placeholders
  document.getElementById('monthly-total').textContent      = '…';
  document.getElementById('annual-total').textContent       = 'Annual: …';
  document.getElementById('active-count').textContent       = '…';
  document.getElementById('wasted-total').textContent       = '…';
  document.getElementById('wasted-count').textContent       = '…';
  document.getElementById('next-renewal-value').textContent = '…';
  document.getElementById('next-renewal-hint').textContent  = '';
  document.getElementById('upcoming-list').innerHTML = '<li class="list-placeholder">Loading…</li>';

  try {
    const summary = await apiFetch('/subscriptions/summary');

    document.getElementById('monthly-total').textContent = formatCurrency(summary.totalMonthly);
    document.getElementById('annual-total').textContent  = 'Annual: ' + formatCurrency(summary.totalAnnual);
    document.getElementById('active-count').textContent  = summary.activeCount;
    document.getElementById('wasted-total').textContent  = formatCurrency(summary.totalSavingsMonthly || 0);
    document.getElementById('wasted-count').textContent  = `${summary.reviewNeededCount || 0} need review`;

    // Next Renewal metric — show the nearest upcoming renewal
    const upcoming = summary.upcomingRenewals || [];
    if (upcoming.length > 0) {
      const next = upcoming[0];
      const days = daysUntil(next.renewal_date);
      document.getElementById('next-renewal-value').textContent =
        days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days} days`;
      document.getElementById('next-renewal-hint').textContent = next.name;
    } else {
      document.getElementById('next-renewal-value').textContent = '—';
      document.getElementById('next-renewal-hint').textContent  = 'none this week';
    }

    // Upcoming renewals
    const list = document.getElementById('upcoming-list');
    if (summary.upcomingRenewals.length === 0) {
      list.innerHTML = `
        <li style="grid-column:1/-1;padding:20px 0;text-align:center;color:var(--text-muted);font-size:0.875rem;">
          You're clear for the next 7 days.
        </li>`;
    } else {
      list.innerHTML = summary.upcomingRenewals.map((s) => {
        const days  = daysUntil(s.renewal_date);
        const label = days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days} days`;
        const catDot = s.category_color
          ? `<span class="category-dot" style="background:${s.category_color}" aria-hidden="true"></span>`
          : '';
        return `<li>
          <span class="renewal-name">${escHtml(s.name)}</span>
          <span class="renewal-date">${label}</span>
          <span class="renewal-price">${formatCurrency(s.price)}</span>
        </li>`;
      }).join('');
    }

    // Category breakdown
    const breakdownEl = document.getElementById('category-breakdown');
    const cats = summary.byCategory;
    if (!cats || Object.keys(cats).length === 0) {
      breakdownEl.innerHTML = '<p style="color:var(--text-muted);font-size:0.83rem;padding:8px 0;">No active subscriptions yet.</p>';
    } else {
      const entries = Object.entries(cats).sort((a, b) => b[1].total - a[1].total);
      const grandTotal = entries.reduce((s, [, c]) => s + c.total, 0);
      const max = entries[0][1].total;
      breakdownEl.innerHTML = entries.map(([name, cat]) => {
        const pct = grandTotal > 0 ? ((cat.total / grandTotal) * 100).toFixed(0) : 0;
        return `
        <div class="breakdown-item">
          <div class="breakdown-dot" style="background:${cat.color}" aria-hidden="true"></div>
          <div class="breakdown-info">
            <span class="breakdown-name">${escHtml(name)}</span>
            <span class="breakdown-count">${cat.count || ''}</span>
          </div>
          <div class="breakdown-bar-wrap" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
            <div class="breakdown-bar" style="width:${(cat.total / max) * 100}%;background:${cat.color}"></div>
          </div>
          <span class="breakdown-amount">${formatCurrency(cat.total)}</span>
          <span class="breakdown-pct">${pct}%</span>
        </div>`;
      }).join('');
    }

    // Savings opportunities (review-based)
    const wasteEl  = document.getElementById('waste-list');
    const savings  = summary.savingsOpportunities || [];
    const needsReviewCount = summary.reviewNeededCount || 0;
    if (savings.length === 0) {
      const reviewNote = needsReviewCount > 0
        ? `<span class="waste-review-hint">${needsReviewCount} subscription${needsReviewCount > 1 ? 's' : ''} not yet reviewed.</span>`
        : '';
      wasteEl.innerHTML = `
        <div class="waste-empty">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          No obvious savings opportunities. ${reviewNote}
        </div>`;
    } else {
      wasteEl.innerHTML = `<div class="waste-items">${savings.map((s) => {
        const monthly = toMonthly(s.price, s.billing_cycle);
        return `
        <div class="waste-item">
          <span class="waste-item-name">${escHtml(s.name)}</span>
          <span class="waste-item-reason">${escHtml(s.reason)}</span>
          <span class="waste-item-sim">Potential saving: ${formatCurrency(monthly * 12)}/yr</span>
        </div>`;
      }).join('')}
      </div>`;
    }
  } catch (e) {
    if (!(e instanceof Error && e.message.includes('Session expired'))) {
      showToast('Failed to load dashboard.', 'error');
    }
  }
}

// ============================================================
// SUBSCRIPTIONS
// ============================================================

async function loadSubscriptions() {
  await loadCategoriesData();
  renderFilterCategories();

  const search      = document.getElementById('search-input').value;
  const category_id = document.getElementById('filter-category').value;
  const status      = document.getElementById('filter-status').value;

  const hasFilters = search || category_id || status;
  const clearBtn   = document.getElementById('btn-clear-filters');
  clearBtn.classList.toggle('hidden', !hasFilters);

  const params = new URLSearchParams();
  if (search)      params.set('search', search);
  if (category_id) params.set('category_id', category_id);
  if (status)      params.set('status', status);

  const grid = document.getElementById('subs-grid');
  grid.innerHTML = renderSkeletonCards(3);

  try {
    const subs = await apiFetch('/subscriptions?' + params.toString());

    // Update result count
    const countEl = document.getElementById('filter-count');
    countEl.textContent = subs.length === 0 ? '' : `${subs.length} subscription${subs.length === 1 ? '' : 's'}`;

    renderSubsGrid(subs, hasFilters);
  } catch {
    showToast('Failed to load subscriptions.', 'error');
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 8v4m0 4h.01"/></svg></div>
      <h4>Failed to load</h4>
      <p>Could not reach the server. Make sure it's running.</p>
    </div>`;
  }
}

function renderSkeletonCards(n) {
  return Array.from({ length: n }).map(() => `
    <div class="sub-card" style="gap:12px">
      <div class="loading-shimmer" style="height:40px;border-radius:9px"></div>
      <div class="loading-shimmer" style="height:28px;width:60%;border-radius:9px"></div>
      <div class="loading-shimmer" style="height:18px;width:80%;border-radius:9px"></div>
      <div class="loading-shimmer" style="height:44px;border-radius:9px"></div>
    </div>`).join('');
}

function renderSubsGrid(subs, hasFilters) {
  const grid = document.getElementById('subs-grid');
  if (subs.length === 0) {
    if (hasFilters) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </div>
          <h4>No results</h4>
          <p>No subscriptions match your current filters.</p>
        </div>`;
    } else {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          </div>
          <h4>No subscriptions yet</h4>
          <p>Add your first subscription to start tracking recurring costs.</p>
        </div>`;
    }
    return;
  }

  grid.innerHTML = subs.map((s) => {
    const freq        = s.usage_frequency || 'unknown';
    const rating      = s.value_rating;
    const lastReviewed = s.last_reviewed_at;
    const isSavingsOpp = s.status === 'active' &&
      (freq === 'rarely' || freq === 'never' || (rating !== null && rating !== undefined && rating <= 2));

    const daysLeft  = daysUntil(s.renewal_date);
    const isUrgent  = daysLeft >= 0 && daysLeft <= 7 && s.status === 'active';

    const renewRelative = isUrgent
      ? (daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : `In ${daysLeft} days`)
      : (daysLeft > 0 ? `In ${daysLeft} days` : '');

    const urgentBadge = isUrgent
      ? `<span class="renewal-urgent-badge">&#9889; ${renewRelative}</span>`
      : '';

    const _visual     = getServiceVisual(s.name);
    const avatarColor = _visual.color;
    const initial     = _visual.initial;
    const avatarHtml  = _visual.logo
      ? `<img class="sub-logo-img" src="${_visual.logo}" alt="" aria-hidden="true" />`
      : `<div class="sub-avatar" style="background:${avatarColor}" aria-hidden="true">${initial}</div>`;

    const renewalDate = s.renewal_date
      ? new Date(s.renewal_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '—';

    const FREQ_LABELS = {
      daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly',
      rarely: 'Rarely', never: 'Never', unknown: 'Not reviewed',
    };
    const freqLabel = FREQ_LABELS[freq] || 'Not reviewed';
    const ratingHtml = (rating !== null && rating !== undefined)
      ? `<span class="review-rating">★ ${rating}/5</span>` : '';
    const reviewedAgo = (() => {
      if (!lastReviewed) return '';
      const days = Math.floor((Date.now() - new Date(lastReviewed).getTime()) / 86400000);
      if (days === 0) return 'Today';
      if (days === 1) return '1d ago';
      return `${days}d ago`;
    })();
    const reviewedHtml = reviewedAgo
      ? `<span class="review-date-text">${reviewedAgo}</span>` : '';
    const reviewBlock = `<div class="review-info">
      <span class="freq-pill freq-${freq}">${freqLabel}</span>
      ${ratingHtml}
      ${reviewedHtml}
    </div>`;

    const catPill = s.category_name
      ? `<span class="category-pill">
          <span class="category-dot" style="background:${s.category_color}" aria-hidden="true"></span>
          ${escHtml(s.category_name)}
        </span>`
      : '';

    const notesEl = s.notes
      ? `<p class="sub-notes" title="${escHtml(s.notes)}">${escHtml(s.notes)}</p>`
      : '';

    const savingsHintEl = isSavingsOpp
      ? `<div class="cancel-sim">Potential saving: <strong>${formatCurrency(toMonthly(s.price, s.billing_cycle) * 12)}/yr</strong></div>`
      : '';

    return `
    <div class="sub-card ${isSavingsOpp ? 'wasted' : ''} ${isUrgent ? 'urgent' : ''}">
      <div class="sub-card-header">
        ${avatarHtml}
        <div class="sub-card-title">
          <span class="sub-name">${escHtml(s.name)}</span>
          <span class="status-pill ${s.status}">${statusLabel(s.status)}</span>
        </div>
      </div>

      <div class="sub-price-block">
        <span class="sub-price">${formatCurrency(s.price)}</span>
        <span class="sub-cycle">${cycleLabel(s.billing_cycle)}</span>
      </div>

      <div class="sub-renewal">
        <span class="sub-renewal-date">Renews ${renewalDate}</span>
        ${urgentBadge || (renewRelative ? `<span class="sub-renewal-relative">${renewRelative}</span>` : '')}
      </div>

      ${catPill}
      ${notesEl}
      ${reviewBlock}
      ${savingsHintEl}

      <div class="sub-actions">
        <button class="btn-review" onclick="openReviewModal(${s.id})">Review usage</button>
        <button class="btn-outline" onclick="openEditSub(${s.id})">Edit</button>
        <button class="btn-danger" onclick="deleteSub(${s.id})" aria-label="Delete ${escHtml(s.name)}">Delete</button>
      </div>
    </div>`;
  }).join('');
}

function renderFilterCategories() {
  const sel     = document.getElementById('filter-category');
  const current = sel.value;
  sel.innerHTML = '<option value="">All Categories</option>' +
    categories.map((c) =>
      `<option value="${c.id}" ${c.id == current ? 'selected' : ''}>${escHtml(c.name)}</option>`
    ).join('');
}

function initFilters() {
  document.getElementById('search-input').addEventListener('input', debounce(() => {
    if (currentPage === 'subscriptions') loadSubscriptions();
  }, 380));
  document.getElementById('filter-category').addEventListener('change', () => {
    if (currentPage === 'subscriptions') loadSubscriptions();
  });
  document.getElementById('filter-status').addEventListener('change', () => {
    if (currentPage === 'subscriptions') loadSubscriptions();
  });
}

function clearFilters() {
  document.getElementById('search-input').value    = '';
  document.getElementById('filter-category').value = '';
  document.getElementById('filter-status').value   = '';
  loadSubscriptions();
}

// ============================================================
// REVIEW MODAL
// ============================================================

const FREQ_OPTIONS = [
  { value: 'daily',   label: 'Daily'    },
  { value: 'weekly',  label: 'Weekly'   },
  { value: 'monthly', label: 'Monthly'  },
  { value: 'rarely',  label: 'Rarely'   },
  { value: 'never',   label: 'Never'    },
  { value: 'unknown', label: 'Not sure' },
];

async function openReviewModal(subId) {
  try {
    const sub = await apiFetch(`/subscriptions/${subId}`);
    const visual = getServiceVisual(sub.name);
    const logoHtml = visual.logo
      ? `<img class="service-summary-logo" src="${escHtml(visual.logo)}" alt="" aria-hidden="true" />`
      : `<div class="service-logo-fallback" style="background:${escHtml(visual.color)};width:42px;height:42px;" aria-hidden="true">${escHtml(visual.initial)}</div>`;

    const currentFreq   = sub.usage_frequency || 'unknown';
    const currentRating = sub.value_rating;
    const currentNotes  = sub.review_notes || '';
    const monthly       = toMonthly(sub.price, sub.billing_cycle);

    const freqHtml = FREQ_OPTIONS.map(opt => `
      <button type="button" class="freq-option-btn${currentFreq === opt.value ? ' selected' : ''}"
        data-value="${opt.value}" onclick="selectReviewFreq(this)">${opt.label}</button>`
    ).join('');

    const starsHtml = [1, 2, 3, 4, 5].map(n => `
      <button type="button" class="rating-star-btn${currentRating === n ? ' selected' : ''}"
        data-value="${n}" onclick="selectReviewRating(this)" aria-label="${n} out of 5">★</button>`
    ).join('');

    openModal('Review usage', `
      <div class="review-modal-summary">
        ${logoHtml}
        <div class="review-modal-summary-info">
          <div class="review-modal-name">${escHtml(sub.name)}</div>
          <div class="review-modal-price">${formatCurrency(monthly)}/month${sub.category_name ? ' · ' + escHtml(sub.category_name) : ''}</div>
        </div>
      </div>

      <form id="review-form" novalidate>
        <div id="review-form-errors"></div>

        <div class="form-group">
          <label>How often do you use it?</label>
          <div class="freq-option-grid">${freqHtml}</div>
          <input type="hidden" id="review-freq" value="${escHtml(currentFreq)}" />
        </div>

        <div class="form-group">
          <label>Value rating <span class="label-optional">(optional)</span></label>
          <div class="rating-star-group">
            ${starsHtml}
            <span class="rating-star-hint" id="rating-hint">${currentRating ? currentRating + '/5' : 'Not rated'}</span>
          </div>
          <input type="hidden" id="review-rating" value="${currentRating !== null && currentRating !== undefined ? currentRating : ''}" />
        </div>

        <div class="form-group">
          <label for="review-notes-input">Notes <span class="label-optional">(optional)</span></label>
          <textarea id="review-notes-input" placeholder="Why keep or cancel this?" rows="2">${escHtml(currentNotes)}</textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
          <button type="button" class="btn-primary" onclick="submitReview(${subId})">Save review</button>
        </div>
      </form>
    `);
  } catch {
    showToast('Failed to load subscription.', 'error');
  }
}

function selectReviewFreq(btn) {
  document.querySelectorAll('.freq-option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('review-freq').value = btn.dataset.value;
}

function selectReviewRating(btn) {
  const val = parseInt(btn.dataset.value);
  const stars = document.querySelectorAll('.rating-star-btn');
  stars.forEach((b, i) => b.classList.toggle('selected', i < val));
  document.getElementById('review-rating').value = val;
  const hint = document.getElementById('rating-hint');
  if (hint) hint.textContent = val + '/5';
}

async function submitReview(subId) {
  const freq   = document.getElementById('review-freq').value;
  const raw    = document.getElementById('review-rating').value;
  const rating = raw !== '' ? parseInt(raw) : null;
  const notes  = document.getElementById('review-notes-input').value.trim();

  try {
    await apiFetch(`/subscriptions/${subId}/review`, {
      method: 'PATCH',
      body: JSON.stringify({ usage_frequency: freq, value_rating: rating, review_notes: notes || null }),
    });
    showToast('Review saved.');
    closeModal();
    loadSubscriptions();
    loadDashboard();
  } catch (err) {
    const msgs = err.errors || [err.error || 'Failed to save review.'];
    document.getElementById('review-form-errors').innerHTML =
      `<div class="form-errors">${msgs.map(m => `<p>${escHtml(m)}</p>`).join('')}</div>`;
  }
}

// ============================================================
// SUBSCRIPTION FORM
// ============================================================

function initSubButton() {
  document.getElementById('btn-add-sub').addEventListener('click', () => openAddSubscriptionWizard());
}

function openSubForm(existing = null) {
  const title = existing ? 'Edit Subscription' : 'New Subscription';
  const catOptions = categories.map((c) =>
    `<option value="${c.id}" ${existing && existing.category_id == c.id ? 'selected' : ''}>${escHtml(c.name)}</option>`
  ).join('');

  openModal(title, `
    <form id="sub-form">
      <div id="form-errors"></div>
      <div class="form-group">
        <label for="sub-name">Name *</label>
        <input id="sub-name" name="name" value="${existing ? escHtml(existing.name) : ''}" placeholder="Netflix, Spotify…" required autocomplete="off" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="sub-price">Price *</label>
          <input id="sub-price" name="price" type="number" step="0.01" min="0" value="${existing ? existing.price : ''}" placeholder="9.99" required />
        </div>
        <div class="form-group">
          <label for="sub-cycle">Billing Cycle *</label>
          <select id="sub-cycle" name="billing_cycle">
            <option value="monthly" ${!existing || existing.billing_cycle === 'monthly' ? 'selected' : ''}>Monthly</option>
            <option value="annual"  ${existing && existing.billing_cycle === 'annual'   ? 'selected' : ''}>Annual</option>
            <option value="weekly"  ${existing && existing.billing_cycle === 'weekly'   ? 'selected' : ''}>Weekly</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="sub-start">Start Date *</label>
          <input id="sub-start" name="start_date" type="date" value="${existing ? existing.start_date : ''}" required />
        </div>
        <div class="form-group">
          <label for="sub-status">Status</label>
          <select id="sub-status" name="status">
            <option value="active"    ${!existing || existing.status === 'active'    ? 'selected' : ''}>Active</option>
            <option value="paused"    ${existing  && existing.status === 'paused'    ? 'selected' : ''}>Paused</option>
            <option value="cancelled" ${existing  && existing.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="sub-cat">Category</label>
        <select id="sub-cat" name="category_id">
          <option value="">No category</option>
          ${catOptions}
        </select>
      </div>
      <div class="form-group">
        <label for="sub-notes">Notes</label>
        <textarea id="sub-notes" name="notes" placeholder="Optional notes…">${existing ? escHtml(existing.notes || '') : ''}</textarea>
      </div>
      <div class="form-actions">
        <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn-primary">${existing ? 'Update' : 'Add Subscription'}</button>
      </div>
    </form>
  `);

  document.getElementById('sub-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd   = new FormData(e.target);
    const body = {
      name:          fd.get('name'),
      price:         fd.get('price'),
      billing_cycle: fd.get('billing_cycle'),
      start_date:    fd.get('start_date'),
      status:        fd.get('status'),
      category_id:   fd.get('category_id') || null,
      notes:         fd.get('notes') || null,
    };

    const frontendErrors = validateSubscriptionForm(body);
    if (frontendErrors.length > 0) {
      document.getElementById('form-errors').innerHTML =
        `<div class="form-errors">${frontendErrors.map((m) => `<p>${m}</p>`).join('')}</div>`;
      return;
    }

    try {
      if (existing) {
        await apiFetch(`/subscriptions/${existing.id}`, { method: 'PUT', body: JSON.stringify(body) });
        showToast('Subscription updated.');
      } else {
        await apiFetch('/subscriptions', { method: 'POST', body: JSON.stringify(body) });
        showToast('Subscription added.');
      }
      closeModal();
      loadSubscriptions();
      loadDashboard();
    } catch (err) {
      const msgs = err.errors || [err.error || 'An error occurred.'];
      document.getElementById('form-errors').innerHTML =
        `<div class="form-errors">${msgs.map((m) => `<p>${m}</p>`).join('')}</div>`;
    }
  });
}

async function openEditSub(id) {
  try {
    const sub = await apiFetch(`/subscriptions/${id}`);
    openSubForm(sub);
  } catch {
    showToast('Failed to load subscription.', 'error');
  }
}

async function deleteSub(id) {
  if (!confirm('Are you sure you want to delete this subscription?')) return;
  try {
    await apiFetch(`/subscriptions/${id}`, { method: 'DELETE' });
    showToast('Subscription deleted.');
    loadSubscriptions();
    loadDashboard();
  } catch {
    showToast('Failed to delete.', 'error');
  }
}

// ============================================================
// CATEGORIES
// ============================================================

async function loadCategoriesData() {
  try { categories = await apiFetch('/categories'); }
  catch { categories = []; }
}

async function loadCategories() {
  await loadCategoriesData();

  const list = document.getElementById('cat-list');
  if (categories.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/></svg>
        </div>
        <h4>No categories yet</h4>
        <p>Create a category to organize your subscriptions by type.</p>
      </div>`;
    return;
  }

  const grandTotal = categories.reduce((sum, c) => sum + (c.monthly_total || 0), 0);
  const activeCount = categories.filter(c => c.active_count > 0).length;

  const summary = `
    <div class="cat-summary">
      <div class="cat-summary-stat">
        <span class="cat-summary-val">${formatCurrency(grandTotal)}</span>
        <span class="cat-summary-label">Total Monthly Spend</span>
      </div>
      <div class="cat-summary-stat">
        <span class="cat-summary-val">${formatCurrency(grandTotal * 12)}</span>
        <span class="cat-summary-label">Est. Annual Cost</span>
      </div>
      <div class="cat-summary-stat">
        <span class="cat-summary-val">${activeCount}</span>
        <span class="cat-summary-label">Categories With Spend</span>
      </div>
    </div>
    <div class="cat-table-header">
      <span>Category</span>
      <span>Share of total spend</span>
      <span class="cat-th-num">Monthly</span>
      <span class="cat-th-num">% of total</span>
      <span></span>
    </div>`;

  const rows = categories.map((c) => {
    const monthly   = c.monthly_total || 0;
    const share     = grandTotal > 0 ? ((monthly / grandTotal) * 100).toFixed(1) : '0.0';
    const pct       = parseFloat(share);
    const hasActive = c.active_count > 0;

    const badges = (() => {
      const parts = [];
      if (c.active_count > 0) parts.push(`<span class="cat-badge cat-badge-active">${c.active_count} active</span>`);
      if (c.paused_count  > 0) parts.push(`<span class="cat-badge cat-badge-paused">${c.paused_count} paused</span>`);
      return parts.join('');
    })();

    const topSub = c.top_sub_name
      ? `<div class="cat-top-sub">Top: <strong>${escHtml(c.top_sub_name)}</strong> &middot; ${formatCurrency(c.top_sub_price)}</div>`
      : '';

    return `
    <div class="cat-item">
      <div class="cat-info">
        <div class="cat-name-row" onclick="navigateToCategoryFilter(${c.id})" title="Show ${escHtml(c.name)} subscriptions" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' ')navigateToCategoryFilter(${c.id})">
          <div class="cat-color-dot" style="background:${c.color}" aria-hidden="true"></div>
          <span class="cat-name">${escHtml(c.name)}</span>
        </div>
        <div class="cat-sub-info">
          ${badges}
        </div>
        ${topSub}
      </div>
      <div class="cat-bar-bg" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${share}% of total spend">
        <div class="cat-bar-fill" style="width:${pct}%;background:${c.color}"></div>
      </div>
      <span class="cat-monthly">${hasActive ? formatCurrency(monthly) : '—'}</span>
      <span class="cat-pct">${hasActive ? share + '%' : '—'}</span>
      <div class="cat-actions">
        ${!isSystemCategory(c) ? `
          <button class="btn-outline cat-action-btn" onclick="openEditCat(${c.id})" aria-label="Edit ${escHtml(c.name)}">Edit</button>
          <button class="btn-danger  cat-action-btn" onclick="deleteCat(${c.id})"   aria-label="Delete ${escHtml(c.name)}">Delete</button>
        ` : ''}
      </div>
    </div>`;
  }).join('');

  list.innerHTML = summary + rows;
}

function navigateToCategoryFilter(categoryId) {
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
  document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
  const btn = document.querySelector('.nav-btn[data-page="subscriptions"]');
  btn.classList.add('active');
  document.getElementById('page-subscriptions').classList.add('active');
  currentPage = 'subscriptions';
  document.getElementById('filter-category').value = categoryId;
  loadSubscriptions();
}

function initCatButton() {
  document.getElementById('btn-add-cat').addEventListener('click', () => openCatForm());
}

function openCatForm() {
  openModal('New Category', `
    <form id="cat-form">
      <div id="cat-form-errors"></div>
      <div class="form-group">
        <label for="cat-name">Category Name *</label>
        <input id="cat-name" name="name" placeholder="e.g. Cloud Storage, Entertainment…" required autocomplete="off" />
      </div>
      <div class="form-group">
        <label for="cat-color">Color</label>
        <input id="cat-color" name="color" type="color" value="#d9527a" />
      </div>
      <div class="form-actions">
        <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn-primary">Add Category</button>
      </div>
    </form>
  `);

  document.getElementById('cat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd   = new FormData(e.target);
    const body = { name: fd.get('name'), color: fd.get('color') };

    const frontendErrors = validateCategoryForm(body);
    if (frontendErrors.length > 0) {
      document.getElementById('cat-form-errors').innerHTML =
        `<div class="form-errors">${frontendErrors.map((m) => `<p>${m}</p>`).join('')}</div>`;
      return;
    }

    const dupName = normalizeText(body.name);
    const duplicate = categories.find(c => normalizeText(c.name) === dupName);
    if (duplicate) {
      document.getElementById('cat-form-errors').innerHTML =
        `<div class="form-errors"><p>A category with this name already exists.</p></div>`;
      return;
    }

    try {
      await apiFetch('/categories', { method: 'POST', body: JSON.stringify(body) });
      showToast('Category added.');
      closeModal();
      loadCategories();
    } catch (err) {
      const msgs = err.errors || [err.error || 'An error occurred.'];
      document.getElementById('cat-form-errors').innerHTML =
        `<div class="form-errors">${msgs.map((m) => `<p>${m}</p>`).join('')}</div>`;
    }
  });
}

function openEditCat(id) {
  const cat = categories.find((c) => c.id === id);
  if (!cat) { showToast('Category not found.', 'error'); return; }
  if (isSystemCategory(cat)) return;

  openModal('Edit Category', `
    <form id="cat-edit-form">
      <div id="cat-edit-errors"></div>
      <div class="form-group">
        <label for="cat-edit-name">Category Name *</label>
        <input id="cat-edit-name" name="name" value="${escHtml(cat.name)}" required autocomplete="off" />
      </div>
      <div class="form-group">
        <label for="cat-edit-color">Color</label>
        <input id="cat-edit-color" name="color" type="color" value="${cat.color || '#d9527a'}" />
      </div>
      <div class="form-actions">
        <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn-primary">Update</button>
      </div>
    </form>
  `);

  document.getElementById('cat-edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd   = new FormData(e.target);
    const body = { name: fd.get('name'), color: fd.get('color') };

    const frontendErrors = validateCategoryForm(body);
    if (frontendErrors.length > 0) {
      document.getElementById('cat-edit-errors').innerHTML =
        `<div class="form-errors">${frontendErrors.map((m) => `<p>${m}</p>`).join('')}</div>`;
      return;
    }

    try {
      await apiFetch(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(body) });
      showToast('Category updated.');
      closeModal();
      loadCategories();
    } catch (err) {
      const msgs = err.errors || [err.error || 'An error occurred.'];
      document.getElementById('cat-edit-errors').innerHTML =
        `<div class="form-errors">${msgs.map((m) => `<p>${m}</p>`).join('')}</div>`;
    }
  });
}

async function deleteCat(id) {
  const cat = categories.find((c) => c.id === id);
  if (cat && isSystemCategory(cat)) return;
  if (!confirm('Are you sure you want to delete this category?')) return;
  try {
    await apiFetch(`/categories/${id}`, { method: 'DELETE' });
    showToast('Category deleted.');
    loadCategories();
  } catch (err) {
    showToast(err.error || 'Failed to delete.', 'error');
  }
}

// ============================================================
// CALENDAR — recurring renewal logic
// ============================================================

let calendarDate = new Date();
let calNavDir = 0; // -1 = back, 1 = forward, 0 = jump (picker/today)

function goToToday() {
  calNavDir = 0;
  calendarDate = new Date();
  loadCalendar();
}

// ── Custom month/year picker ──────────────────────────────────

let calPickerYear = new Date().getFullYear();
let calPickerMode = 'months';   // 'months' | 'years'
let calPickerYearPage = 0;      // first year shown in year grid

const CAL_MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function toggleCalPicker() {
  const panel  = document.getElementById('cal-picker-panel');
  const btn    = document.getElementById('cal-picker-btn');
  const isOpen = !panel.classList.contains('hidden');
  if (isOpen) {
    closeCalPicker();
  } else {
    calPickerYear = calendarDate.getFullYear();
    calPickerMode = 'months';
    _renderPickerMonths(null);
    document.getElementById('cal-picker-year-label').textContent = calPickerYear;
    panel.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
  }
}

function closeCalPicker() {
  document.getElementById('cal-picker-panel').classList.add('hidden');
  document.getElementById('cal-picker-btn').setAttribute('aria-expanded', 'false');
}

/** Toggle between month grid and year grid */
function toggleCalPickerMode() {
  if (calPickerMode === 'months') {
    calPickerMode = 'years';
    calPickerYearPage = Math.floor(calPickerYear / 12) * 12;
    _renderPickerYears('cal-zoom-in');
  } else {
    calPickerMode = 'months';
    _renderPickerMonths('cal-zoom-in');
    document.getElementById('cal-picker-year-label').textContent = calPickerYear;
  }
}

/** ← / → navigation — shifts by 1 year in month mode, 12 in year mode */
function calPickerShiftPage(dir) {
  const animClass = dir > 0 ? 'cal-slide-right' : 'cal-slide-left';

  if (calPickerMode === 'years') {
    calPickerYearPage += dir * 12;
    _renderPickerYears(animClass);
  } else {
    calPickerYear += dir;
    _renderPickerMonths(animClass);
    const yearLabel = document.getElementById('cal-picker-year-label');
    yearLabel.classList.remove('cal-slide-right', 'cal-slide-left', 'cal-zoom-in');
    void yearLabel.offsetWidth;
    yearLabel.textContent = calPickerYear;
    yearLabel.classList.add(animClass);
  }
}

function _animateContent(animClass) {
  const el = document.getElementById('cal-picker-content');
  if (!animClass) return;
  el.classList.remove('cal-slide-right', 'cal-slide-left', 'cal-zoom-in');
  void el.offsetWidth;
  el.classList.add(animClass);
}

function _renderPickerMonths(animClass) {
  const currentMonth = calendarDate.getMonth();
  const currentYear  = calendarDate.getFullYear();
  document.getElementById('cal-picker-content').innerHTML = CAL_MONTH_SHORT.map((name, i) => {
    const isActive = calPickerYear === currentYear && i === currentMonth;
    return `<button class="cal-month-btn ${isActive ? 'active' : ''}" onclick="selectCalMonth(${i})">${name}</button>`;
  }).join('');
  _animateContent(animClass);
}

function _renderPickerYears(animClass) {
  const currentYear = calendarDate.getFullYear();
  const nowYear     = new Date().getFullYear();
  const rangeEnd    = calPickerYearPage + 11;

  // Update header label to show range
  const yearLabel = document.getElementById('cal-picker-year-label');
  yearLabel.classList.remove('cal-slide-right', 'cal-slide-left', 'cal-zoom-in');
  void yearLabel.offsetWidth;
  yearLabel.textContent = `${calPickerYearPage} – ${rangeEnd}`;
  if (animClass) yearLabel.classList.add(animClass);

  document.getElementById('cal-picker-content').innerHTML = Array.from({ length: 12 }, (_, i) => {
    const y = calPickerYearPage + i;
    const isActive  = y === currentYear;
    const isCurrent = y === nowYear;
    return `<button class="cal-year-btn ${isActive ? 'active' : ''} ${isCurrent && !isActive ? 'current-year' : ''}" onclick="selectCalPickerYear(${y})">${y}</button>`;
  }).join('');
  _animateContent(animClass);
}

function selectCalMonth(monthIndex) {
  calNavDir = 0;
  calendarDate = new Date(calPickerYear, monthIndex, 1);
  closeCalPicker();
  loadCalendar();
}

function selectCalPickerYear(year) {
  calPickerYear = year;
  calPickerMode = 'months';
  _renderPickerMonths('cal-zoom-in');
  const yearLabel = document.getElementById('cal-picker-year-label');
  yearLabel.classList.remove('cal-slide-right', 'cal-slide-left', 'cal-zoom-in');
  void yearLabel.offsetWidth;
  yearLabel.textContent = calPickerYear;
  yearLabel.classList.add('cal-zoom-in');
}

function initCalendarPicker() {
  document.addEventListener('click', (e) => {
    const picker = document.getElementById('cal-picker');
    // e.target.isConnected is false when the click re-rendered the content (innerHTML swap
    // removes the clicked element from DOM before this listener fires) — don't close in that case
    if (picker && e.target.isConnected && !picker.contains(e.target)) closeCalPicker();
  });
}

function changeMonth(dir) {
  calNavDir = dir;
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + dir, 1);
  loadCalendar();
}

/**
 * Returns an array of day-numbers in the given year/month where
 * this subscription has a renewal, based on its billing cycle and start_date.
 */
function getRenewalOccurrencesForMonth(sub, year, month) {
  if (sub.status === 'cancelled') return [];

  const startStr = sub.start_date;
  if (!startStr) return [];

  // Parse start date at noon to avoid DST edge cases
  const start      = new Date(startStr + 'T12:00:00');
  const monthStart = new Date(year, month, 1);
  const monthEnd   = new Date(year, month + 1, 0); // last day

  // Subscription hasn't started yet
  if (start > monthEnd) return [];

  const occurrences = [];

  if (sub.billing_cycle === 'annual') {
    // Renews once per year on the same month/day as start_date
    if (start.getMonth() === month) {
      const day    = start.getDate();
      const maxDay = monthEnd.getDate();
      occurrences.push(Math.min(day, maxDay));
    }
    return occurrences;
  }

  if (sub.billing_cycle === 'monthly') {
    // Renews every month on the same day as start_date
    // Only if the subscription started before or during this month
    const startYear  = start.getFullYear();
    const startMonth = start.getMonth();
    if (year > startYear || (year === startYear && month >= startMonth)) {
      const day    = start.getDate();
      const maxDay = monthEnd.getDate();
      occurrences.push(Math.min(day, maxDay));
    }
    return occurrences;
  }

  if (sub.billing_cycle === 'weekly') {
    // Renews every 7 days from start_date
    const MS_WEEK = 7 * 24 * 60 * 60 * 1000;
    let current   = new Date(start);

    // Fast-forward to first occurrence at or after monthStart
    if (current < monthStart) {
      const weeksNeeded = Math.floor((monthStart - current) / MS_WEEK);
      current = new Date(current.getTime() + weeksNeeded * MS_WEEK);
    }

    // Iterate over occurrences in the month
    while (current <= monthEnd) {
      if (current >= monthStart) {
        occurrences.push(current.getDate());
      }
      current = new Date(current.getTime() + MS_WEEK);
    }
    return occurrences;
  }

  return occurrences;
}

async function loadCalendar() {
  const year  = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const MONTH_NAMES = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];
  const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  // Sync the custom picker button label
  const labelEl = document.getElementById('cal-picker-label');
  if (labelEl) labelEl.textContent = `${MONTH_NAMES[month]} ${year}`;

  const _calAnim = calNavDir > 0 ? 'cal-page-right' : calNavDir < 0 ? 'cal-page-left' : 'cal-page-fade';
  calNavDir = 0;

  // Show loading placeholder
  document.getElementById('cal-summary').innerHTML   = '';
  document.getElementById('calendar-grid').innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:24px;">Loading…</p>';
  document.getElementById('cal-agenda').innerHTML    = '';

  try {
    const subs = await apiFetch('/subscriptions');

    // Build a map: day → [ { sub, price, color } ]
    const renewalMap = {};
    subs.forEach((s) => {
      if (s.status === 'cancelled') return;
      const days = getRenewalOccurrencesForMonth(s, year, month);
      days.forEach((d) => {
        if (!renewalMap[d]) renewalMap[d] = [];
        renewalMap[d].push(s);
      });
    });

    // Summary stats
    const allEvents   = Object.values(renewalMap).flat();
    const totalAmount = allEvents.reduce((sum, s) => {
      // Use monthly-equivalent for display in the summary
      return sum + monthlyEquivalent(s.price, s.billing_cycle);
    }, 0);
    // Actually, we want the actual price for the event on that day
    const totalActual = allEvents.reduce((sum, s) => sum + s.price, 0);
    const eventCount  = allEvents.length;

    const today        = new Date();
    const todayDay     = today.getFullYear() === year && today.getMonth() === month ? today.getDate() : null;
    const futureDays   = Object.keys(renewalMap)
      .map(Number)
      .filter((d) => !todayDay || d >= todayDay)
      .sort((a, b) => a - b);
    const nextDay      = futureDays[0] || null;
    const nextSubs     = nextDay ? renewalMap[nextDay] : [];
    const nextLabel    = nextDay
      ? (nextDay === todayDay ? 'Today' : `${MONTH_NAMES[month].slice(0,3)} ${nextDay}`)
      : 'None';

    document.getElementById('cal-summary').innerHTML = `
      <div class="cal-stat">
        <span class="cal-stat-label">Total renewing this month</span>
        <span class="cal-stat-value">${formatCurrency(totalActual)}</span>
        <span class="cal-stat-hint">${eventCount} renewal event${eventCount === 1 ? '' : 's'}</span>
      </div>
      <div class="cal-stat">
        <span class="cal-stat-label">Number of events</span>
        <span class="cal-stat-value">${eventCount}</span>
        <span class="cal-stat-hint">across ${Object.keys(renewalMap).length} day${Object.keys(renewalMap).length === 1 ? '' : 's'}</span>
      </div>
      <div class="cal-stat">
        <span class="cal-stat-label">Next in ${MONTH_NAMES[month]}</span>
        <span class="cal-stat-value">${nextLabel}</span>
        <span class="cal-stat-hint">${nextSubs.length > 0 ? nextSubs.map(s => escHtml(s.name)).join(', ') : 'No renewals this month'}</span>
      </div>`;

    // Build calendar grid
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth  = new Date(year, month + 1, 0).getDate();

    let html = '<div class="cal-header">';
    DAY_NAMES.forEach((d) => {
      html += `<div class="cal-day-name">${d}</div>`;
    });
    html += '</div><div class="cal-body">';

    for (let i = 0; i < firstWeekday; i++) {
      html += '<div class="cal-cell cal-cell-empty"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday    = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
      const renewals   = renewalMap[day] || [];
      const hasRenewal = renewals.length > 0;
      const maxVisible = 3;
      const visible    = renewals.slice(0, maxVisible);
      const overflow   = renewals.length - maxVisible;

      const eventsHtml = visible.map((s) => {
        const color = s.category_color || 'var(--accent)';
        return `<div class="cal-event" style="background:${color}22;border-left:2px solid ${color};color:${color};">
          <span class="cal-event-name">${escHtml(s.name)}</span>
          <span class="cal-event-price">${formatCurrency(s.price)}</span>
        </div>`;
      }).join('');

      const moreHtml = overflow > 0 ? `<div class="cal-more">+${overflow} more</div>` : '';

      html += `<div class="cal-cell ${isToday ? 'today' : ''} ${hasRenewal ? 'has-renewal' : ''}">
        <span class="cal-day-num">${day}</span>
        ${eventsHtml}
        ${moreHtml}
      </div>`;
    }

    html += '</div>';
    document.getElementById('calendar-grid').innerHTML = html;

    // Animate all three content areas together
    ['cal-summary', 'calendar-grid', 'cal-agenda'].forEach((id) => {
      const el = document.getElementById(id);
      el.classList.remove('cal-page-right', 'cal-page-left', 'cal-page-fade');
      void el.offsetWidth;
      el.classList.add(_calAnim);
    });

    // Agenda list
    const agendaItems = Object.entries(renewalMap)
      .sort(([a], [b]) => Number(a) - Number(b));

    const agendaEl = document.getElementById('cal-agenda');
    if (agendaItems.length === 0) {
      agendaEl.innerHTML = `
        <div class="cal-agenda-header">Renewals this month</div>
        <div class="cal-agenda-empty">No renewals in ${MONTH_NAMES[month]} ${year}.</div>`;
    } else {
      const itemsHtml = agendaItems.flatMap(([dayStr, subList]) => {
        const d = Number(dayStr);
        const date = new Date(year, month, d);
        const dayName = DAY_NAMES[date.getDay()];
        return subList.map((s) => {
          const catPill = s.category_name
            ? `<span class="category-pill" style="font-size:0.68rem;padding:2px 7px;">
                <span class="category-dot" style="background:${s.category_color}" aria-hidden="true"></span>
                ${escHtml(s.category_name)}
              </span>`
            : '';
          return `<li class="cal-agenda-item">
            <div class="cal-agenda-day">
              <div class="cal-agenda-day-num">${d}</div>
              <div class="cal-agenda-day-name">${dayName}</div>
            </div>
            <div class="cal-agenda-info">
              <span class="cal-agenda-name">${escHtml(s.name)}</span>
              <div class="cal-agenda-meta">
                ${catPill}
                <span class="status-pill ${s.status}" style="font-size:0.65rem;padding:2px 7px;">${statusLabel(s.status)}</span>
              </div>
            </div>
            <span class="cal-agenda-price">${formatCurrency(s.price)}</span>
          </li>`;
        });
      }).join('');

      agendaEl.innerHTML = `
        <div class="cal-agenda-header">Renewals this month — ${MONTH_NAMES[month]} ${year}</div>
        <ul class="cal-agenda-list">${itemsHtml}</ul>`;
    }

  } catch {
    showToast('Failed to load calendar.', 'error');
    document.getElementById('calendar-grid').innerHTML =
      '<p style="color:var(--danger);text-align:center;padding:24px;">Failed to load. Please try again.</p>';
  }
}

// ============================================================
// SUBSCRIPTION WIZARD
// ============================================================

let subscriptionWizardState = {
  step: 1,
  selectedCategory: null,
  selectedService: null,
  isCustomService: false,
  searchQuery: '',
};

let _wizardCatList     = [];
let _wizardServiceList = [];

function openAddSubscriptionWizard() {
  resetSubscriptionWizard();
  document.getElementById('wizard-overlay').classList.remove('hidden');
  renderSubscriptionWizard();
}

function closeSubscriptionWizard() {
  document.getElementById('wizard-overlay').classList.add('hidden');
  resetSubscriptionWizard();
}

function resetSubscriptionWizard() {
  subscriptionWizardState = { step: 1, selectedCategory: null, selectedService: null, isCustomService: false, searchQuery: '' };
  _wizardCatList = [];
  _wizardServiceList = [];
}

function renderSubscriptionWizard() {
  _renderWizardHeader();
  const { step } = subscriptionWizardState;
  if (step === 1)      _renderWizardStep1();
  else if (step === 2) _renderWizardStep2();
  else if (step === 3) _renderWizardStep3();
}

function _renderWizardHeader() {
  const { step, selectedCategory } = subscriptionWizardState;
  const steps = [{ n: 1, label: 'Category' }, { n: 2, label: 'Service' }, { n: 3, label: 'Details' }];

  document.getElementById('wizard-steps').innerHTML = steps.map(s => {
    const cls = s.n < step ? 'completed' : s.n === step ? 'active' : '';
    const numContent = s.n < step
      ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>`
      : s.n;
    return `<div class="wizard-step ${cls}">
      <span class="wizard-step-num">${numContent}</span>
      <span class="wizard-step-label">${s.label}</span>
    </div>`;
  }).join('');

  const subtitles = {
    1: 'Start by choosing a category.',
    2: `Popular services in <strong>${escHtml(selectedCategory ? selectedCategory.name : '')}</strong>`,
    3: 'Fill in the subscription details.',
  };
  document.getElementById('wizard-subtitle').innerHTML = subtitles[step] || '';
}

function goToSubscriptionWizardStep(step) {
  if (step < subscriptionWizardState.step) subscriptionWizardState.searchQuery = '';
  subscriptionWizardState.step = step;
  renderSubscriptionWizard();
}

// ─── Step 1: Choose Category ──────────────────────────────

function _renderWizardStep1() {
  const builtInNorm = new Set(BUILT_IN_CATEGORIES.map(c => normalizeText(c.name)));
  const userCats    = categories.filter(c => !builtInNorm.has(normalizeText(c.name)));

  _wizardCatList = [
    ...BUILT_IN_CATEGORIES.map(c => {
      const backend = categories.find(bc => normalizeText(bc.name) === normalizeText(c.name));
      return {
        name: c.name,
        color: CATEGORY_META[c.key] ? CATEGORY_META[c.key].color : '#6b7280',
        description: CATEGORY_META[c.key] ? CATEGORY_META[c.key].description : '',
        backendId: backend ? backend.id : null,
      };
    }),
    ...userCats.map(c => ({
      name: c.name,
      color: c.color || '#6b7280',
      description: 'Custom category',
      backendId: c.id,
    })),
  ];

  const selected = subscriptionWizardState.selectedCategory;

  const cardsHtml = _wizardCatList.map((cat, idx) => {
    const isSel = selected && normalizeText(selected.name) === normalizeText(cat.name);
    return `<button class="category-option-card${isSel ? ' selected' : ''}" data-idx="${idx}"
      aria-pressed="${isSel}" aria-label="Select ${escHtml(cat.name)}">
      <div class="cat-card-dot-row">
        <span class="cat-card-dot" style="background:${escHtml(cat.color)}" aria-hidden="true"></span>
        <span class="cat-card-name">${escHtml(cat.name)}</span>
      </div>
      <span class="cat-card-desc">${escHtml(cat.description)}</span>
    </button>`;
  }).join('');

  document.getElementById('wizard-body').innerHTML =
    `<div class="category-picker-grid">${cardsHtml}</div>`;

  document.getElementById('wizard-actions').innerHTML = `
    <div></div>
    <div class="wizard-actions-right">
      <button class="btn-outline" id="wiz-cancel-1">Cancel</button>
    </div>`;

  document.getElementById('wiz-cancel-1').addEventListener('click', closeSubscriptionWizard);
  document.querySelector('.category-picker-grid').addEventListener('click', (e) => {
    const card = e.target.closest('[data-idx]');
    if (card) selectWizardCategory(_wizardCatList[parseInt(card.dataset.idx)]);
  });
}

function selectWizardCategory(cat) {
  subscriptionWizardState.selectedCategory  = cat;
  subscriptionWizardState.selectedService   = null;
  subscriptionWizardState.isCustomService   = false;
  subscriptionWizardState.searchQuery       = '';
  goToSubscriptionWizardStep(2);
}

// ─── Step 2: Choose Service ───────────────────────────────

function _renderWizardStep2() {
  const { selectedCategory, searchQuery, selectedService } = subscriptionWizardState;
  const catName     = selectedCategory ? selectedCategory.name : '';
  const catServices = getServicesForCategory(catName);
  const query       = normalizeText(searchQuery);

  const filtered = query
    ? catServices.filter(s => normalizeText(s.name).includes(query) || normalizeText(s.description).includes(query))
    : catServices;

  _wizardServiceList = filtered;

  let gridHtml;
  if (filtered.length === 0 && query) {
    gridHtml = `<div class="service-grid">
      <div class="service-empty-state">
        <p>No matching service found.</p>
        <small>Add it as a custom subscription instead.</small>
        <button class="btn-outline" id="wiz-empty-custom">Add custom service</button>
      </div>
    </div>`;
  } else {
    const serviceCards = filtered.map((svc, idx) => {
      const isSel  = selectedService && selectedService.id === svc.id;
      const visual = getServiceVisual(svc.name);
      const topRow = svc.popular
        ? `<div class="service-card-top"><span class="service-popular-badge">Popular</span></div>`
        : `<div class="service-card-top"></div>`;
      const logoEl = visual.logo
        ? `<img class="service-logo-img" src="${escHtml(visual.logo)}" alt="" aria-hidden="true" />`
        : `<div class="service-logo-fallback" style="background:${escHtml(visual.color)}" aria-hidden="true">${escHtml(visual.initial)}</div>`;
      return `<button class="service-option-card${isSel ? ' selected' : ''}" data-svc-idx="${idx}"
        aria-pressed="${isSel}" aria-label="Select ${escHtml(svc.name)}">
        ${topRow}
        ${logoEl}
        <span class="service-name">${escHtml(svc.name)}</span>
        <span class="service-desc">${escHtml(svc.description)}</span>
      </button>`;
    }).join('');

    const customCard = `<button class="service-option-card custom-service-card" id="wiz-custom-card"
      aria-label="Add a custom service">
      <div class="custom-service-icon" aria-hidden="true">+</div>
      <span class="service-name">Other / Custom</span>
      <span class="service-desc">Add it manually</span>
    </button>`;

    gridHtml = `<div class="service-grid">${serviceCards}${customCard}</div>`;
  }

  const catColor = selectedCategory ? selectedCategory.color : '#6b7280';
  document.getElementById('wizard-body').innerHTML = `
    <div class="service-picker-toolbar">
      <div class="wizard-search-wrap">
        <svg class="wizard-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="search" class="wizard-search-input" id="wizard-search"
          placeholder="Search services…" value="${escHtml(searchQuery)}"
          aria-label="Search services" autocomplete="off" />
      </div>
      <span class="wizard-cat-pill">
        <span style="width:7px;height:7px;border-radius:50%;background:${escHtml(catColor)};display:inline-block;flex-shrink:0;" aria-hidden="true"></span>
        ${escHtml(catName)}
      </span>
    </div>
    ${gridHtml}`;

  document.getElementById('wizard-actions').innerHTML = `
    <button class="btn-outline" id="wiz-back-2">← Back</button>
    <div class="wizard-actions-right">
      <button class="btn-outline" id="wiz-cancel-2">Cancel</button>
    </div>`;

  document.getElementById('wiz-back-2').addEventListener('click', () => goToSubscriptionWizardStep(1));
  document.getElementById('wiz-cancel-2').addEventListener('click', closeSubscriptionWizard);

  const searchEl = document.getElementById('wizard-search');
  searchEl.addEventListener('input', debounce((e) => {
    subscriptionWizardState.searchQuery = e.target.value;
    _renderWizardStep2();
    const s = document.getElementById('wizard-search');
    if (s) { s.focus(); const len = s.value.length; s.setSelectionRange(len, len); }
  }, 220));

  const grid = document.querySelector('.service-grid');
  if (grid) {
    grid.addEventListener('click', (e) => {
      const svcCard    = e.target.closest('[data-svc-idx]');
      const customCard = e.target.closest('#wiz-custom-card');
      if (svcCard) { selectWizardService(_wizardServiceList[parseInt(svcCard.dataset.svcIdx)]); return; }
      if (customCard) { selectCustomWizardService(); }
    });
  }

  const emptyCustom = document.getElementById('wiz-empty-custom');
  if (emptyCustom) emptyCustom.addEventListener('click', selectCustomWizardService);
}

function selectWizardService(svc) {
  subscriptionWizardState.selectedService  = svc;
  subscriptionWizardState.isCustomService  = false;
  goToSubscriptionWizardStep(3);
}

function selectCustomWizardService() {
  subscriptionWizardState.selectedService  = null;
  subscriptionWizardState.isCustomService  = true;
  goToSubscriptionWizardStep(3);
}

// ─── Step 3: Subscription Details ────────────────────────

function _renderWizardStep3() {
  const { selectedCategory, selectedService, isCustomService } = subscriptionWizardState;
  const svc          = selectedService;
  const isCatalog    = svc !== null && !isCustomService;
  const prefillName  = svc ? svc.name : '';
  const prefillCycle = svc ? svc.defaultBillingCycle : 'monthly';
  const catBackendId = selectedCategory ? selectedCategory.backendId : '';

  const catOptions = categories.map(c =>
    `<option value="${c.id}" ${c.id == catBackendId ? 'selected' : ''}>${escHtml(c.name)}</option>`
  ).join('');

  let summaryHtml = '';
  if (svc) {
    const visual = getServiceVisual(svc.name);
    const summaryLogoEl = visual.logo
      ? `<img class="service-summary-logo" src="${escHtml(visual.logo)}" alt="" aria-hidden="true" />`
      : `<div class="service-logo-fallback" style="background:${escHtml(visual.color)};width:42px;height:42px;" aria-hidden="true">${escHtml(visual.initial)}</div>`;
    summaryHtml = `<div class="selected-service-summary">
      ${summaryLogoEl}
      <div class="selected-service-summary-info">
        <div class="selected-service-summary-name">${escHtml(svc.name)}</div>
        <div class="selected-service-summary-cat">${escHtml(selectedCategory ? selectedCategory.name : '')}</div>
      </div>
      <button class="change-service-btn" id="wiz-change-svc">Change service</button>
    </div>`;
  } else if (isCustomService) {
    summaryHtml = `<div class="selected-service-summary">
      <div class="custom-service-icon" style="width:42px;height:42px;" aria-hidden="true">+</div>
      <div class="selected-service-summary-info">
        <div class="selected-service-summary-name">Custom service</div>
        <div class="selected-service-summary-cat">${escHtml(selectedCategory ? selectedCategory.name : 'No category')}</div>
      </div>
      <button class="change-service-btn" id="wiz-change-svc">Change</button>
    </div>`;
  }

  const today = new Date().toISOString().split('T')[0];

  const nameFieldHtml = isCatalog
    ? `<div class="form-group">
        <label>Service name</label>
        <div class="readonly-value">${escHtml(prefillName)}</div>
      </div>`
    : `<div class="form-group">
        <label for="wiz-name">Service name *</label>
        <input id="wiz-name" name="name" value="${escHtml(prefillName)}"
          placeholder="Enter service name…"
          required autocomplete="off" />
      </div>`;

  const catFieldHtml = isCatalog
    ? `<div class="form-group">
        <label>Category</label>
        <div class="readonly-value">${escHtml(selectedCategory ? selectedCategory.name : '—')}</div>
      </div>`
    : `<div class="form-group">
        <label for="wiz-cat">Category</label>
        <select id="wiz-cat" name="category_id">
          <option value="">No category</option>
          ${catOptions}
        </select>
      </div>`;

  document.getElementById('wizard-body').innerHTML = `
    ${summaryHtml}
    <form id="wizard-sub-form" novalidate>
      <div id="wizard-form-errors"></div>
      ${nameFieldHtml}
      <div class="form-row">
        <div class="form-group">
          <label for="wiz-price">Price *</label>
          <input id="wiz-price" name="price" type="number" step="0.01" min="0" placeholder="9.99" required />
        </div>
        <div class="form-group">
          <label for="wiz-cycle">Billing cycle *</label>
          <select id="wiz-cycle" name="billing_cycle">
            <option value="monthly" ${prefillCycle === 'monthly' ? 'selected' : ''}>Monthly</option>
            <option value="annual"  ${prefillCycle === 'annual'  ? 'selected' : ''}>Annual</option>
            <option value="weekly"  ${prefillCycle === 'weekly'  ? 'selected' : ''}>Weekly</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="wiz-start">Start date *</label>
          <input id="wiz-start" name="start_date" type="date" value="${today}" required />
        </div>
        <div class="form-group">
          <label for="wiz-status">Status</label>
          <select id="wiz-status" name="status">
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      ${catFieldHtml}
      <div class="form-group">
        <label for="wiz-notes">Notes</label>
        <textarea id="wiz-notes" name="notes" placeholder="Optional notes…"></textarea>
      </div>
    </form>`;

  document.getElementById('wizard-actions').innerHTML = `
    <button class="btn-outline" id="wiz-back-3">← Back</button>
    <div class="wizard-actions-right">
      <button class="btn-outline" id="wiz-cancel-3">Cancel</button>
      <button class="btn-primary" id="wiz-submit">Add Subscription</button>
    </div>`;

  document.getElementById('wiz-back-3').addEventListener('click', () => goToSubscriptionWizardStep(2));
  document.getElementById('wiz-cancel-3').addEventListener('click', closeSubscriptionWizard);
  document.getElementById('wiz-submit').addEventListener('click', submitSubscriptionWizard);
  document.getElementById('wizard-sub-form').addEventListener('submit', (e) => { e.preventDefault(); submitSubscriptionWizard(); });

  const changeSvcBtn = document.getElementById('wiz-change-svc');
  if (changeSvcBtn) changeSvcBtn.addEventListener('click', () => goToSubscriptionWizardStep(2));
}

async function submitSubscriptionWizard() {
  const form = document.getElementById('wizard-sub-form');
  const fd   = new FormData(form);
  const { selectedService, isCustomService, selectedCategory } = subscriptionWizardState;
  const isCatalog = selectedService !== null && !isCustomService;

  const body = {
    name:          isCatalog ? selectedService.name : fd.get('name'),
    price:         fd.get('price'),
    billing_cycle: fd.get('billing_cycle'),
    start_date:    fd.get('start_date'),
    status:        fd.get('status'),
    category_id:   isCatalog
      ? (selectedCategory ? selectedCategory.backendId : null)
      : (fd.get('category_id') || null),
    notes:         fd.get('notes') || null,
  };

  const errors = validateSubscriptionForm(body);
  if (errors.length > 0) {
    document.getElementById('wizard-form-errors').innerHTML =
      `<div class="form-errors">${errors.map(m => `<p>${escHtml(m)}</p>`).join('')}</div>`;
    return;
  }

  const submitBtn = document.getElementById('wiz-submit');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Adding…'; }

  try {
    await apiFetch('/subscriptions', { method: 'POST', body: JSON.stringify(body) });
    showToast('Subscription added!');
    closeSubscriptionWizard();
    loadSubscriptions();
    loadDashboard();
  } catch (err) {
    const msgs = err.errors || [err.error || 'An error occurred.'];
    document.getElementById('wizard-form-errors').innerHTML =
      `<div class="form-errors">${msgs.map(m => `<p>${escHtml(m)}</p>`).join('')}</div>`;
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Add Subscription'; }
  }
}

function initWizard() {
  document.getElementById('wizard-close-btn').addEventListener('click', closeSubscriptionWizard);
  document.getElementById('wizard-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('wizard-overlay')) closeSubscriptionWizard();
  });
}

// ============================================================
// MODAL
// ============================================================

function openModal(title, bodyHtml) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML    = bodyHtml;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

function initModal() {
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!document.getElementById('modal-overlay').classList.contains('hidden')) closeModal();
    if (!document.getElementById('wizard-overlay').classList.contains('hidden')) closeSubscriptionWizard();
  });
}

// ============================================================
// NOTIFICATIONS
// ============================================================

async function checkRenewalNotifications() {
  if (!('Notification' in window)) return;

  try {
    const summary = await apiFetch('/subscriptions/summary');
    const urgent  = (summary.upcomingRenewals || []).filter((s) => {
      const days = daysUntil(s.renewal_date);
      return days >= 0 && days <= 3;
    });

    if (urgent.length === 0) return;

    if (Notification.permission === 'granted') {
      sendRenewalNotifications(urgent);
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') sendRenewalNotifications(urgent);
    }
  } catch {
    // notifications are optional — silently ignore
  }
}

function sendRenewalNotifications(subscriptions) {
  subscriptions.forEach((s) => {
    const days = daysUntil(s.renewal_date);
    const when = days === 0 ? 'today' : days === 1 ? 'tomorrow' : `in ${days} days`;
    new Notification('Subscription Radar', {
      body: `${s.name} renews ${when} — ${formatCurrency(s.price)}`,
      icon: '/favicon.ico',
    });
  });
}

// ============================================================
// APP INIT
// ============================================================

function initApp() {
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
  document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
  document.querySelector('.nav-btn[data-page="dashboard"]').classList.add('active');
  document.getElementById('page-dashboard').classList.add('active');
  currentPage = 'dashboard';

  initNavigation();
  initFilters();
  initSubButton();
  initCatButton();
  initModal();
  initWizard();
  initCalendarPicker();

  loadCategoriesData().then(() => {
    loadDashboard();
    checkRenewalNotifications();
  });
}

// ============================================================
// BOOTSTRAP
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  if (getToken()) {
    showApp();
    initApp();
  } else {
    showAuthPage();
  }
});
