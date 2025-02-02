// Good article on HTML Colors:
// https://dev.to/alvaromontoro/the-ultimate-guide-to-css-colors-2020-edition-1bh1#hsl

const debugRegex = false;

// Check if parameter is defined and a string
const isString = (color) => color && typeof color === 'string';
// All existing HTML color names
const htmlColorNames = [
  'AliceBlue',
  'AntiqueWhite',
  'Aqua',
  'Aquamarine',
  'Azure',
  'Beige',
  'Bisque',
  'Black',
  'BlanchedAlmond',
  'Blue',
  'BlueViolet',
  'Brown',
  'BurlyWood',
  'CadetBlue',
  'Chartreuse',
  'Chocolate',
  'Coral',
  'CornflowerBlue',
  'Cornsilk',
  'Crimson',
  'Cyan',
  'DarkBlue',
  'DarkCyan',
  'DarkGoldenrod',
  'DarkGray',
  'DarkGrey',
  'DarkGreen',
  'DarkKhaki',
  'DarkMagenta',
  'DarkOliveGreen',
  'DarkOrange',
  'DarkOrchid',
  'DarkRed',
  'DarkSalmon',
  'DarkSeaGreen',
  'DarkSlateBlue',
  'DarkSlateGray',
  'DarkSlateGrey',
  'DarkTurquoise',
  'DarkViolet',
  'DeepPink',
  'DeepSkyBlue',
  'DimGray',
  'DimGrey',
  'DodgerBlue',
  'FireBrick',
  'FloralWhite',
  'ForestGreen',
  'Fuchsia',
  'Gainsboro',
  'GhostWhite',
  'Gold',
  'Goldenrod',
  'Gray',
  'Grey',
  'Green',
  'GreenYellow',
  'HoneyDew',
  'HotPink',
  'IndianRed',
  'Indigo',
  'Ivory',
  'Khaki',
  'Lavender',
  'LavenderBlush',
  'LawnGreen',
  'LemonChiffon',
  'LightBlue',
  'LightCoral',
  'LightCyan',
  'LightGoldenrodYellow',
  'LightGray',
  'LightGrey',
  'LightGreen',
  'LightPink',
  'LightSalmon',
  'LightSalmon',
  'LightSeaGreen',
  'LightSkyBlue',
  'LightSlateGray',
  'LightSlateGrey',
  'LightSteelBlue',
  'LightYellow',
  'Lime',
  'LimeGreen',
  'Linen',
  'Magenta',
  'Maroon',
  'MediumAquamarine',
  'MediumBlue',
  'MediumOrchid',
  'MediumPurple',
  'MediumSeaGreen',
  'MediumSlateBlue',
  'MediumSlateBlue',
  'MediumSpringGreen',
  'MediumTurquoise',
  'MediumVioletRed',
  'MidnightBlue',
  'MintCream',
  'MistyRose',
  'Moccasin',
  'NavajoWhite',
  'Navy',
  'OldLace',
  'Olive',
  'OliveDrab',
  'Orange',
  'OrangeRed',
  'Orchid',
  'PaleGoldenrod',
  'PaleGreen',
  'PaleTurquoise',
  'PaleVioletRed',
  'PapayaWhip',
  'PeachPuff',
  'Peru',
  'Pink',
  'Plum',
  'PowderBlue',
  'Purple',
  'RebeccaPurple',
  'Red',
  'RosyBrown',
  'RoyalBlue',
  'SaddleBrown',
  'Salmon',
  'SandyBrown',
  'SeaGreen',
  'SeaShell',
  'Sienna',
  'Silver',
  'SkyBlue',
  'SlateBlue',
  'SlateGray',
  'SlateGrey',
  'Snow',
  'SpringGreen',
  'SteelBlue',
  'Tan',
  'Teal',
  'Thistle',
  'Tomato',
  'Turquoise',
  'Violet',
  'Wheat',
  'White',
  'WhiteSmoke',
  'Yellow',
  'YellowGreen',
];
// These 3 values are valid, usable color names, which are special in their own way
const htmlColorNamesSpecial = ['currentColor', 'inherit', 'transparent'];

// * Validate HTML color name (red, yellow, etc)
export const validateHTMLColorName = (color) => {
  let status = false;
  if (isString(color)) {
    htmlColorNames.map((c) => {
      if (color.toLowerCase() === c.toLowerCase()) {
        status = true;
      }
      return null;
    });
  }
  return status;
};

// * Validate HTML color special name (currentColor, inherit, etc)
export const validateHTMLColorSpecialName = (color) => {
  let status = false;
  if (isString(color)) {
    htmlColorNamesSpecial.map((c) => {
      if (color.toLowerCase() === c.toLowerCase()) {
        status = true;
      }
      return null;
    });
  }
  return status;
};

// * Validate HTML color 'hex'
export const validateHTMLColorHex = (color) => {
  if (isString(color)) {
    const regex = /^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$/i;
    debugRegex && console.log('regex (hex)', regex);
    return color && regex.test(color);
  }
  return false;
};

const spaceNoneOrMore = `([\\s]{0,5})`;
const spaceOneOrMore = `([\\s]{1,5})`;
const digitNoneOrMore = `([\\d]{0,5})`;
const digitOneOrMore = `([\\d]{1,5})`;
const optionalCommaOrRequiredSpace = `((${spaceNoneOrMore},${spaceNoneOrMore})|(${spaceOneOrMore}))`;
const optionalDecimals = `((\\.${digitOneOrMore})?)`;
const anyNumber = `(${digitNoneOrMore}${optionalDecimals})`;

export const unsignedInteger = `\\d+`;
export const unsignedFloat = `\\d(\\.\\d+)?`;
export const signedFloat = `-?${unsignedFloat}`;
export const unsignedFloatWithinOneHundred = `(100(\\.0+)?|[1-9]?${unsignedFloat})`;
export const unsignedFloatWithinTwoHundredFiftyFive = `(255(\\.0+)?|[1-9]?${unsignedFloat})`;
export const unsignedIntegerWithinTwoHundredFiftyFive = `(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})`;
export const unsignedFloatWithinThreeHundredSixty = `(360(\\.0+)?|[1-9]?${unsignedFloat})`;
export const signedFloatWithinOneHundredTwentyFive = `(?:-?(?:\\d{1,2}(\\.\\d+)?|1[01]?\\d(\\.\\d+)?|120(\\.0+)?|125(\\.0+)?))`;
export const isSignedFloatWithinOneHundredSixty = `(?:-?(?:\\d{1,2}(\\.\\d+)?|1[0-5]?\\d(\\.\\d+)?|160(\\.0+)?))`;

const anyPercentage = `(${anyNumber}%)`;
const anyPercentageWithinHundred = `(${unsignedFloatWithinOneHundred}(%)?)`;
const hundredPercent = `(([0-9]|[1-9][0-9]|100)%)`;
const alphaPercentage = `(((${hundredPercent}))|(0?${optionalDecimals})|1))?`;
const alphaPercentageRequired = `(${hundredPercent}|(0?${optionalDecimals})|1)`;
const endingWithAlphaPercentage = `${spaceNoneOrMore}\\)?)(${spaceNoneOrMore}(\\/?)${spaceOneOrMore}${alphaPercentage}${spaceNoneOrMore}\\)`;
// const degRegex = `(-?${isAnyNumberWithinThreeHundredSixty}(deg)?)`;

export const isValidCSSColorHex = (value) => {
  if (isString(value)) {
    const regexLogic = `#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{8})`;
    const regex = new RegExp(`^${regexLogic}$`);
    debugRegex && console.log('regex (hex)', regex);
    return value && regex.test(value);
  }
  return false;
};

// /    const gap = `((${spaceNoneOrMore},?${spaceNoneOrMore})|(${spaceOneOrMore}))`;

// * Validate HTML color 'rgb'
// -- legacy notation
// color: rgb(255, 255, 255);
// color: rgba(255, 255, 255, 1);
// -- new notation
// color: rgb(255 255 255);
// color: rgb(255 255 255 / 1);
// Note that 'rgba()' is now merged into 'rgb()'
export const isValidCSSColorRgb = (value) => {
  if (isString(value)) {
    const regexLogic = `^((rgb)a?\\(${spaceNoneOrMore}${unsignedIntegerWithinTwoHundredFiftyFive}${spaceOneOrMore}${unsignedIntegerWithinTwoHundredFiftyFive}${spaceOneOrMore}${unsignedIntegerWithinTwoHundredFiftyFive}${endingWithAlphaPercentage}$`;
    const regex = new RegExp(`^${regexLogic}$`);
    debugRegex && console.log('regex (rgb)', regex);
    return value && regex.test(value);
  }
  return false;
};

// * Validate HTML color 'hsl'
// -- These units are valid for the first parameter
// 'deg': degrees | full circle = 360
// 'grad': gradians | full circle = 400
// 'radians': radians | full circle = 2π (approx. 6.28)
// 'turn': turns | full circle = 1
export const validateHTMLColorHsl = (color) => {
  if (isString(color)) {
    // Validate each possible unit value separately, as their values differ
    const gradRegex = `(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-9][0-9]|3[0-9][0-9]|400)grad)`;
    const radRegex = `((([0-5])?\\.${digitOneOrMore}|6\\.([0-9]|1[0-9]|2[0-8])|[0-6])rad)`;
    const turnRegex = `((0?${optionalDecimals}|1)turn)`;
    const regexLogic = `^(hsl)a?\\((${spaceNoneOrMore}(${degRegex}|${gradRegex}|${radRegex}|${turnRegex})${optionalCommaOrRequiredSpace})(${spaceNoneOrMore}(0|${hundredPercent})${optionalCommaOrRequiredSpace})(${spaceNoneOrMore}(0|${hundredPercent})${spaceNoneOrMore}\\)?)(${spaceNoneOrMore}(\\/?|,?)${spaceNoneOrMore}(((${hundredPercent}))|(0?${optionalDecimals})|1))?\\)$`;
    const regex = new RegExp(regexLogic);
    debugRegex && console.log('regex (hsl)', regex);
    return color && regex.test(color);
  }
  return false;
};

// * Validate HTML color 'hwb'
// -- 'hwb' accepts 'deg' as unit in its 1st property, which stands for 'hue'
// 'deg': degrees | full circle = 360
export const validateHTMLColorHwb = (color) => {
  if (isString(color)) {
    const regexLogic = `^(hwb\\(${spaceNoneOrMore}${degRegex}${spaceOneOrMore})((0|${hundredPercent})${spaceOneOrMore})((0|${hundredPercent})${endingWithAlphaPercentage}$`;
    const regex = new RegExp(regexLogic);
    debugRegex && console.log('regex (hwb)', regex);
    return color && regex.test(color);
  }
  return false;
};

// * Validate HTML color 'lab'
// -- 'lab' 2nd & 3rd parameters are any number between -125 & 125
export const isValidCSSColorLab = (str) => {
  if (isString(str)) {
    const regexLogic = `^(lab\\(${spaceNoneOrMore}${unsignedFloatWithinOneHundred}%${spaceOneOrMore}${signedFloatWithinOneHundredTwentyFive}${spaceOneOrMore}${signedFloatWithinOneHundredTwentyFive}${endingWithAlphaPercentage}$`;
    const regex = new RegExp(`^${regexLogic}$`);
    debugRegex && console.log('regex (lab)', regex);
    return str && regex.test(str);
  }
  return false;
};

// * Validate HTML color 'oklab'
// -- 'lab' 2nd & 3rd parameters are any number between -125 & 125
export const isValidCSSColorOkLab = (str) => {
  if (isString(str)) {
    const regexLogic = `^(oklab\\(${spaceNoneOrMore}${unsignedFloatWithinOneHundred}%${spaceOneOrMore}${signedFloatWithinOneHundredTwentyFive}${spaceOneOrMore}${signedFloatWithinOneHundredTwentyFive}${endingWithAlphaPercentage}$`;
    const regex = new RegExp(`^${regexLogic}$`);
    debugRegex && console.log('regex (lab)', regex);
    return str && regex.test(str);
  }
  return false;
};

// * Validate HTML color 'lwc'
// -- See https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lch
// -- See https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/
// -- lch(L C H [/ A])
// <lch()> =
//   lch(
//     [ <percentage> | <number> | none ]
//     [ <percentage> | <number> | none ]
//     [ <hue> | none ]
//     [ / [ <alpha-value> | none ] ]?
//   )
//
// <hue> = <number> | <angle>
// <alpha-value> = <number> | <percentage>
export const validateHTMLColorLch = (color) => {
  const debug = false;
  if (isString(color)) {
    const L = `${anyPercentageWithinHundred}`;
    const C = `${anyNumber}`;
    const H = `((${degRegex})|(0|${alphaPercentageRequired})|${isAnyNumberWithinThreeHundredSixty})`;
    const A = `(\\/${spaceNoneOrMore}${alphaPercentageRequired})`;
    const allProps = `(${spaceNoneOrMore}${L}${spaceOneOrMore}${C}${spaceOneOrMore}${H}${spaceNoneOrMore}(${A})?)`;
    const regexLogic = `^lch\\(${allProps}\\)$`;
    debug && console.log('[validateHTMLColorLch] L', L);
    debug && console.log('[validateHTMLColorLch] C', C);
    debug && console.log('[validateHTMLColorLch] H', H);
    debug && console.log('[validateHTMLColorLch] A', A);
    const regex = new RegExp(regexLogic);
    debugRegex && console.log('regex (lch)', regex);
    return color && regex.test(color);
  }
  return false;
};

// * Validate only HTML colors (`hex`, `rgb`, `rgba`, `hsl`, `hsla`, `hwb`, `lab`, `lch`), without `name` og `special name`**
export const validateHTMLColor = (color) => {
  if (
    (color && validateHTMLColorHex(color)) ||
    isValidCSSColorRgb(color) ||
    validateHTMLColorHsl(color) ||
    validateHTMLColorHwb(color) ||
    validateCSSColorLab(color) ||
    validateHTMLColorLch(color)
  ) {
    return true;
  }
  return false;
};

const validateColor = (color) => {
  // Former validation - source: https://www.regextester.com/103656
  // if (isString(color)) {
  //   const regex = /^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$|(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*,?\s*\)?)(,\s*(0?\.\d+)?|1|0)?\)$/i;
  //   return color && regex.test(color);
  // }
  // New validation
  if (
    (color && validateHTMLColorHex(color)) ||
    validateHTMLColorName(color) ||
    validateHTMLColorSpecialName(color) ||
    isValidCSSColorRgb(color) ||
    validateHTMLColorHsl(color) ||
    validateHTMLColorHwb(color) ||
    validateCSSColorLab(color) ||
    validateHTMLColorLch(color)
  ) {
    return true;
  }
  return false;
};

export default validateColor;
