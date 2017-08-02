import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Displays a full-height centered loader animation. Content is passed in, and animation is CSS-driven.
 *
 * @param {Object} props
 * @param {string} props.children Element or text to display
 * @param {number} props.speed How often to change Loader state (ms)
 *
 * @returns {React.Component}
 */
export class LoaderUC extends React.Component {
  constructor (props) {
    super(props);
    this.state = { show: true };

    const pulse = () => {
      this.transition = setTimeout(() => {
        this.setState({ show: !this.state.show });
        pulse();
      }, props.speed);
    };

    pulse();
  }

  componentWillUnmount () {
    this.setState({ height: 0 });
    clearTimeout(this.transition);
  }

  render () {
    const { children, className } = this.props;
    const { show } = this.state;

    const height = window.innerHeight;

    return (
      <div style={ { height: `${height}px` } } className={ classnames('loader', !show && 'loader--off', className) }>
        <div className="loader__child">{ children }</div>
      </div>
    );
  }
}

const { string, element, oneOfType, number } = PropTypes;
LoaderUC.propTypes = {
  children: oneOfType([string, element]),
  speed: number,
  className: string
};

LoaderUC.defaultProps = {
  speed: 1000
};

export default LoaderUC;
