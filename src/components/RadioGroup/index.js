import React from 'react';
import { connect } from 'react-redux';
import { map } from 'react-immutable-proptypes';
import classnames from 'classnames';

import { setRadioValue } from 'store/actions';
import 'styles/components/RadioGroup.scss';

/**
 * Renders a group of redux-connected radio buttons
 *
 * @param {Object} props
 * @param {string} props.groupID Unique identifier of this radio group in Redux
 * @param {string} props.className Optional additional classes
 * @param {Object[]} props.items List of radio item object
 * @param {Array} props.radios Redux representation of radio button values
 * @param {Function} props.afterCheck Callback run after the radio button value is selected in Redux
 * @param {function} props.dispatch
 *
 * @returns {React.Component} A group of radio buttons
 */
export function RadioGroupUC ({ groupID, className, items, radios, dispatch, afterCheck }) {
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
  radios: map.isRequired,
  dispatch: func,
  afterCheck: func
};

const mapStateToProps = state => ({
  radios: state.radios
});

export default connect(mapStateToProps)(RadioGroupUC);
