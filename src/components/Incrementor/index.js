/**
 * Created by christopherpendergraft on 7/12/17.
 */
import React from 'react';

import './Incrementor.scss';

/**
 * A widget for incrementing the number of a given
 * item/variant in a cart
 *
 * @param      {Object}    props
 * @param      {Function}  props.onChange          Function to be called on incrementor/decrementor click
 * @param      {number}    props.quantity          The quantity to display and change
 */
export function Incrementor ({ onChange, quantity }) {
  return (
    <div className="incrementor">

      <span
        className="incrementor__increment icon-plus"
        onClick={ () => { onChange(quantity + 1, 'increment'); } }
      />
    </div>
  );
}

const { func, number } = React.PropTypes;
Incrementor.propTypes = {
  onChange: func.isRequired,
  quantity: number.isRequired
};

export default Incrementor;
