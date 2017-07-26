import { capitalize } from 'lodash';

/**
 * Turns this 'hello_world' into 'Hello World'
 *
 * @param      {string}  underscored  The underscored string
 * @return     {string}  String of capitalized words
 */
export function labelifyUnderscored (underscored) {
  return underscored.split('_').map(w => capitalize(w)).join(' ');
}

/**
 * Unescapes HTML characters (eg &nbsp;)
 *
 * @param      {string}  input   Input text
 * @return     {string}  Unescaped text
 */
export function htmlDecode (input) {
  const e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
}
