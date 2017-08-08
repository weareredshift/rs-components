import React from 'react';
import { connect } from 'react-redux';
import { map } from 'react-immutable-proptypes';
import classnames from 'classnames';

import { setCheckboxValue } from './actions';

/**
 * Renders a Redux-connected Checkbox with label
 *
 * @param {string} uid - Unique string identifier of checkbox
 * @param {string} name - Label text to display
 * @param {function} dispatch - Redux dispatch function
 * @param {Immutable.Map} checkboxes - Redux checkboxes Map
 * @param {string[]} className - Optional additional classes
 *
 * @returns {React.Component} A checkbox with globally-tracked value
 */
export function CheckboxUC ({ uid, name, dispatch, checkboxes, className }) {
  const checked = checkboxes.get(uid);
  return (
    <label className={ classnames('checkbox rscomp', className) } htmlFor={ uid }>
      <input
        className="checkable__input"
        type="checkbox"
        onChange={ () => {
          dispatch(setCheckboxValue(uid, !checked));
        } }
        name={ name }
        checked={ checked }
      />
      <span className="checkable__mark" />
      <span className="checkable__label">{ name }</span>
    </label>
  );
}

const mapStateToProps = state => ({
  checkboxes: state.checkboxes
});

const { string, func } = React.PropTypes;
CheckboxUC.propTypes = {
  uid: string.isRequired,
  name: string.isRequired,
  checkboxes: map.isRequired,
  dispatch: func,
  className: string
};

export default connect(mapStateToProps)(CheckboxUC);
