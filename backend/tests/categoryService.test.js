const { validateCategory, isCategoryInUse } = require('../src/services/categoryService');

describe('validateCategory', () => {
  test('returns no errors for valid data', () => {
    expect(validateCategory({ name: 'Entertainment', color: '#ef4444' })).toHaveLength(0);
  });

  test('returns error when name is missing', () => {
    const errors = validateCategory({ color: '#ef4444' });
    expect(errors.some((e) => e.toLowerCase().includes('required'))).toBe(true);
  });

  test('returns error when name exceeds 50 characters', () => {
    const errors = validateCategory({ name: 'a'.repeat(51) });
    expect(errors.some((e) => e.includes('50 characters'))).toBe(true);
  });

  test('returns error for invalid hex color', () => {
    const errors = validateCategory({ name: 'Test', color: 'red' });
    expect(errors.some((e) => e.toLowerCase().includes('hex'))).toBe(true);
  });

  test('is valid without a color field', () => {
    expect(validateCategory({ name: 'Test' })).toHaveLength(0);
  });
});

describe('isCategoryInUse', () => {
  const subscriptions = [
    { id: 1, category_id: 2 },
    { id: 2, category_id: 3 },
  ];

  test('returns true when category is in use', () => {
    expect(isCategoryInUse(2, subscriptions)).toBe(true);
  });

  test('returns false when category is not in use', () => {
    expect(isCategoryInUse(99, subscriptions)).toBe(false);
  });

  test('returns false for empty subscription list', () => {
    expect(isCategoryInUse(1, [])).toBe(false);
  });
});
