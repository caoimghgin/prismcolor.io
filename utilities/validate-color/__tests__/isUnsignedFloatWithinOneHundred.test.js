import { unsignedFloatWithinOneHundred } from '../index';

test(`given string value of '0', RegExp isUnsignedFloatWithinOneHundred returns TRUE`, () => {
  const value = '0';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloatWithinOneHundred}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '0.0', RegExp isUnsignedFloatWithinOneHundred returns TRUE`, () => {
  const value = '0.0';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloatWithinOneHundred}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '-0.0', RegExp isUnsignedFloatWithinOneHundred returns FALSE`, () => {
  const value = '-0.0';
  const expected = false;
  const regex = new RegExp(`^${unsignedFloatWithinOneHundred}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '-1', RegExp isUnsignedFloatWithinOneHundred returns FALSE`, () => {
  const value = '-1';
  const expected = false;
  const regex = new RegExp(`^${unsignedFloatWithinOneHundred}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '100', RegExp isUnsignedFloatWithinOneHundred returns TRUE`, () => {
  const value = '100';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloatWithinOneHundred}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '100.0', RegExp isUnsignedFloatWithinOneHundred returns TRUE`, () => {
  const value = '100.0';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloatWithinOneHundred}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '100.1', RegExp isUnsignedFloatWithinOneHundred returns FALSE`, () => {
  const value = '100.1';
  const expected = false;
  const regex = new RegExp(`^${unsignedFloatWithinOneHundred}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '101', RegExp isUnsignedFloatWithinOneHundred returns FALSE`, () => {
  const value = '101';
  const expected = false;
  const regex = new RegExp(`^${unsignedFloatWithinOneHundred}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});
