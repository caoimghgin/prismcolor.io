import { unsignedFloatWithinThreeHundredSixty } from '../index';

test(`given string value of '0', RegExp isUnsignedFloatWithinThreeHundredSixty returns TRUE`, () => {
  const value = '0';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloatWithinThreeHundredSixty}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '1', RegExp isUnsignedFloatWithinThreeHundredSixty returns TRUE`, () => {
  const value = '1';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloatWithinThreeHundredSixty}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '360', RegExp isUnsignedFloatWithinThreeHundredSixty returns TRUE`, () => {
  const value = '360';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloatWithinThreeHundredSixty}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '0.0', RegExp isUnsignedFloatWithinThreeHundredSixty returns TRUE`, () => {
  const value = '0.0';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloatWithinThreeHundredSixty}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '360.0', RegExp isUnsignedFloatWithinThreeHundredSixty returns TRUE`, () => {
  const value = '360.0';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloatWithinThreeHundredSixty}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '-0.0', RegExp isUnsignedFloatWithinThreeHundredSixty returns FALSE`, () => {
  const value = '-0.0';
  const expected = false;
  const regex = new RegExp(`^${unsignedFloatWithinThreeHundredSixty}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '-1', RegExp isUnsignedFloatWithinThreeHundredSixty returns FALSE`, () => {
  const value = '-0.0';
  const expected = false;
  const regex = new RegExp(`^${unsignedFloatWithinThreeHundredSixty}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});
