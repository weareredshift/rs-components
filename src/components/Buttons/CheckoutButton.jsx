import React from 'react';
import { connect } from 'react-redux';
import { map, list } from 'react-immutable-proptypes';
import ArrowButton from 'components/Buttons/ArrowButton';

/**
 * Helper function to do build link to Shopify Checkout
 *
 * @param {Object} constants - Shopify cred constants
 * @param {Immutable.Map} cartState - The cart state as stored by our internal
 * components.
 * @param {Immutable.Map} user - The user object from Redux
 * @throws {Error} - Throws if there is an error filling the cart or redirecting
 * to Shopify checkout
 */
export function generateCartURL (constants, cartState, user) {
  const cartItems = cartState.map(item => {
    const varis = item.get('variants').toJS();
    const varIDs = Object.keys(varis);

    return varIDs.map(id => ({ variant: id, quantity: varis[id] }));
  }).reduce((accum, val) => accum.concat(...val), []);

  // Reduce attrs to useful subset with Shopify URL-readable names
  const fullAttrs = {
    'checkout[email]': user.get('email'),
    'checkout[shipping_address][first_name]': user.get('firstName'),
    'checkout[shipping_address][last_name]': user.get('lastName'),
    'checkout[shipping_address][address1]': user.getIn(['address', 'address']),
    'checkout[shipping_address][address2]': user.getIn(['address', 'address2']),
    'checkout[shipping_address][city]': user.getIn(['address', 'city']),
    'checkout[shipping_address][zip]': user.getIn(['address', 'zip']),
    'state': user.getIn(['address', 'province']),
    'country': user.getIn(['address', 'country'])
  };

  const attrSet = Object.keys(fullAttrs).reduce((obj, key) => {
    if (fullAttrs[key] && fullAttrs[key].length > 0) {
      obj[key] = fullAttrs[key];
    }
    return obj;
  }, {});

  const userAttrString = unescape(Object.keys(attrSet)
    .reduce((arr, key) => [...arr, `${key}=${attrSet[key]}`], [])
    .join('&'))
    .replace('+', '%2B');

  const domain = constants.get('SHOPIFY_DOMAIN');
  const base = domain.includes('http')
    ? `${domain}/cart/`
    : `https://${domain}/cart/`;

  const cartItemsString = cartItems
          .map(item => item.variant.concat(':').concat(item.quantity)).join(',');

  return base
    .concat(cartItemsString)
    .concat('?')
    .concat(userAttrString)
    .concat(`&access_token=${constants.get('SHOPIFY_API_KEY')}`);
}

/**
 * Function that creates a Shopify SDK-oriented checkout button, which redirects
 * to the store on click.
 *
 * @param {Object} props
 * @param {[string]} props.buttonText - Optional text to display on the button
 * @param {Immutable.Map} props.constants - Map of app constants from store
 * @param {Immutable.Map} props.cartState - The cart state as stored by our
 * internal components
 * @param {Immutable.Map} props.user - The user object from Redux
 * @param {boolean} props.disabled - Whether the button should be clickable
 * @returns {React.Component} An active button with the label "Checkout"
 */
export function CheckoutButton ({ constants,
                                  cartState,
                                  buttonText,
                                  user,
                                  disabled }) {
  const buttonLabel = typeof buttonText === 'string' ? buttonText : 'Checkout';

  return (
    <ArrowButton
      classes={ disabled ? 'disabled' : 'btn--primary' }
      label={ buttonLabel }
      routeTo={ disabled ? '' : generateCartURL(constants, cartState, user) }
    />
  );
}

function mapStateToProps (state) {
  return {
    cartState: state.cart,
    user: state.user,
    constants: state.constants
  };
}

const { object, string, bool } = React.PropTypes;

CheckoutButton.propTypes = {
  constants: map.isRequired,
  cartState: list.isRequired,
  buttonText: string,
  user: object.isRequired,
  disabled: bool
};

export default connect(mapStateToProps)(CheckoutButton);
