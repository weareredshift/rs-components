import React, { Component } from 'react';
import mojs from 'mo-js';

/**
 * Slide with crossfading opacity transition, uses TransitionGroup to
 * animate in on componentDidEnter and animate out on componentWillLeave
 * @param {Object} props                                      React props
 * @param {Object} props.component                            React node that houses slide content
 * @param {number} props.duration                             Duration of the crossfade animation
 * @param {number} props.activeSlideIndex                     Currently active slide for this carouselID
 * @param {number} props.index                                This slides index
 * @returns {React.Component}
 */
export class SlideWithCrossfade extends Component {
  componentDidMount () {
    const { activeSlideIndex, index } = this.props;

    this.state = { animating: false };

    if (activeSlideIndex === index) {
      this.container.style.opacity = 1;
      this.container.style.display = 'block';
    }
  }

  componentDidUpdate (prevProps) {
    const { activeSlideIndex, index } = this.props;

    if (prevProps.activeSlideIndex !== activeSlideIndex) {
      if (activeSlideIndex === index) {
        this.toggleAnimation('animateIn');
      } else if (prevProps.activeSlideIndex === index) {
        this.toggleAnimation('animateOut');
      }
    }
  }

  toggleAnimation (animation) {
    const { duration } = this.props;

    const animate = new mojs.Tween({
      duration: duration,
      onUpdate: progress => {
        if (this.container) this.container.style.opacity = progress;
      },
      onPlaybackComplete: () => {
        this.setState({ animating: false });
        if (this.container) {
          if (animation === 'animateOut') {
            this.container.style.display = 'none';
            this.container.style.zIndex = 1;
          }
        }
      }
    });

    if (!this.state.animating) {
      this.setState({ animating: true });

      if (animation === 'animateIn') {
        if (this.container) {
          this.container.style.zIndex = 2;
          this.container.style.display = 'block';
        }
        animate.play();
      } else if (animation === 'animateOut') {
        animate.playBackward();
      }
    }
  }

  render () {
    const { component, startingOpacity, activeSlideIndex, index } = this.props;

    return (
      <div
        ref={ (el) => { this.container = el; } }
        className={ `carousel__slide ${activeSlideIndex === index ? 'is-active' : ''}` }
        style={ { opacity: startingOpacity || 0, zIndex: 1 } }
      >{ component }
      </div>
    );
  }
};

const { node, number } = React.PropTypes;
SlideWithCrossfade.propTypes = {
  component: node,
  startingOpacity: number,
  activeSlideIndex: number,
  index: number,
  duration: number
};

SlideWithCrossfade.defaultProps = {
  duration: 600
};

export default SlideWithCrossfade;
