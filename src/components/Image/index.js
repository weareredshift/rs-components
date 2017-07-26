import React from 'react';
import classNames from 'classnames';

import './Image.scss';

/**
 * TODO
 *
 * @extends React.Component
 * @param {Object} props - TODO
 * @param {string} props.className - TODO
 * @param {boolean} props.show - TODO
 * @param {string} props.src - TODO
 * @param {string} props.loadedClass - TODO
 */
export class Image extends React.Component {
  constructor (props) {
    super(props);
    this.state = { loaded: false };
  }

  render () {
    const { className, show, src, loadedClass, ...props } = this.props;
    const { loaded } = this.state;

    const classes = classNames(className, 'image', {
      [loadedClass || 'image-loaded']: loaded && show
    });

    return (
      <img
        ref={ el => { this.img = el; } }
        className={ classes }
        src={ src }
        onLoad={ () => {
          this.setState({ loaded: true });
        } }
        { ...props }
      />
    );
  }
}

const { string, bool } = React.PropTypes;
Image.propTypes = {
  className: string,
  show: bool,
  src: string,
  loadedClass: string
};

Image.defaultProps = {
  show: true
};

export default Image;
