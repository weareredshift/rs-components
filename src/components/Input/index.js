import React from 'react';
import classnames from 'classnames';
import { func, object, string, oneOf, bool } from 'prop-types';
import { formatKey } from '../BaseForm/utils';

/**
 * Generates a text/password input connected to parent's state object
 *
 * @param      {Object}    props                         React props
 * @param      {Function}  props.setParentState          Callback on input change
 * @param      {Object}    props.parentState             Parent state object
 * @param      {string}    props.type                    Input type
 * @param      {string}    props.label                   Label text for input
 * @param      {Function}  props.validator               Function to validate input
 * @param      {boolean}   props.reportErrorImmediately  Whether to show error realtime as user types
 * @param      {string}    props.stateKey                Key of this input's value in parent state
 * @param      {string}    props.labelType               How the label should appear - as label,
 * placeholder, or both
 * @param      {string[]}  props.className               Optional class to add
 *
 * @returns {React.Component} An input or textarea tag, with validations and state connection
 */
export function InputUC ({ setParentState, parentState, type, label, stateKey, validator, labelType, reportErrorImmediately, className }) {
  const finalLabel = label || formatKey(stateKey);
  const error = parentState.formErrors && parentState.formErrors[stateKey];
  const value = parentState[stateKey];

  const inputParams = {
    type,
    value,

    // Validate and set changes. If reporteErrorImmediately is set, do so,
    // and if an error has been fixed, immediately clear it.
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
      className: classnames('form__input', `form__input--${stateKey}`, error && 'form__input--error', className)
    }, inputParams)
  );

  return (
    <label className="form__label">
      { ['label', 'both'].includes(labelType) && <span className="label">{ finalLabel }</span> }
      { input }
    </label>
  );
}

InputUC.propTypes = {
  setParentState: func.isRequired,
  parentState: object.isRequired,
  type: string,
  label: string,
  stateKey: string.isRequired,
  labelType: oneOf(['placeholder', 'label', 'both']),
  validator: func,
  reportErrorImmediately: bool,
  className: string
};

InputUC.defaultProps = {
  type: 'text',
  labelType: 'placeholder',
  validator: () => null,
  reportErrorImmediately: false
};

export default InputUC;
