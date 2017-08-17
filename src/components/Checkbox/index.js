import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { setCheckboxValue } from './actions';

/**
 * Renders a Redux-connected Checkbox with label
 *
 * @param {Object} props
 * @param {string} props.uid - Unique string identifier of checkbox
 * @param {string} props.name - Label text to display
 * @param {boolean} props.checked - Whether the box is checked
 * @param {function} props.toggle - Toggles the checkbox
 *
 * @param {string[]} props.className - Optional additional classes
 *
 * @returns {React.Component} A checkbox with globally-tracked value
 */
export function CheckboxUC ({ name, toggle, checked, className, uid }) {
  return (
    <label className={ classnames('checkbox rscomp', className) } htmlFor={ uid }>
      <input
        className="checkable__input"
        type="checkbox"
        onChange={ () => { toggle(!checked); } }
        name={ name }
        checked={ checked }
      />
      <span className="checkable__mark" />
      <span className="checkable__label">{ name }</span>
    </label>
  );
}

const mapStateToProps = (state, ownProps) => ({
  checked: state.checkboxes.get(ownProps.uid)
});

const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...ownProps,
  ...stateProps,
  toggle: () => { dispatch(setCheckboxValue(ownProps.uid, !stateProps.checked)); }
});

const { string, func, bool } = PropTypes;
CheckboxUC.propTypes = {
  uid: string.isRequired,
  name: string.isRequired,
  className: string,
  toggle: func.isRequired,
  checked: bool
};

export default connect(mapStateToProps, undefined, mergeProps)(CheckboxUC);
