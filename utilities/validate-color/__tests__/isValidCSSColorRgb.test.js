import { isValidCSSColorRgb } from '../index';

test(`given string value of 'rgb(255 0 0)', RegExp isValidCSSColorRgb returns TRUE`, () => {
  const value = 'rgb(255 0 0)';
  const expected = true;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});

test(`given string value of 'rgb(0 255 0)', RegExp isValidCSSColorRgb returns TRUE`, () => {
  const value = 'rgb(0 255 0)';
  const expected = true;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});

test(`given string value of 'rgb(0 0 255)', RegExp isValidCSSColorRgb returns TRUE`, () => {
  const value = 'rgb(0 0 255)';
  const expected = true;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});

test(`given string value of 'rgb(255 255 255)', RegExp isValidCSSColorRgb returns TRUE`, () => {
  const value = 'rgb(0 0 0)';
  const expected = true;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});

test(`given string value of 'rgb(255 255 255)', RegExp isValidCSSColorRgb returns TRUE`, () => {
  const value = 'rgb(255 255 255)';
  const expected = true;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});

test(`given string value of 'rgb(-1 -1 -1)', RegExp isValidCSSColorRgb returns FALSE`, () => {
  const value = 'rgb(-1 -1 -1)';
  const expected = false;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});

test(`given string value of 'rgb(256 0 0)', RegExp isValidCSSColorRgb returns FALSE`, () => {
  const value = 'rgb(0 0 0)';
  const expected = true;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});

test(`given string value of 'rgb(256 0 0)', RegExp isValidCSSColorRgb returns FALSE`, () => {
  const value = 'rgb(256 0 0)';
  const expected = false;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});

test(`given string value of 'rgb(0 256 0)', RegExp isValidCSSColorRgb returns FALSE`, () => {
  const value = 'rgb(0 256 0)';
  const expected = false;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});

test(`given string value of 'rgb(0 0 256)', RegExp isValidCSSColorRgb returns FALSE`, () => {
  const value = 'rgb(0 0 256)';
  const expected = false;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});

test(`given string value of 'rgb(123.456 0 0)', RegExp isValidCSSColorRgb returns FALSE`, () => {
  const value = 'rgb(123.456 0 0)';
  const expected = false;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});

test(`given string value of 'rgba(255 0 0)', RegExp isValidCSSColorRgb returns TRUE`, () => {
  const value = 'rgba(255 0 0)';
  const expected = true;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});

test(`given string value of 'rgba(255 0 0 0.5)', RegExp isValidCSSColorRgb returns TRUE`, () => {
  const value = 'rgba(255 0 0 0.5)';
  const expected = true;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});

test(`given string value of 'rgba(255 0 0 1)', RegExp isValidCSSColorRgb returns TRUE`, () => {
  const value = 'rgba(255 0 0 1)';
  const expected = true;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});

test(`given string value of 'rgba(255 0 0 1.5)', RegExp isValidCSSColorRgb returns FALSE`, () => {
  const value = 'rgba(255 0 0 1.5)';
  const expected = false;
  const result = isValidCSSColorRgb(value);
  expect(result).toBe(expected);
});
