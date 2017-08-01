import React from 'react';
import mojs from 'mo-js';
import './Modal.scss';

/**
 * Renders a modal component
 * @param {Object} props
 * @param {Object} props.children     Inner modal content
 * @param {number} [props.duration]   Optional number defining the length of the animation
 * @extends {React.Component}
 * @returns {React.Component}
 */
export class Modal extends React.Component {
  componentWillEnter (callback) { callback(); }
  componentDidEnter () {
    const { duration } = this.props;

    const animate = new mojs.Tween({
      duration,
      onUpdate: progress => {
        this.modal.style.transform = `translateY(${progress * 100}%)`;
      }
    });

    animate.replayBackward();
  }

  componentWillLeave (callback) {
    const { duration } = this.props;

    const animate = new mojs.Tween({
      duration,
      onUpdate: progress => {
        this.modal.style.transform = `translateY(${progress * 100}%)`;
      },
      onPlaybackComplete: () => callback()
    });

    animate.replay();
  }

  render () {
    const { children } = this.props;

    return (
      <div className="modal" ref={ el => { this.modal = el; } } style={ { transform: 'translateX(-100%)' } }>
        { children }
      </div>
    );
  }
}

Modal.propTypes = {
  children: React.PropTypes.node,
  duration: React.PropTypes.number
};

Modal.defaultProps = {
  duration: 200
};

export default Modal;
