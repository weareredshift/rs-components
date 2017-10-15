import React from 'react';
import { connect } from 'react-redux';
import { bool, object, string, func, number } from 'prop-types';
import { browserHistory } from 'react-router';
import { map } from 'react-immutable-proptypes';

import { setOpenModalID } from './actions';
import { handleQueryStringChange } from './utils';

/**
 * Renders the modal specified by openModal and described in the
 * passed modals prop.
 *
 * @param      {Object}   props
 * @param      {Object}   props.modals       Object mapping modal IDs to content nodes
 * @param      {string}   props.openModal  The ID of the open modal (if any) in the app
 * @param      {Object}   props.history      React-Router browserHistory object
 * @param      {Number}   props.animateOutDelay Seconds to delay unmounting to allow space for animation
 * @param      {Funciton} props.dispatch
 * @return     {React.Component}  The rendered modal
 */
export class ModalUC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalID: props.openModal
    };

    const { tieToURL, dispatch, openModal, history } = props;

    if (tieToURL) {
      // Ensure that any modal ID in URL is reflected in store
      const updateStoreFromlocation = location => {
        const modalInURL = location.query.modal;
        if (modalInURL && !openModal.get('id')) {
          dispatch(setOpenModal(modalInURL));
        }
      };

      const firstLocation = history.getCurrentLocation();
      updateStoreFromlocation(firstLocation);
      history.listen(updateStoreFromlocation);
    }
  }

  componentWillReceiveProps ({ openModal, animateOutDelay, location, dispatch }) {
    if (openModal.get('id') === null) {
      setTimeout(() => {
        this.setState({ modalID: openModal.get('id') });
      }, animateOutDelay);
    } else if (openModal.get('id') !== this.state.modalID) {
      this.setState({ modalID: openModal.get('id') });
    }

    handleQueryStringChange('modal', this.props.location, location, val => {
      dispatch(setOpenModal(val));
    });
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
  openModal: state.openModal,
  location: state.location
});

ModalUC.defaultProps = {
  history: browserHistory,
  log: () => {},
  animateOutDelay: 0,
  tieToURL: true
};

ModalUC.propTypes = {
  modals: object.isRequired,
  openModal: map.isRequired,
  dispatch: func,
  history: object.isRequired,
  log: func,
  animateOutDelay: number,
  tieToURL: bool,
  location: object
};

export default connect(mapStateToProps)(ModalUC);
