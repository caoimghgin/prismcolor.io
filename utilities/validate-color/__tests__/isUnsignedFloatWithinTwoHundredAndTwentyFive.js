import { unsignedFloatWithinTwoHundredFiftyFive } from '../index';

test(`given string value of '0', RegExp unsignedFloatWithinTwoHundredFiftyFive returns TRUE`, () => {
  const value = '0';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloatWithinTwoHundredFiftyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '1', RegExp unsignedFloatWithinTwoHundredFiftyFive returns TRUE`, () => {
  const value = '1';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloatWithinTwoHundredFiftyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '255', RegExp unsignedFloatWithinTwoHundredFiftyFive returns TRUE`, () => {
  const value = '255';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloatWithinTwoHundredFiftyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '0.0', RegExp unsignedFloatWithinTwoHundredFiftyFive returns TRUE`, () => {
  const value = '0.0';
  const expected = true;
  const regex = new RegExp(`^${unsignedFloatWithinTwoHundredFiftyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '256', RegExp unsignedFloatWithinTwoHundredFiftyFive returns TRUE`, () => {
  const value = '256';
  const expected = false;
  const regex = new RegExp(`^${unsignedFloatWithinTwoHundredFiftyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});
