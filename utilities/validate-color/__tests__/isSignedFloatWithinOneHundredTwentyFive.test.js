import { signedFloatWithinOneHundredTwentyFive } from '../index';

test(`given string value of '0', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '0';
  const expected = true;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '0.0', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '0.0';
  const expected = true;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '1', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '1';
  const expected = true;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '-1', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '-1';
  const expected = true;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '1.0', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '1.0';
  const expected = true;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '-1.0', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '-1.0';
  const expected = true;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '9', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '9';
  const expected = true;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '-9', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '-9';
  const expected = true;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '125', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '125';
  const expected = true;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '-125', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '-125';
  const expected = true;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '125.0', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '125.0';
  const expected = true;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '-125.0', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '-125.0';
  const expected = true;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '125.001', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '125.001';
  const expected = false;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '-125.001', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '-125.001';
  const expected = false;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '126', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '126';
  const expected = false;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '-126', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '-126';
  const expected = false;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '126.0', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '126.0';
  const expected = false;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});

test(`given string value of '-126.0', RegExp isSignedFloatWithinOneHundredTwentyFive returns TRUE`, () => {
  const value = '-126.0';
  const expected = false;
  const regex = new RegExp(`^${signedFloatWithinOneHundredTwentyFive}$`);
  const result = regex.test(value);
  expect(result).toBe(expected);
});
