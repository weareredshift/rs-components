import React from 'react';
import Watcher from 'components/Watcher';
import { TimelineMax } from 'gsap';
import GSAP from 'react-gsap-enhancer';

/**
 * Renders a Builder component that animates it's children in and
 * up as the Watcher enters the viewport
 *
 * @param {Object} props
 * @param {Node} props.children     React child node containing content to be animated
 * @param {string} props.offset     String defining offset passed to top value of watcher,
 *                                  for offsetting where the watcher is triggered.
 * @returns {React.Component}       Returns a react component
 */
export class Builder extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      animatedIn: false
    };
  }

  componentDidMount () {
    this.mounted = true;
  }

  watcherCallback (watcher) {
    const { animatedIn } = this.state;
    if (watcher.isInViewport && !animatedIn) {
      this.timeline = this.addAnimation(this.animateIn.bind(this)).play();
    }
  };

  animateIn ({ target }) {
    const { delay } = this.props;

    if (target && target[0]) {
      return new TimelineMax({ onComplete: () => this.clearAnimation() })
        .to(target[0], 0.6, { opacity: 1, y: 0, delay }, 'slideIn');
    }
  }

  clearAnimation () {
    if (this.mounted) this.setState({ animatedIn: true });
  }

  componentWillUnmount () {
    this.mounted = false;
  }

  render () {
    const { children } = this.props;

    return (
      <div style={ { opacity: 0, transform: 'translateY(5rem)' } }>
        <Watcher
          // offset={ { top: offset } }
          autoStart={ false }
          stateChange={ this.watcherCallback.bind(this) }
          enterViewport={ this.watcherCallback.bind(this) }
        >
          { children }
        </Watcher>

      </div>
    );
  }
}

const { node, number } = React.PropTypes;
Builder.propTypes = {
  children: node,
  delay: number
};

Builder.defaultProps = {
  delay: 0
};

export default GSAP()(Builder);
