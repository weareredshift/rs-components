import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { setRadioValue } from './actions';

/**
 * Renders a group of redux-connected radio buttons
 *
 * @param {Object} props
 * @param {string} props.groupID Unique identifier of this radio group in Redux
 * @param {string} props.className Optional additional classes
 * @param {Object[]} props.items List of radio item object
 * @param {String} props.selectedValue String of selected value
 * @param {Function} props.onCheck Run when a radio button is clicked, and passed the groupID and item
 *
 * @returns {React.Component} A group of radio buttons
 */
export function RadioGroupUC ({ groupID, className, items, selectedValue, onCheck }) {
  const fullItems = items.map((item, index) => {
    let fullItem;

    if (typeof item === 'string') {
      fullItem = {
        label: item,
        value: item,
        index
      };
    } else {
      fullItem = Object.assign({}, item, { index });
    }
    return fullItem;
  });

  return (
    <ul className={ classnames('radio rscomp', className) }>
      {
        fullItems.map(item => {
          const selected = selectedValue === item.value;
          return (
            <li
              className={ classnames('radio__li', selected && 'radio__li--selected') }
              key={ item.index }
              onClick={ () => { onCheck(item); } }
            >
              <label className="radio__label" htmlFor={ item.value }>
                <input
                  className="radio__input"
                  type="radio"
                  checked={ selectedValue === item.value }
                  onChange={ () => {} }
                  id={ groupID }
                  name={ groupID }
                  value={ item.value }
                />
                <span className="radio__mark" />
                <span className="radio__text">{ item.label }</span>
              </label>
              { item.tag && <span className="radio__tag">{ item.tag }</span> }
            </li>
          );
        })
      }
    </ul>
  );
}

const { arrayOf, string, func, oneOfType, shape } = React.PropTypes;
RadioGroupUC.propTypes = {
  items: arrayOf(
    oneOfType([
      shape({
        label: string,
        value: string.isRequired,
        tag: string
      }),
      string
    ]).isRequired
  ).isRequired,
  groupID: string.isRequired,
  className: string,
  selectedValue: string,
  onCheck: func.isRequired
};

const mapStateToProps = (state, { groupID }) => ({
  selectedValue: state.radios.getIn([groupID, 'value'])
});

const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...stateProps,
  ...ownProps,
  onCheck: item => {
    dispatch(setRadioValue(ownProps.groupID, item));
    ownProps.afterCheck && ownProps.afterCheck(ownProps.groupID, item);
  }
});

export default connect(mapStateToProps, undefined, mergeProps)(RadioGroupUC);
