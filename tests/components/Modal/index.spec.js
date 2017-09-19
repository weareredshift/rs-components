import React from 'react';
import { ModalUC } from 'components/Modal';
import { objEq } from 'support/assert';

describe('<Modal />', () => {
  it('renders the modal for the open ID', () => {
    const comp = mockComp(ModalUC, {
      openModalID: 'account',
      modals: {
        decoy: <div>Decoy</div>,
        account: <div>Account</div>
      }
    });

    expect(comp.find('div').first().text()).to.eq('Account');
  });

  it('renders nothing if nothing matches', () => {
    const log = sinon.spy();
    const comp = mockComp(ModalUC, {
      openModalID: 'bs',
      modals: {
        account: <div>Account</div>
      },
      log
    });

    expect(comp.html()).to.eq(null);
    expect(log.lastCall.args[0]).to.eq('No modal found for ID: bs');
  });

  it('updates the store based on browser history', () => {
    window.history.pushState({}, null, '?modal=whatever');
    const dispatch = sinon.spy();
    mockComp(ModalUC, {
      dispatch,
      modals: {}
    });

    objEq(
      dispatch.lastCall.args[0],
      {
        type: 'SET_OPEN_MODAL_ID',
        id: 'whatever',
        updateURL: true
      }
    );
  });
});
