import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setOpenDropdownID, setDropdownValues } from 'store/actions';
import './Dropdown.scss';

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
export function Dropdown (props) {
  const { items, className, title, open, onTitleClick, style, selectedIndices, onItemClick, replaceTitle, multipleSelect } = props;

  const finalItems = typeof items[0] === 'string'
    ? items.map(item => ({ value: item, label: item }))
    : items;

  const titleIndex = selectedIndices[0];

  const finalTitle = selectedIndices.length === 1 && replaceTitle && !multipleSelect
    ? finalItems[titleIndex].label
    : title;

  return (
    <div className={ classNames([open && 'is-open', className, 'dropdown rs-comp']) } style={ style }>
      <div className="dropdown__toggle" onClick={ onTitleClick }>
        <span className="dropdown__title">{ finalTitle }</span>
        <span className="icon-arrow-down dropdown__icon" />
      </div>
      { open &&
        <div className="dropdown__menu">
          <ul className="list--block">
            {
              finalItems.map((item, index) => (
                <li
                  className={ classNames([selectedIndices.includes(index) && 'is-active', 'dropdown__item', item.className]) }
                  key={ index }
                  onClick={ () => onItemClick({ index, value: item.value || item.label }) }
                >
                  { item.label || item.value }
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  );
}

const { object, bool, string, arrayOf, shape, any, func, number, oneOfType } = PropTypes;

Dropdown.propTypes = {
  items: oneOfType([
    arrayOf(shape({
      label: string,
      value: any,
      className: string
    })),
    arrayOf(string)
  ]).isRequired,
  dropID: string.isRequired,
  title: string.isRequired,
  onTitleClick: func.isRequired,
  onItemClick: func.isRequired,
  selectedIndices: arrayOf(number).isRequired,
  replaceTitle: bool.isRequired,
  open: bool.isRequired,
  className: string,
  style: object,
  multipleSelect: bool
};

Dropdown.defaultProps = {
  replaceTitle: true,
  open: false,
  title: 'Select One',
  multipleSelect: false
};

const mapStateToProps = (state, ownProps) => {
  const { dropID } = ownProps;
  const open = state.openDropdownID === dropID;
  const element = state.dropdowns.get(dropID) ? state.dropdowns.get(dropID).toJS() : [];

  return {
    open,
    element,
    selectedIndices: element.map(obj => obj.index)
  };
};

const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...stateProps,
  ...ownProps,
  onItemClick: (item) => {
    let toDispatch = [item];

    if (ownProps.multipleSelect) {
      const previousSelections = stateProps.element;
      const preexisting = previousSelections.find(obj => obj.index === item.index);

      toDispatch = preexisting
        ? [...previousSelections, item].filter(i => i.index !== item.index)
        : previousSelections.concat(item);
    }

    dispatch(setDropdownValues(ownProps.dropID, toDispatch));
    dispatch(setOpenDropdownID(null));
  },
  onTitleClick: () => dispatch(setOpenDropdownID(stateProps.open ? null : ownProps.dropID))
});

export default connect(mapStateToProps, undefined, mergeProps)(Dropdown);
