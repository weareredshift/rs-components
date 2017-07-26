import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { list } from 'react-immutable-proptypes';

import { setOpenDropdownID, setDropdownValues } from 'store/actions';
import UnconnectedDropdown, { dropdownItemPropType } from './UnconnectedDropdown';
import './Dropdown.scss';

/**
 * A fully functional dropdown component, capable of many types of behavior -- mutliple selected items, replacing or not replacing
 * the title with selected content, storing string or object values in the store, etc. This component computes the correct settings to pass
 * to the UnconnectedDropdown it renders, which is a "dumb" component, not directly connected to the store.
 *
 * @param {Object} props
 * @param {string} props.dropID Unique itentifying string for this dropdown - controls where in state its info is stored
 * @param {Array} props.items Array of objects representing a dropdown item
 * @param {string} props.items[].label String to show as dropdown option (req)
 * @param {string} props.items[].value String, object, or any other type representing the data to be stored if item selected
 * @param {Function} props.items[].action Action called on dropdown selection - defaults to closing dropdown and setting value
 * @param {string} props.items[].className String of optional additional class to apply to each item
 * @param {string} props.items[].isActive Bool representing whether the item is selected
 * @param {string} props.title Title to display before a value is selecteed
 * @param {Object[]} props.dropdowns Redux Map of dropdown values stored by dropID
 * @param {boolean} props.replaceTitle Bool representing whether selecting a value should replace the Dropdown title
 * @param {Function} props.dispatch
 * @param {string} props.className - Optional string of class to apply to Dropdown
 * @param {string} props.openDropdownID - Redux-stored unique string ID of the only dropdown (if any) open in app
 * @returns {React.Component} - A component representing a dropdown connected to the Redux store
 */
export function Dropdown (props) {
  const { dropID,
          items,
          title,
          dropdowns,
          replaceTitle,
          dispatch,
          className,
          openDropdownID } = props;

  const element = dropdowns.get(dropID);

  const selectedIndexes = element ? element.map(obj => obj.get('index')) : [];

  const open = openDropdownID === dropID;

  const listItems = items.map((item, index) => Object.assign({
    isActive: selectedIndexes.indexOf(index) !== -1,
    action: () => {
      dispatch(setDropdownValues(
        dropID,
        [Object.assign(item, { index })])
      );
      dispatch(setOpenDropdownID(null));
    }
  }, item));

  const titleIndex = selectedIndexes.size && selectedIndexes.get(0);

  const dropdownTitle = selectedIndexes.size === 1 && replaceTitle
          ? (listItems instanceof List
             ? listItems.get(titleIndex).label
             : listItems[titleIndex].label)
          : title;

  const onTitleClick = () => dispatch(setOpenDropdownID(open ? null : dropID));

  const finalProps = Object.assign({}, props, {
    items: listItems,
    title: dropdownTitle,
    open,
    onTitleClick,
    className
  });

  return (<UnconnectedDropdown { ...finalProps } />);
}

const { bool, string, arrayOf, func, object, oneOfType } = React.PropTypes;
Dropdown.propTypes = {
  items: oneOfType([
    arrayOf(dropdownItemPropType),
    list
  ]).isRequired,
  dropID: string.isRequired,

  dropdowns: object.isRequired,
  dispatch: func.isRequired,
  openDropdownID: string,

  replaceTitle: bool,
  title: string,
  className: string
};

Dropdown.defaultProps = {
  title: 'Select One',
  replaceTitle: true
};

const mapStateToProps = state => ({
  dropdowns: state.dropdowns,
  openDropdownID: state.openDropdownID
});

export default connect(mapStateToProps)(Dropdown);
