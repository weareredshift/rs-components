/* eslint no-unused-vars:0 */

import Immutable from 'immutable';
import sinon from 'sinon';

import ConnectedCheckoutButton, { CheckoutButton } from 'components/Buttons/CheckoutButton';
import ArrowButton from 'components/Buttons/ArrowButton';

describe('<CheckoutButton />', () => {
  it('Creates an arrow button link with button CSS', () => {
    const comp = mockComp(CheckoutButton, { user: Immutable.Map({}), constants: Immutable.Map({ SHOPIFY_DOMAIN: '' }), cartState: Immutable.List([]) });
    const button = comp.find(ArrowButton);
    expect(button).to.exist;
    expect(button.props().classes).to.eq('btn--primary');
  });

  it('Creates a cart on click', () => {
    const comp = mockComp(CheckoutButton, {
      cartState: Immutable.fromJS([
        {
          id: '9739835084',
          variants: {
            '34651406668': 1
          }
        },
        {
          id: '9740146956',
          variants: {
            '34651697676': 3
          }
        },
        {
          id: '9642713164',
          variants: {
            '34651660300': 1
          }
        }
      ]),
      constants: Immutable.Map({ SHOPIFY_DOMAIN: 'fake.com' }),
      user: Immutable.Map({ address: Immutable.Map({ city: 'SF' }) })
    });
    expect(comp.props().routeTo.includes('https://fake.com/cart/34651406668:1,34651697676:3,34651660300:1?')).to.eq(true);
    expect(comp.props().routeTo.includes('checkout[shipping_address]')).to.eq(true);
  });
});
