import React from 'react';

import './Loader.scss';

/**
 * Displays a full-height centered loader animation
 *
 * @class      Loader
 */
export class Loader extends React.Component {
  constructor (props) {
    super(props);
    this.state = { show: true };

    const pulse = () => {
      this.fadeInOut = setTimeout(() => {
        this.setState({ show: !this.state.show });
        pulse();
      }, 1000);
    };

    pulse();
  }

  componentWillUnmount () {
    this.setState({ height: 0 });
    clearTimeout(this.fadeInOut);
  }

  render () {
    const { show } = this.state;

    const height = window.innerHeight;

    return (
      <div style={ { height: `${height}px` } } className={ show ? 'noon-loader' : 'noon-loader transparent' }>
        <div className="noon-loader__imagecontainer">
          <img src={ require('assets/img/logo.svg') } alt="" />
        </div>
      </div>
    );
  }
}

export default Loader;
