import React from 'react';
import { connect } from 'react-redux';
import { object, string, func } from 'prop-types';
import { browserHistory } from 'react-router';

import { setOpenModalID } from './actions';

/**
 * Renders the modal specified by openModalID and described in the
 * passed modals prop.
 *
 * @param      {Object}   props
 * @param      {Object}   props.modals       Object mapping modal IDs to content nodes
 * @param      {string}   props.openModalID  The ID of the open modal (if any) in the app
 * @param      {Object}   props.history      React-Router browserHistory object
 * @param      {Funciton} props.dispatch
 * @return     {React.Component}  The rendered modal
 */
export function ModalUC ({ modals, openModalID, dispatch, history, log }) {
  // Ensure that any modal ID in URL is reflected in store
  const updateStoreFromlocation = location => {
    const modalInURL = location.query.modal;
    if (modalInURL && !openModalID) {
      dispatch(setOpenModalID(modalInURL));
    }
  };

  const firstLocation = history.getCurrentLocation();
  updateStoreFromlocation(firstLocation);
  history.listen(updateStoreFromlocation);

  if (openModalID) {
    if (Object.keys(modals).includes(openModalID)) {
      return <div className="modal">{ modals[openModalID] }</div>;
    } else {
      log(`No modal found for ID: ${openModalID}`);
      return null;
    }
  } else {
    return null;
  }
}

const mapStateToProps = state => ({
  openModalID: state.openModalID,
  /* eslint-disable no-console */
  log: console.error
  /* eslint-enable no-console */
});

ModalUC.defaultProps = {
  history: browserHistory,
  log: () => {}
};

ModalUC.propTypes = {
  modals: object.isRequired,
  openModalID: string,
  dispatch: func,
  history: object.isRequired,
  log: func
};

export default connect(mapStateToProps)(ModalUC);
