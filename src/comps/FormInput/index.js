import React from 'react';
import { kebabCase, capitalize } from 'lodash';

/**
 * Converts a string key with dash or underscore separators into title case.
 * @param {string} key - A string to be converted.
 * @returns {string} A PascalCased string.
 */
function formatKey (key) {
  const titleize = list => list.map((w, i) => i === 0 ? capitalize(w) : w).join(' ');
  if (key.includes('-')) {
    return titleize(key.split('-'));
  } else if (key.includes('_')) {
    return titleize(key.split('_'));
  } else {
    return titleize(kebabCase(key).split('-'));
  }
}

/**
 * Generates a text/password input connected to parent's state object
 *
 * @param      {Object}    props
 * @param      {Function}  props.setParentState  Callback on input change
 * @param      {Object}    props.parentState     Parent state object
 * @param      {string}    props.type            Input type
 * @param      {string}    props.label           Label text for input
 * @param      {Function}  props.validator       Function to validate input
 * @param      {boolean}    props.reportErrorImmediately Whether to show error realtime as user types
 * @param {string} props.stateKey Key of this input's value in parent state
 * @param {string} props.labelType How the label should appear - as label,
 * placeholder, or both
 */
export function FormInput ({ setParentState, parentState, type, label, stateKey, validator, labelType, reportErrorImmediately }) {
  const finalLabel = label || formatKey(stateKey);
  const error = parentState.formErrors && parentState.formErrors[stateKey];
  const inputParams = {
    type,
    value: parentState[stateKey],
    onChange: e => {
      const val = e.target.value;

      const validationMessage = val ? validator(val, label || formatKey(stateKey), parentState) : null;
      const changes = { [stateKey]: val };

      // Don't report error unless set to report realtime or action is clearing preexisting error
      if (reportErrorImmediately || (!validationMessage && error)) {
        changes.formErrors = Object.assign({}, (parentState.formErrors || {}), { [stateKey]: validationMessage });
      }

      setParentState(changes);
    }
  };

  if (['placeholder', 'both'].includes(labelType)) {
    inputParams.placeholder = finalLabel;
  }

  const input = React.createElement(
    type === 'textarea' ? 'textarea' : 'input',
    Object.assign({
      placeholder: finalLabel,
      className: 'form__input'.concat(error ? ' has-error' : '')
    }, inputParams)
  );

  return (
    <label className={ `form__label form_input__${stateKey}` }>
      { ['label', 'both'].includes(labelType) && <span className="label">{ finalLabel }</span> }
      { input }
    </label>
  );
}

const { func, object, string, oneOf, bool } = React.PropTypes;
FormInput.propTypes = {
  setParentState: func.isRequired,
  parentState: object.isRequired,
  type: string,
  label: string,
  stateKey: string.isRequired,
  labelType: oneOf(['placeholder', 'label', 'both']),
  validator: func,
  reportErrorImmediately: bool
};

FormInput.defaultProps = {
  type: 'text',
  labelType: 'placeholder',
  validator: () => null,
  reportErrorImmediately: false
};

export default FormInput;
