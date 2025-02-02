import { isValidCSSColorOkLab } from '../index';

test(`given string value of 'oklab(29.2345% 39.3825 20.0664)', RegExp isValidCSSColorOkLab returns TRUE`, () => {
  const value = 'oklab(29.2345% 39.3825 20.0664)';
  const expected = true;
  const result = isValidCSSColorOkLab(value);
  expect(result).toBe(expected);
});

test(`given string value of 'oklab(29.2345 39.3825 20.0664)' (without a '%' sign in L*), RegExp isValidCSSColorOkLab returns FALSE`, () => {
  const value = 'oklab(29.2345 39.3825 20.0664)';
  const expected = false;
  const result = isValidCSSColorOkLab(value);
  expect(result).toBe(expected);
});

test(`given string value of 'oklab(-29.2345% 39.3825 20.0664)' (The L* is a negative signedFloat), RegExp isValidCSSColorOkLab returns FALSE`, () => {
  const value = 'oklab(-29.2345% 39.3825 20.0664)';
  const expected = false;
  const result = isValidCSSColorOkLab(value);
  expect(result).toBe(expected);
});

test(`given string value of 'oklab(29.2345% -39.3825 20.0664)', RegExp isValidCSSColorOkLab returns TRUE`, () => {
  const value = 'oklab(29.2345% -39.3825 20.0664)';
  const expected = true;
  const result = isValidCSSColorOkLab(value);
  expect(result).toBe(expected);
});

test(`given string value of 'oklab(29.2345% 39.3825 -20.0664)', RegExp isValidCSSColorOkLab returns TRUE`, () => {
  const value = 'oklab(29.2345% 39.3825 -20.0664)';
  const expected = true;
  const result = isValidCSSColorOkLab(value);
  expect(result).toBe(expected);
});

test(`given string value of 'oklab(29% 40 20)', RegExp isValidCSSColorOkLab returns TRUE`, () => {
  const value = 'oklab(29% 40 20)';
  const expected = true;
  const result = isValidCSSColorOkLab(value);
  expect(result).toBe(expected);
});

test(`given string value of 'oklab(29% -40 20)', RegExp isValidCSSColorOkLab returns TRUE`, () => {
  const value = 'oklab(29% -40 20)';
  const expected = true;
  const result = isValidCSSColorOkLab(value);
  expect(result).toBe(expected);
});

test(`given string value of 'bal(29% 40 20)', RegExp isValidCSSColorOkLab returns FALSE`, () => {
  const value = 'bal(29% 40 20)';
  const expected = false;
  const result = isValidCSSColorOkLab(value);
  expect(result).toBe(expected);
});
