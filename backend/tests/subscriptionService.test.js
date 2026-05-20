const {
  calculateMonthlyEquivalent,
  calculateRenewalDate,
  getUpcomingRenewals,
  calculateMonthlySummary,
  validateSubscription,
} = require('../src/services/subscriptionService');

describe('calculateMonthlyEquivalent', () => {
  test('returns monthly price unchanged', () => {
    expect(calculateMonthlyEquivalent(100, 'monthly')).toBe(100);
  });

  test('divides annual price by 12', () => {
    expect(calculateMonthlyEquivalent(1200, 'annual')).toBe(100);
  });

  test('handles fractional annual division', () => {
    expect(calculateMonthlyEquivalent(999, 'annual')).toBe(83.25);
  });

  test('multiplies weekly price by 4.33', () => {
    expect(calculateMonthlyEquivalent(100, 'weekly')).toBe(433);
  });
});

describe('calculateRenewalDate', () => {
  test('adds 1 month for monthly cycle', () => {
    expect(calculateRenewalDate('2026-01-15', 'monthly')).toBe('2026-02-15');
  });

  test('adds 1 year for annual cycle', () => {
    expect(calculateRenewalDate('2026-01-15', 'annual')).toBe('2027-01-15');
  });

  test('adds 7 days for weekly cycle', () => {
    expect(calculateRenewalDate('2026-01-01', 'weekly')).toBe('2026-01-08');
  });
});

describe('getUpcomingRenewals', () => {
  const today = new Date();

  const inThreeDays = new Date(today);
  inThreeDays.setDate(today.getDate() + 3);

  const inTenDays = new Date(today);
  inTenDays.setDate(today.getDate() + 10);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const subs = [
    { id: 1, name: 'Netflix', status: 'active', renewal_date: inThreeDays.toISOString().split('T')[0] },
    { id: 2, name: 'Spotify', status: 'active', renewal_date: inTenDays.toISOString().split('T')[0] },
    { id: 3, name: 'Past Sub', status: 'active', renewal_date: yesterday.toISOString().split('T')[0] },
    { id: 4, name: 'Paused Sub', status: 'paused', renewal_date: inThreeDays.toISOString().split('T')[0] },
  ];

  test('returns subscriptions renewing within 7 days', () => {
    const result = getUpcomingRenewals(subs, 7);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Netflix');
  });

  test('excludes paused subscriptions', () => {
    const result = getUpcomingRenewals(subs, 7);
    expect(result.map((s) => s.name)).not.toContain('Paused Sub');
  });

  test('excludes past renewal dates', () => {
    const result = getUpcomingRenewals(subs, 7);
    expect(result.map((s) => s.name)).not.toContain('Past Sub');
  });

  test('returns empty array for empty input', () => {
    expect(getUpcomingRenewals([], 7)).toHaveLength(0);
  });
});

describe('calculateMonthlySummary', () => {
  const subs = [
    { id: 1, name: 'Netflix', price: 100, billing_cycle: 'monthly', status: 'active', category_name: 'Entertainment', category_color: '#ef4444' },
    { id: 2, name: 'Spotify', price: 1200, billing_cycle: 'annual', status: 'active', category_name: 'Music', category_color: '#a855f7' },
    { id: 3, name: 'Cancelled', price: 200, billing_cycle: 'monthly', status: 'cancelled', category_name: 'Other', category_color: '#6b7280' },
  ];

  test('only sums active subscriptions', () => {
    const result = calculateMonthlySummary(subs);
    expect(result.totalMonthly).toBe(200);
  });

  test('calculates annual total correctly', () => {
    const result = calculateMonthlySummary(subs);
    expect(result.totalAnnual).toBe(2400);
  });

  test('returns correct active count', () => {
    const result = calculateMonthlySummary(subs);
    expect(result.activeCount).toBe(2);
  });
});

describe('validateSubscription', () => {
  test('returns no errors for valid data', () => {
    const errors = validateSubscription({
      name: 'Netflix',
      price: 9.99,
      billing_cycle: 'monthly',
      start_date: '2026-01-01',
    });
    expect(errors).toHaveLength(0);
  });

  test('returns error when name is missing', () => {
    const errors = validateSubscription({ price: 9.99, billing_cycle: 'monthly', start_date: '2026-01-01' });
    expect(errors.some((e) => e.toLowerCase().includes('name'))).toBe(true);
  });

  test('returns error for negative price', () => {
    const errors = validateSubscription({ name: 'A', price: -5, billing_cycle: 'monthly', start_date: '2026-01-01' });
    expect(errors.some((e) => e.toLowerCase().includes('price'))).toBe(true);
  });

  test('returns error for invalid billing cycle', () => {
    const errors = validateSubscription({ name: 'A', price: 10, billing_cycle: 'daily', start_date: '2026-01-01' });
    expect(errors.some((e) => e.toLowerCase().includes('billing cycle'))).toBe(true);
  });

  test('returns error for invalid start date', () => {
    const errors = validateSubscription({ name: 'A', price: 10, billing_cycle: 'monthly', start_date: 'not-a-date' });
    expect(errors.some((e) => e.toLowerCase().includes('date'))).toBe(true);
  });
});
