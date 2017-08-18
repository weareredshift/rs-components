import React from 'react';

import './QuantityEditor.scss';

/**
 * A widget for incrementing/decrementing the number of a given
 * item/variant in a cart
 *
 * @param      {Object}    props
 * @param      {Function}  props.onChange          Function to be called on incrementor/decrementor click
 * @param      {number}    props.quantity          The quantity to display and change
 */
export function QuantityEditor ({ onChange, quantity }) {
  return (
    <div className="quantityeditor">
      <span
        className="quantityeditor__decrement icon-minus"
        onClick={ () => { onChange(Math.max(quantity - 1, 0), 'decrement'); } }
      />
      <h6 className="quantityeditor__current">{ quantity }</h6>
      <span
        className="quantityeditor__increment icon-plus"
        onClick={ () => { onChange(quantity + 1, 'increment'); } }
      />
    </div>
  );
}

const { func, number } = React.PropTypes;
QuantityEditor.propTypes = {
  onChange: func.isRequired,
  quantity: number.isRequired
};

export default QuantityEditor;
