import isValid from './extensions/colorjs.io/isValid.js';

function main() {
  console.log('Hello, World!');
  console.log(isValid('transparent'));
  console.log('IS VALID?', isValid('#0055'));
}

main();
