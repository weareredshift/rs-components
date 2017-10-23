import React from 'react';
import { connect } from 'react-redux';
import { object, number } from 'prop-types';
import { browserHistory } from 'react-router';
import { map } from 'react-immutable-proptypes';

/**
 * Renders the modal specified by openModal and described in the
 * passed modals prop.
 *
 * @param      {Object}   props                       React props object
 * @param      {Object}   props.modals                Object mapping modal IDs to content nodes
 * @param      {string}   props.openModal             The ID of the open modal (if any) in the app
 * @param      {Object}   props.history               React-Router browserHistory object
 * @param      {number}   props.animateOutDelay       Seconds to delay unmounting to allow space for animation
 * @param      {Funciton} props.dispatch              Redux dispatch function
 * @return     {React.Component}                      The rendered modal
 */
export class ModalUC extends React.Component {
  constructor(props) {
    super(props);
    const { openModal } = props;

    this.state = {
      modalID: openModal && openModal.get('id'),
      data: openModal && openModal.get('data') && openModal.get('data').toJS()
    };
  }

  componentWillReceiveProps ({ openModal, animateOutDelay }) {
    const modalID = openModal && openModal.get('id');

    if (modalID === null) {
      setTimeout(() => {
        this.setState({ modalID });
      }, animateOutDelay);
    } else if (modalID !== this.state.modalID) {
      this.setState({ modalID: modalID, data: openModal.get('data') && openModal.get('data').toJS() });
    }
  }

  render () {
    const { modals } = this.props;
    const { modalID, data } = this.state;

    if (modalID && Object.keys(modals).includes(modalID)) {
      return <div className="modal__wrapper">{ React.cloneElement(modals[modalID], { data: data || {} }) }</div>;
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
  animateOutDelay: 0
};

ModalUC.propTypes = {
  modals: object.isRequired,
  openModal: map.isRequired,
  animateOutDelay: number
};

export default connect(mapStateToProps)(ModalUC);
