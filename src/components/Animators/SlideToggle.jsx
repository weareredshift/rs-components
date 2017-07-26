import React from 'react';
import Measure from 'react-measure';
import mojs from 'mo-js';
import ReactDOM from 'react-dom';

/**
 * Animation wrapper that animates height to reveal children content based on passed open prop
 *
 * @extends React.Component
 * @param {Object} props                React properties argument
 * @param {Object} props.children       Children is the content that is revealed on expand
 * @param {boolean} props.open          Boolean defining whether expanded or collapsed
 * @param {number} props.duration       Number (in milliseconds) defining duration of the animation
 * @param {string} props.classes        String defining classes passed to container div
 * @returns {React.Component}           Returns a react component
 */
export class SlideToggle extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      dimensions: { width: -1, height: -1 },
      animationInProgress: false
    };
  }

  componentDidUpdate (prevProps) {
    const { open } = this.props;
    if (open !== prevProps.open) this.toggleAnimation(prevProps);
  }

  toggleAnimation (prevProps) {
    const { dimensions, animationInProgress } = this.state;
    const { duration, open } = this.props;
    const container = ReactDOM.findDOMNode(this.refs.container);

    if (open && animationInProgress) {
      // if toggled open during close animation
      this.animate.replay();
      return false;
    } else if (!open && animationInProgress) {
      // if toggled closed during open animation
      this.animate.replayBackward();
      return false;
    }

    this.animate = new mojs.Tween({
      duration,
      easing: 'quint.out',
      backwardEasing: 'quint.in',
      onUpdate: progress => {
        container.style.height = `${progress * dimensions.height}px`;
        container.style.opacity = progress;
      },
      onPlaybackStart: () => this.setState({ animationInProgress: true }),
      onPlaybackComplete: () => this.setState({ animationInProgress: false })
    });

    // if changing from closed to open, play normally
    if (open && !prevProps.open) this.animate.play();
    // if changing from open to closed, play in reverse
    if (!open && prevProps.open) this.animate.playBackward();
  }

  render () {
    const { children, classes } = this.props;

    return (
      <div ref="container" style={ { height: 0, overflow: 'hidden', opacity: 0 } } className={ classes && classes }>
        <Measure onMeasure={ dimensions => this.setState({ dimensions }) }>
          { children }
        </Measure>
      </div>
    );
  }
}

SlideToggle.propTypes = {
  children: React.PropTypes.node.isRequired,
  open: React.PropTypes.bool.isRequired,
  duration: React.PropTypes.number,
  classes: React.PropTypes.string
};

SlideToggle.defaultProps = {
  duration: 200,
  classes: ''
};

export default SlideToggle;
