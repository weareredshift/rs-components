import { capitalize, kebabCase } from 'lodash';

const websiteRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
const prettify = string => string.split(' ').map(s => capitalize(s)).join(' ');

/**
 * @namespace validators
 * @exports validators
 * Validators for form fields. Each validator function takes custom params
 * and returns a function which takes text, label, and full state object params,
 * which are handed to the function by the BaseForm component to complete validation.
 * Valid fields return null. Invalid fields return an error message.
 *
 * @type       {Object}
 */
export const validators = {

  /**
   * @memberof validators
   *
   * @return     {Function} Rejects inputs unless they match a basic email regex
   */
  email: () => (text, label = 'email') => {
    const valid = emailRegex.test(text);
    return valid ? null : `That ${label.toLowerCase()} doesn't look right.`;
  },

  /**
   * @memberof validators
   *
   * @param      {number} length Minimum allowable length of characters
   * @return     {Function} Rejects inputs unless they are greater than or equal to the given length
   */
  length: (length = 5) => (text, label = 'Value') => {
    const valid = (typeof text === 'string') && text.length >= length;
    return valid ? null : `${prettify(label)} must be ${length} or more characters.`;
  },

  /**
   * @memberof validators
   *
   * @return     {Function} Rejects empty inputs
   */
  presence: () => (text, label) => text
    ? null
    : (label ? `${prettify(label)} is required.` : 'Missing required fields.'),

  /**
   * @memberof validators
   *
   * @param      {string}   fieldKey The name of the field whose value to compare
   * @param      {[string]} fieldLabel The optional presentable name of that field
   *
   * @return     {Function} Rejects inputs unless they exactly match the contents of the specified field
   */
  equalsField: (fieldKey, fieldLabel = fieldKey) =>
    (text, textLabel, state) => text === state[fieldKey]
      ? null
      : `${prettify(textLabel)} must equal ${prettify(fieldLabel)}.`,

  /**
   * @memberof validators
   *
   * @param      {string}   fieldKey The name of the field whose value to compare
   * @param      {[string]} fieldLabel The optional presentable name of that field
   * @param      {[string]} customMessage Optional custom message to display on error
   * @return     {Function} Rejects inputs unless they are different from the contents of the specified field
   */
  differsFromField: (fieldKey, fieldLabel = fieldKey, customMessage) =>
    (text, textLabel, state) => text === state[fieldKey]
      ? customMessage || `${prettify(textLabel)} must be different from ${prettify(fieldLabel)}.`
      : null,

  /**
   * @memberof validators
   *
   * @param      {Function[]} arrayOfValidators List of validator functions to be applied to field
   *
   * @return     {Function} Rejects inputs unless all validators return null
   */
  multiple: (arrayOfValidators) =>
    (text, label, state) =>
      arrayOfValidators.map(v => v(text, label, state)).find(v => v) || null,

  /**
   * @memberof validators
   *
   * @return     {Function} Rejects input text unless it looks like a phone number
   */
  phone: () => text => phoneRegex.test(text)
    ? null
    : 'Please enter a complete 10-digit phone number, with area code.',

  /**
   * @memberof validators
   *
   * @return     {Function} Rejects input text unless it looks like a website
   */
  website: () => text => websiteRegex.test(text)
    ? null
    : 'Please enter a valid website URL.'
};

/**
 * Converts a string key with dash or underscore separators into title case.
 * @param {string} key - A string to be converted.
 * @returns {string} A PascalCased string.
 */
export function formatKey (key) {
  const titleize = list => list.map((w, i) => i === 0 ? capitalize(w) : w).join(' ');
  if (key.includes('-')) {
    return titleize(key.split('-'));
  } else if (key.includes('_')) {
    return titleize(key.split('_'));
  } else {
    return titleize(kebabCase(key).split('-'));
  }
}

