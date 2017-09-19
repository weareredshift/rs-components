import React from 'react';
import { connect } from 'react-redux';
import { object, string, func, number } from 'prop-types';
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
 * @param      {Number}   props.animateOutDelay Seconds to delay unmounting to allow space for animation
 * @param      {Funciton} props.dispatch
 * @return     {React.Component}  The rendered modal
 */
export class ModalUC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalID: props.openModalID
    };

    const { dispatch, openModalID, history } = props;

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
  }

  componentWillReceiveProps ({ openModalID, animateOutDelay }) {
    if (openModalID === null) {
      setTimeout(() => {
        this.setState({ modalID: openModalID });
      }, animateOutDelay);
    } else if (openModalID !== this.state.modalID) {
      this.setState({ modalID: openModalID });
    }
  }

  render () {
    const { modals, log } = this.props;
    const { modalID } = this.state;

    if (modalID) {
      if (Object.keys(modals).includes(modalID)) {
        return <div className="modal__wrapper">{ modals[modalID] }</div>;
      } else {
        log(`No modal found for ID: ${modalID}`);
        return null;
      }
    } else {
      return null;
    }
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
  log: () => {},
  animateOutDelay: 0
};

ModalUC.propTypes = {
  modals: object.isRequired,
  openModalID: string,
  dispatch: func,
  history: object.isRequired,
  log: func,
  animateOutDelay: number
};

export default connect(mapStateToProps)(ModalUC);
