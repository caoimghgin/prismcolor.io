/* eslint-disable no-multi-assign */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
/**
 * Parse a CSS function, regardless of its name and arguments
 * @param {string} str String to parse
 * @return {ParseFunctionReturn | void}
 */
export function parseFunction(str) {
  if (!str) {
    return;
  }

  str = str.trim();

  let parts = str.match(regex.function);

  if (parts) {
    // It is a function, parse args
    let args = [];
    let argMeta = [];
    let lastAlpha = false;

    let separators = parts[2].replace(regex.singleArgument, ($0, rawArg) => {
      let { value, meta } = parseArgument(rawArg);

      if ($0.startsWith('/')) {
        // It's alpha
        lastAlpha = true;
      }

      args.push(value);
      argMeta.push(meta);
      return '';
    });

    return {
      name: parts[1].toLowerCase(),
      args,
      argMeta,
      lastAlpha,
      commas: separators.includes(','),
      rawName: parts[1],
      rawArgs: parts[2],
    };
  }
}

/**
 * Parse a single function argument
 * @param {string} rawArg
 * @returns {{value: number, meta: ArgumentMeta}}
 */
export function parseArgument(rawArg) {
  /** @type {Partial<ArgumentMeta>} */
  let meta = {};
  let unit = rawArg.match(regex.unitValue)?.[0];
  /** @type {string | number} */
  let value = (meta.raw = rawArg);

  if (unit) {
    // It’s a dimension token
    meta.type = unit === '%' ? '<percentage>' : '<angle>';
    meta.unit = unit;
    meta.unitless = Number(value.slice(0, -unit.length)); // unitless number

    value = meta.unitless * units[unit];
  } else if (regex.number.test(value)) {
    // It's a number
    // Convert numerical args to numbers
    value = Number(value);
    meta.type = '<number>';
  } else if (value === 'none') {
    value = null;
  } else if (value === 'NaN' || value === 'calc(NaN)') {
    value = NaN;
    meta.type = '<number>';
  } else {
    meta.type = '<ident>';
  }

  return { value: /** @type {number} */ (value), meta: /** @type {ArgumentMeta} */ (meta) };
}

/**
 * Units and multiplication factors for the internally stored numbers
 */
export const units = {
  '%': 0.01,
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360,
};

export const regex = {
  // Need to list calc(NaN) explicitly as otherwise its ending paren would terminate the function call
  function: /^([a-z]+)\(((?:calc\(NaN\)|.)+?)\)$/i,
  number: /^([-+]?(?:[0-9]*\.)?[0-9]+(e[-+]?[0-9]+)?)$/i,
  unitValue: RegExp(`(${Object.keys(units).join('|')})$`),

  // NOTE The -+ are not just for prefix, but also for idents, and e+N notation!
  singleArgument: /\/?\s*(none|NaN|calc\(NaN\)|[-+\w.]+(?:%|deg|g?rad|turn)?)/g,
};
