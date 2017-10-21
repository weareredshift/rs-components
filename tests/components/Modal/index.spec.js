import React from 'react';
import { fromJS } from 'immutable';

import { ModalUC } from 'components/Modal';

describe('<Modal />', () => {
  it('renders the modal for the open ID', () => {
    const comp = mockComp(ModalUC, {
      openModal: fromJS({ id: 'account' }),
      modals: {
        decoy: <div>Decoy</div>,
        account: <div>Account</div>
      }
    });

    expect(comp.find('div').first().text()).to.eq('Account');
  });

  it('renders nothing if nothing matches', () => {
    const comp = mockComp(ModalUC, {
      openModal: fromJS({ id: 'bs' }),
      modals: {
        account: <div>Account</div>
      }
    });

    expect(comp.html()).to.eq(null);
  });

  it('passes data to the child', () => {
    const dispatch = sinon.spy();
    const comp = mockComp(ModalUC, {
      dispatch,
      modals: {
        /* eslint-disable react/prop-types */
        account: <span>Thing</span>
        /* eslint-enable react/prop-types */
      },
      openModal: fromJS({
        id: 'account',
        data: { name: 'whatever' }
      })
    });

    expect(comp.find('span').first().props().data.name).to.eq('whatever');
  });
});
