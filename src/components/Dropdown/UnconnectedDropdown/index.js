import React from 'react';
import classNames from 'classnames';
import { list } from 'react-immutable-proptypes';

/**
 * What all other dropdowns boil down to -- a bunch of HTML with all functionality passed in
 *
 * @param {Object} props
 * @param {Array} props.items Array of objects representing a dropdown item
 * @param {string} props.items[].label String to show as dropdown option (req)
 * @param {string} props.items[].value String, object, or any other type representing the data to be stored if item selected
 * @param {Function} props.items[].action Action called on dropdown selection - defaults to closing dropdown and setting value
 * @param {string} props.items[].className String of optional additional class to apply to each item
 * @param {string} props.items[].isActive Bool representing whether the item is selected
 * @param {string} props.title Title to display before a value is selecteed
 * @param {Object[]} props.style Optional styles object
 * @param {boolean} props.open - Bool representing whether the dropdown is open
 * @param {string} props.className - Optional string of class to apply to Dropdown
 * @returns {React.Component} - A component representing a dropdown connected to the Redux store
 */
export function UnconnectedDropdown (props) {
  const { items, className, title, open, onTitleClick, style } = props;

  return (
    <div className={ classNames([open && 'is-open', className, 'dropdown']) } style={ style }>
      <div className="dropdown__toggle" onClick={ onTitleClick }>
        <span className="dropdown__title">{ title }</span>
        <span className="icon-arrow-down dropdown__icon" />
      </div>
      { open &&
        <div className="dropdown__menu">
          <ul className="list--block">
            {
              items.map((item, index) => (
                <li
                  className={ classNames([item.isActive && 'is-active', 'dropdown__item']) }
                  key={ index }
                  onClick={ () => item.action([{ index, value: item.value }]) }
                >
                  { item.label }
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  );
}

const { object, bool, string, arrayOf, shape, any, func, oneOfType } = React.PropTypes;

export const dropdownItemPropType = shape({
  label: string.isRequired,
  value: any,
  action: func,
  className: string,
  isActive: bool
});

UnconnectedDropdown.propTypes = {
  items: oneOfType([
    arrayOf(dropdownItemPropType),
    list
  ]).isRequired,
  title: string.isRequired,
  onTitleClick: func.isRequired,
  open: bool,
  className: string,
  style: object
};

export default UnconnectedDropdown;
