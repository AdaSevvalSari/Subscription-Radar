const {
  calculateCostPerUse,
  simulateCancellation,
  detectWaste,
  getMonthlyUsageCount,
} = require('../src/services/usageService');

describe('calculateCostPerUse', () => {
  test('divides monthly price by usage count', () => {
    expect(calculateCostPerUse(100, 10)).toBe(10);
  });

  test('rounds to 2 decimal places', () => {
    expect(calculateCostPerUse(10, 3)).toBe(3.33);
  });

  test('returns null when usage count is zero', () => {
    expect(calculateCostPerUse(100, 0)).toBeNull();
  });

  test('returns null when usage count is negative', () => {
    expect(calculateCostPerUse(100, -1)).toBeNull();
  });
});

describe('simulateCancellation', () => {
  test('returns correct monthly and annual savings', () => {
    const result = simulateCancellation(50);
    expect(result.monthlySavings).toBe(50);
    expect(result.annualSavings).toBe(600);
  });

  test('works with fractional prices', () => {
    const result = simulateCancellation(14.99);
    expect(result.monthlySavings).toBe(14.99);
    expect(result.annualSavings).toBe(179.88);
  });

  test('returns zero savings for free subscription', () => {
    const result = simulateCancellation(0);
    expect(result.monthlySavings).toBe(0);
    expect(result.annualSavings).toBe(0);
  });
});

describe('detectWaste', () => {
  test('returns untracked when no usage has been logged', () => {
    const result = detectWaste(0, null);
    expect(result.status).toBe('untracked');
    expect(result.isWasted).toBe(false);
  });

  test('flags as inactive when last use was over 30 days ago', () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 35);
    const result = detectWaste(5, oldDate.toISOString().split('T')[0]);
    expect(result.isWasted).toBe(true);
    expect(result.status).toBe('inactive');
  });

  test('does not flag as wasted when recently used', () => {
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 5);
    const result = detectWaste(10, recentDate.toISOString().split('T')[0]);
    expect(result.isWasted).toBe(false);
    expect(result.status).toBe('active_use');
  });

  test('respects custom inactiveDaysThreshold', () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 10);
    const result = detectWaste(3, oldDate.toISOString().split('T')[0], 7);
    expect(result.isWasted).toBe(true);
  });
});

describe('getMonthlyUsageCount', () => {
  const today = new Date();

  const recentLog = { logged_at: new Date(today.getTime() - 5 * 86400000).toISOString().split('T')[0] };
  const oldLog = { logged_at: new Date(today.getTime() - 45 * 86400000).toISOString().split('T')[0] };

  test('counts only logs from the last 30 days', () => {
    expect(getMonthlyUsageCount([recentLog, oldLog])).toBe(1);
  });

  test('returns 0 for empty log list', () => {
    expect(getMonthlyUsageCount([])).toBe(0);
  });

  test('counts all when all logs are recent', () => {
    expect(getMonthlyUsageCount([recentLog, recentLog])).toBe(2);
  });
});
