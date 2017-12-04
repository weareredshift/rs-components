/* eslint no-negated-condition:0 */
import React from 'react';
import classnames from 'classnames';
import { flatten } from 'lodash';
import { Link } from 'react-router';
import { string, func, arrayOf, array, shape, object, bool, oneOfType, element } from 'prop-types';

import Input from '../Input';

import { formatKey } from './utils';

/**
 * Basic form from array of field rows
 *
 * @extends React.Component
 * @param  {Object}   props                               React props object
 * @param  {Array}    props.fields                        Array of field rows
 * @param  {Array}    props.fields[0]                     Array of fields to be shown in one row
 * @param  {Object}   props.fields[0][0]                  Object representing a form input field
 * @param  {string}   props.fields[0][0].label            Label for a field
 * @param  {string}   props.fields[0][0].type             Type of the field (default: 'text')
 * @param  {string}   props.fields[0][0].stateKey         How the field should be stored in form state
 * @param  {string}   props.fields[0][0].startingValue    The initial value in the field
 * @param  {Function} props.onSubmit                      Called when the submit button is hit
 * @param  {string}   props.note                          Optional note to display above fields
 * @param  {Object[]} props.style                         Optional style object
 * @param  {string}   props.submitButton                  Text for submit button (default: 'Submit') or replacement element
 * @param  {string}   props.globalError                   Error text to display if no field-specific error takes precedence
 * @param {Object[]}  props.actions[]                     Array of actions that appear at the bottom of the form, underneath the submit button
 * @param {string}    props.actions[].label               String to display as action label
 * @param {Function}  props.actions[].action              Function to run onClick of action text
 */
export class BaseFormUC extends React.Component {
  constructor (props) {
    super(props);
    this.state = this.initialState(props.fields);
  }

  componentWillReceiveProps (newProps) {
    // Clear form if told to from outside component
    if (newProps.clearForm && !this.props.clearForm) {
      this.state = this.initialState(this.props.fields);
    } else if (newProps.globalError !== this.props.globalError) {
      this.setState({ globalError: newProps.globalError });
    } else {
      const newFieldState = {};

      // Update empty starting values with incoming field props
      flatten(newProps.fields).forEach(field => {
        const value = this.state[field.stateKey];

        if (!(value && value.length > 0)) {
          newFieldState[field.stateKey] = field.startingValue || '';
        }
      });

      this.setState(newFieldState);
    }
  }

  initialState (passedFields) {
    const fields = passedFields || this.props.fields;
    const formErrors = {};

    const state = fields.reduce((obj, fieldRow) => {
      fieldRow.forEach(field => {
        formErrors[field.stateKey] = null;
        obj[field.stateKey] = field.startingValue || '';
      });
      return obj;
    }, {});

    state.formErrors = formErrors;
    state.globalError = this.props.globalError;
    return state;
  }

  handleKeyPress (e) {
    if (e.charCode === 13) { // Enter
      this.handleSubmit(e);
    }
  }

  handleSubmit (e) {
    e && e.preventDefault && e.preventDefault();

    const fields = flatten(this.props.fields);

    const invalidFields = fields
      .reduce((obj, field) => {
        const validator = field.validator || (() => null);
        const errorMessage = validator(this.state[field.stateKey], field.label || formatKey(field.stateKey), this.state);

        if (errorMessage) {
          obj[field.stateKey] = errorMessage;
        }
        return obj;
      }, {});

    if (Object.keys(invalidFields).length > 0) {
      this.setState({
        formErrors: Object.assign({}, this.state.formErrors, invalidFields)
      });
    } else {
      // Submit values, and pass up a function for creating a form-wide error from results
      this.props.onSubmit(this.state, globalError => { this.setState({ globalError }); });
    }
  }

  render () {
    const { fields, submitButton, title, className, actions, note, style } = this.props;
    const { formErrors, globalError } = this.state;

    const firstErrorKey = Object.keys(formErrors).find(k => formErrors[k]);

    const error = [undefined, null, -1].includes(firstErrorKey)
      ? globalError
      : formErrors[firstErrorKey];

    const stateInputParams = {
      setParentState: this.setState.bind(this),
      parentState: this.state
    };

    return (
      <form
        className={ classnames([title && 'form--hastitle', 'form', 'rscomp', className]) }
        onKeyPress={ (e) => this.handleKeyPress(e) }
        style={ style }
      >
        { title && <h2 className="form__title">{ title }</h2>}
        <div className="form__fields">
          { error && <p className="form__error">{ error }</p> }
          { note && <p className="form__note">{ note }</p> }
          {
            fields.map((fieldRow, rowIndex) => (
              <div className={ `form__fieldrow form__fieldrow--${rowIndex}` } key={ rowIndex }>
                {
                  fieldRow.map((field, index) => (
                    <Input key={ index } { ...stateInputParams } { ...field } />
                  ))
                }
              </div>
            ))
          }
        </div>

        { typeof submitButton === 'string'
            ? <button
              className="form__submit"
              onClick={ (e) => { this.handleSubmit(e); } }
            >{ submitButton }</button>
            : React.cloneElement(submitButton, { onClick: () => { this.handleSubmit(); } })
        }

        { actions &&
          <ul className="form__actions">
            {
              actions.map((item, index) => {
                const classes = 'form__action';
                if (item.action && item.action instanceof Function) {
                  return (
                    <li
                      key={ index }
                      className={ classes }
                      onClick={ () => item.action(this.state) }
                    >
                      { item.label }
                    </li>
                  );
                } else if (item.link) {
                  return (
                    <Link
                      to={ item.link }
                      className={ classes }
                    >
                      { item.label }
                    </Link>
                  );
                } else {
                  /* eslint-disable no-console */
                  console.error(`Improper action passed to BaseForm: ${JSON.stringify(item)}`);
                  /* eslint-enable no-console */
                  return null;
                }
              })
            }
          </ul>
        }
      </form>
    );
  }
}

BaseFormUC.propTypes = {
  fields: arrayOf(
    arrayOf(shape({
      type: string,
      label: string,
      stateKey: string.isRequired,
      startingValue: string,
      className: string
    })),
  ).isRequired,
  onSubmit: func.isRequired,
  submitButton: oneOfType([string, element]),
  globalError: string,
  className: string,
  title: string,
  actions: array,
  note: string,
  style: object,
  clearForm: bool
};

BaseFormUC.defaultProps = {
  submitButton: 'Submit',
  onSubmit: (attrs) => {
    /* eslint-disable no-console */
    console.error('BaseForm submitted, but no submission function given! Attrs:');
    console.error(attrs);
    /* eslint-disable no-console */
  }
};

export default BaseFormUC;
