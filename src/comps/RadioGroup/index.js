import React from 'react';
import { connect } from 'react-redux';
import { map } from 'react-immutable-proptypes';
import classNames from 'classnames';

import { setRadioValue } from 'store/actions';
import './RadioGroup.scss';

/**
 *
 *
 * @param {Object} props
 * @param {string} props.groupID Unique identifier of this radio group in Redux
 * @param {string} props.className Optional additional classes
 * @param {Object[]} props.items List of radio item object
 * @param {Array} props.radios Redux representation of radio button values
 * @param {Function} props.afterCheck Callback run after the radio button value is selected in Redux
 * @param {function} props.dispatch
 * @returns {React.Component} A group of radio buttons
 */
export function RadioGroup ({ groupID, className, items, radios, dispatch, afterCheck }) {
  const selectedValue = radios.getIn([groupID, 'value']);

  const onCheck = (item) => {
    dispatch(setRadioValue(groupID, item));
    afterCheck && afterCheck(item);
  };

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
    <ul className={ classNames('checkable__group list--block', className) }>
      {
        fullItems.map(item => (
          <li key={ item.index } onClick={ () => { onCheck(item); } }>
            <label className="checkable" htmlFor={ item.value }>
              <input
                className="checkable__input"
                type="radio"
                checked={ selectedValue === item.value }
                onChange={ () => {} }
                id={ groupID }
                name={ groupID }
                value={ item.value }
              />
              <span className="checkable__mark" />
              <span className="checkable__label">{ item.label }</span>
            </label>
            { item.tag && <span className="checkable__tag typ--dark-grey">{ item.tag }</span> }
          </li>
        ))
      }
    </ul>
  );
}

const { arrayOf, string, func, oneOfType, shape } = React.PropTypes;
RadioGroup.propTypes = {
  items: arrayOf(
    oneOfType([
      shape({
        label: string,
        value: string.isRequired
      }),
      string
    ]).isRequired
  ).isRequired,
  groupID: string.isRequired,
  className: string,
  radios: map.isRequired,
  dispatch: func,
  afterCheck: func
};

const mapStateToProps = state => ({
  radios: state.radios
});

export default connect(mapStateToProps)(RadioGroup);
