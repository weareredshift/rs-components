import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { setOpenDropdownID, setDropdownValues } from './actions';

/**
 * A basic dropdown. With the callbacks (onTitleClick and onItemClick) unspecified, will behave sensibly, allowing
 * a single item to be selected at a time, and storing that information in the Redux store.
 * Custom behavior can be tweaked through those components.
 * This dropdown also allows for simple or complex (object) items.
 *
 * @param {Object} props
 * @param {Array} props.items Array of objects or strings representing a dropdown item
 * @param {string} props.items[].label String to show as dropdown option (req)
 * @param {string} props.items[].value String, object, or any other type representing the data to be stored if item selected
 * @param {string[]} props.items[].className Optional additional class to apply to each item
 * @param {string} props.title Title to display before a value is selected (or after, if replaceTitle is false)
 * @param {boolean} props.replaceTitle Whether to replace the title with the current selection
 * @param {boolean} props.multipleSelect Where more than one item can be selected at once
 * @param {Object[]} props.style Optional styles object
 * @param {boolean} props.open - Whether the dropdown is open
 * @param {string} props.className - Optional string of class to apply to Dropdown
 *
 * @returns {React.Component} - A component representing a dropdown connected to the Redux store
 */
export function DropdownUC (props) {
  const { items, className, title, open, onTitleClick, style, selectedIndices, onItemClick, replaceTitle, multipleSelect } = props;

  const finalItems = typeof items[0] === 'string'
    ? items.map(item => ({ value: item, label: item }))
    : items;

  const titleIndex = selectedIndices[0];

  const finalTitle = selectedIndices.length === 1 && replaceTitle && !multipleSelect
    ? finalItems[titleIndex].label
    : title;

  return (
    <div
      className={ classnames([open && 'dropdown--open', className, 'dropdown rscomp', multipleSelect && 'dropdown--multi']) }
      style={ style }
    >
      <div className="dropdown__toggle" onClick={ onTitleClick }>
        <span className="dropdown__title">{ finalTitle }</span>
        <span className="dropdown__icon" />
      </div>
      <div className="dropdown__menu">
        <ul>
          {
            finalItems.map((item, index) => (
              <li
                className={ classnames(['dropdown__item', selectedIndices.includes(index) && 'dropdown__item--active', item.className]) }
                key={ index }
                onClick={ () => onItemClick({ index, value: item.value || item.label }) }
              >
                { item.label || item.value }
              </li>
            ))
          }
        </ul>
      </div>
      <select className="dropdown__phantom-menu" value={ selectedIndices[0] }>
        <option value="" disabled={ true }>{ finalTitle }</option>
        {
          finalItems.map((item, index) => (
            <option value={ item.value } key={ index }>
              { item.value }
            </option>
          ))
        }
      </select>
    </div>
  );
}

const { object, bool, string, arrayOf, shape, any, func, number, oneOfType } = PropTypes;

DropdownUC.propTypes = {
  items: oneOfType([
    arrayOf(shape({
      label: string,
      value: any,
      className: string
    })),
    arrayOf(string)
  ]).isRequired,
  title: string.isRequired,
  onTitleClick: func.isRequired,
  onItemClick: func.isRequired,
  selectedIndices: arrayOf(number).isRequired,
  replaceTitle: bool,
  open: bool,
  className: string,
  style: object,
  multipleSelect: bool
};

DropdownUC.defaultProps = {
  replaceTitle: true,
  open: false,
  title: 'Select One'
};

const mapStateToProps = (state, ownProps) => {
  const { uid } = ownProps;
  const open = state.openDropdownID === uid;

  const element = state.dropdowns.get(uid) ? state.dropdowns.get(uid).toJS() : [];

  return {
    open,
    element,
    selectedIndices: element.map(obj => obj.index)
  };
};

const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...stateProps,
  ...ownProps,
  element: undefined,
  onItemClick: (item) => {
    let toDispatch = [item];

    // If it's a multiple-select dropdown, add item if not in list
    // and remove from list if it's there.
    if (ownProps.multipleSelect) {
      const previousSelections = stateProps.element;
      const preexisting = previousSelections.find(obj => obj.index === item.index);

      toDispatch = preexisting
        ? [...previousSelections, item].filter(i => i.index !== item.index)
        : previousSelections.concat(item);
    }

    dispatch(setDropdownValues(ownProps.uid, toDispatch));

    // Close dropdown unless it's multiple-select
    !ownProps.multipleSelect && dispatch(setOpenDropdownID(null));
  },
  onTitleClick: () => dispatch(setOpenDropdownID(stateProps.open ? null : ownProps.uid))
});

export default connect(mapStateToProps, undefined, mergeProps)(DropdownUC);
