import { signedFloat } from '../index';

test(`given string value of '1', RegExp isSignedFloat returns TRUE`, () => {
  const value = '3';
  const expected = true;
  const regex = new RegExp(`^${signedFloat}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '-1', RegExp isSignedFloat returns TRUE`, () => {
  const value = '-3';
  const expected = true;
  const regex = new RegExp(`^${signedFloat}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of Pi, RegExp isSignedFloat returns FALSE`, () => {
  const value = '3.141592653589793238462643383279502884197169399375105820974944';
  const expected = true;
  const regex = new RegExp(`^${signedFloat}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of Pi, RegExp isSignedFloat returns FALSE`, () => {
  const value = '-3.141592653589793238462643383279502884197169399375105820974944';
  const expected = true;
  const regex = new RegExp(`^${signedFloat}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});
