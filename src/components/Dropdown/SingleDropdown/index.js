import React from 'react';
import { connect } from 'react-redux';
import { list } from 'react-immutable-proptypes';

import { setOpenDropdownID, setDropdownValues } from 'store/actions';

import Dropdown from '../index.js';

/**
 * A basic dropdown, which replaces its title with the selected value and stores
 * that value object in global state. The most common dropdown style, useful for cases where you
 * just want to represent the user's selection and have access to the choice in global state.
 *
 * @param {Object} props
 * @param {string[]} props.items - Array of strings representing dropdown choices
 * @param {string} props.dropID - Unique string identifying this dropdown in the Redux store
 * @param {function} props.dispatch - Redux dispatch function
 * @param {string} props.className - Optional className to add to dropdown
 * @param {Object[]} props.style -   Optional style object
 * @param {string} props.title - Optional title to display if nothing selected. Defaults to first item.
 * @returns {React.Component} - A simple dropdown which replaces the title with the choice and stores it in state
 */
export function SingleDropdown ({ items, dropID, dispatch, className, title, style }) {
  return (
    <Dropdown
      className={ className }
      dropID={ dropID }
      replaceTitle={ true }
      title={ title }
      style={ style }
      items={
        items.map(item => Object.assign(item, {
          action: (values) => {
            dispatch(setOpenDropdownID(null));
            dispatch(setDropdownValues(dropID, values));
          },
          label: item,
          value: item
        }))
      }
    />
  );
}

const { arrayOf, string, func, oneOfType, object } = React.PropTypes;
SingleDropdown.propTypes = {
  items: oneOfType([
    arrayOf(string),
    list
  ]).isRequired,
  dropID: string.isRequired,
  dispatch: func,
  className: string,
  title: string,
  style: object
};

export default connect()(SingleDropdown);
