import { unsignedFloat } from '../index';

test(`given string value of '1', RegExp isUnsignedFloat returns TRUE`, () => {
  const value = '1';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloat}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '1.0', RegExp isUnsignedFloat returns TRUE`, () => {
  const value = '1.0';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloat}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '-1.0', RegExp isUnsignedFloat returns FALSE`, () => {
  const value = '-1.0';
  const expected = false;
  const regex = new RegExp(`^${unsignedFloat}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of Pi, RegExp isUnsignedFloat returns FALSE`, () => {
  const value = '3.141592653589793238462643383279502884197169399375105820974944';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloat}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});
