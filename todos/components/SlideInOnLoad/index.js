import React from 'react';

import './SlideInOnLoad.scss';

/**
 * On mount, animates in child component
 *
 * @class      SlideInOnLoad
 */
export class SlideInOnLoad extends React.Component {
  constructor (props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ show: true });
    }, 300);
  }

  render () {
    const { children } = this.props;
    const { show } = this.state;

    return (
      <div className={ 'slide-in-on-load'.concat(show ? ' loaded' : '') }>
        { children }
      </div>
    );
  }
}

const { node } = React.PropTypes;
SlideInOnLoad.propTypes = {
  children: node.isRequired
};

export default SlideInOnLoad;
