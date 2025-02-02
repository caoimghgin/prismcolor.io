import { isValidCSSColorLab } from '../index';

test(`given string value of 'lab(29.2345% 39.3825 20.0664)', RegExp isValidCSSColorLab returns TRUE`, () => {
  const value = 'lab(29.2345% 39.3825 20.0664)';
  const expected = true;
  const result = isValidCSSColorLab(value);
  expect(result).toBe(expected);
});

test(`given string value of 'lab(29.2345 39.3825 20.0664)' (without a '%' sign in L*), RegExp isValidCSSColorLab returns FALSE`, () => {
  const value = 'lab(29.2345 39.3825 20.0664)';
  const expected = false;
  const result = isValidCSSColorLab(value);
  expect(result).toBe(expected);
});

test(`given string value of 'lab(-29.2345% 39.3825 20.0664)' (The L* is a negative signedFloat), RegExp isValidCSSColorLab returns FALSE`, () => {
  const value = 'lab(-29.2345% 39.3825 20.0664)';
  const expected = false;
  const result = isValidCSSColorLab(value);
  expect(result).toBe(expected);
});

test(`given string value of 'lab(29.2345% -39.3825 20.0664)', RegExp isValidCSSColorLab returns TRUE`, () => {
  const value = 'lab(29.2345% -39.3825 20.0664)';
  const expected = true;
  const result = isValidCSSColorLab(value);
  expect(result).toBe(expected);
});

test(`given string value of 'lab(29.2345% 39.3825 -20.0664)', RegExp isValidCSSColorLab returns TRUE`, () => {
  const value = 'lab(29.2345% 39.3825 -20.0664)';
  const expected = true;
  const result = isValidCSSColorLab(value);
  expect(result).toBe(expected);
});

test(`given string value of 'lab(29% 40 20)', RegExp isValidCSSColorLab returns TRUE`, () => {
  const value = 'lab(29% 40 20)';
  const expected = true;
  const result = isValidCSSColorLab(value);
  expect(result).toBe(expected);
});

test(`given string value of 'lab(29% -40 20)', RegExp isValidCSSColorLab returns TRUE`, () => {
  const value = 'lab(29% -40 20)';
  const expected = true;
  const result = isValidCSSColorLab(value);
  expect(result).toBe(expected);
});

test(`given string value of 'bal(29% 40 20)', RegExp isValidCSSColorLab returns FALSE`, () => {
  const value = 'bal(29% 40 20)';
  const expected = false;
  const result = isValidCSSColorLab(value);
  expect(result).toBe(expected);
});
