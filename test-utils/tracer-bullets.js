/* eslint-disable no-console */
// https://wiki.c2.com/?TracerBullets

import isValid from '../extensions/colorjs.io/isValid.js';

function main() {
  console.log('Hello, World!');
  console.log('IS transparent VALID?', isValid('transparent'));
  console.log('IS #0055 VALID?', isValid('#0055'));
}

main();
