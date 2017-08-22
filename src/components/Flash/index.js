import React from 'react';
import { connect } from 'react-redux';
import { number, string } from 'prop-types';
import classnames from 'classnames';
import { get } from 'lodash';

/**
 * Wrapper component for most components in app.
 * Provides basic layout.
 *
 * @extends React.Component
 * @param {Object} props
 * @param {string} props.message  Flash message to display
 * @param {string} props.type     Type of flash (ie warning, success, notification) - displayed as class
 * @param {number} props.duration Number of milliseconds to wait before clearing flash
 * @param {string} props.className Optional className to add
 *
 * @returns {React.Component}
 */
export class FlashUC extends React.Component {
  constructor (props) {
    super(props);
    this.state = { status: 'on' };
    this.setFlashTimeout();
  }

  componentWillReceiveProps ({ message }) {
    if (message && message !== this.props.message) {
      this.setState({ status: 'on' });
      this.setFlashTimeout();
    }
  }

  componentWillUnmount () {
    if (this.flashTimeout) clearTimeout(this.flashTimeout);
  }

  setFlashTimeout () {
    const { duration } = this.props;

    // Fade out flash after given duration
    this.flashTimeout = setTimeout(() => {
      this.setState({ status: 'off' });
    }, duration);
  }

  render () {
    const { className, message, type } = this.props;
    const { status } = this.state;

    return (
      <div
        className={ classnames(
          'flash',
          type && `flash--${type}`,
          `flash--${status}`,
          className
        ) }
      >
        <span className="flash__message">
          { message || null }
        </span>
      </div>
    );
  }
}

FlashUC.propTypes = {
  message: string.isRequired,
  type: string.isRequired,
  className: string,
  duration: number.isRequired
};

FlashUC.defaultProps = {
  duration: 1000
};

const mapStateToProps = (state, ownProps) => ({
  message: ownProps.message || get(state, 'location.state.flash'),
  type: ownProps.type || get(state, 'location.state.flashType')
});

export default connect(mapStateToProps)(FlashUC);
