import React from 'react';
import { connect } from 'react-redux';
import { number, object, string } from 'prop-types';
import classnames from 'classnames';
import { get } from 'lodash';

/**
 * Wrapper component for most components in app.
 * Provides basic layout.
 *
 * @extends React.Component
 * @param {Object} props
 * @param {Object} props.location Location tracking object
 * @param {number} props.duration Number of milliseconds to wait before clearing flash
 *
 * @returns {React.Component}
 */
export class Flash extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.setFlash(
      get(props, 'location.state.flash'),
      get(props, 'location.state.flashType')
    );
  }

  componentWillReceiveProps (newProps) {
    this.setFlash(
      get(newProps, 'location.state.flash'),
      get(newProps, 'location.state.flashType')
    );
  }

  componentWillUnmount () {
    if (this.flashTimeout) clearTimeout(this.flashTimeout);
  }

  setFlash (flash) {
    const { flashDuration } = this.props;
    this.setState({ flash });

    if (flash) {
      // Fade out flash after 1 second
      this.flashTimeout = setTimeout(() => {
        this.setState({ flash: null });
      }, flashDuration);
    }
  }

  render () {
    const { className } = this.props;
    const { flash, flashType } = this.state;

    return (
      <div
        className={ classnames(
          'flash',
          flashType && `flash--${flashType}`,
          `flash--${ flash ? 'on' : 'off' }`,
          className
        ) }
      >
        { flash || null }
      </div>
    );
  }
}

Flash.propTypes = {
  location: object,
  className: string,
  flashDuration: number
};

Flash.defaultProps = {
  flashDuration: 1000
};

const mapStateToProps = state => ({
  location: state.location
});

export default connect(mapStateToProps)(Flash);
