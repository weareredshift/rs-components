import React, { Component } from 'react';
import { TimelineMax, Power1 } from 'gsap';
import GSAP from 'react-gsap-enhancer';
import './SlideWithHorizontalSliding.scss';

/**
 * Slide with horizontal slidingtransition
 * @param {Object} props                                      React props
 * @param {Object} props.component                            React node that houses slide content
 * @param {number} props.duration                             Duration of the crossfade animation
 * @param {number} props.activeSlideIndex                     Currently active slide for this carouselID
 * @param {number} props.index                                This slides index
 * @returns {React.Component}
 */
export class SlideWithHorizontalSliding extends Component {
  componentDidMount () {
    const { activeSlideIndex, index } = this.props;

    this.animationInProgress = false;
    setTimeout(() => {
      this.timeline = this.addAnimation(this.initializeAnimation.bind(this));
      if (activeSlideIndex === index) {
        this.container.style.opacity = 1;
        this.container.style.transform = 'translate(0%, 0%) matrix(1, 0, 0, 1, 0, 0)';
      }
    }, 300);
  }

  componentDidUpdate (prevProps) {
    const { activeSlideIndex, index } = this.props;

    if (prevProps.activeSlideIndex !== activeSlideIndex) {
      if (activeSlideIndex === index) {
        this.timeline = this.addAnimation(
          this.animateIn.bind(this),
          { offset: this.getAnimateInoffset(prevProps.activeSlideIndex) },
        ).play();
      } else if (prevProps.activeSlideIndex === index) {
        this.timeline = this.addAnimation(
          this.animateOut.bind(this),
          { offset: this.getAnimateOutoffset() },
        ).play();
      }
    }
  }

  initializeAnimation ({ target }) {
    if (target && target[0]) {
      const { index, activeSlideIndex } = this.props;

      let zIndex = 1;
      let offset = '0%';
      if (index > activeSlideIndex) offset = '100%';
      if (index === activeSlideIndex) zIndex = 2;
      return new TimelineMax().set(target[0], { zIndex, x: offset });
    }
  }

  getAnimateInoffset (prevActiveSlide) {
    const { index, slideCount, activeSlideIndex } = this.props;
    let offset;

    if ((index === 0 && prevActiveSlide === slideCount)) {
      offset = '100%';
    } else if (prevActiveSlide === 0 && activeSlideIndex === slideCount) {
      offset = '-100%';
    } else if (index > prevActiveSlide) {
      offset = '100%';
    } else if (index < prevActiveSlide) {
      offset = '-100%';
    }

    return offset;
  }

  getAnimateOutoffset () {
    const { index, slideCount, activeSlideIndex } = this.props;
    let offset;

    if ((index === 0 && activeSlideIndex === slideCount)) {
      offset = '100%';
    } else if (activeSlideIndex === 0 && index === slideCount) {
      offset = '-100%';
    } else if (index > activeSlideIndex) {
      offset = '100%';
    } else if (index < activeSlideIndex) {
      offset = '-100%';
    }

    return offset;
  }

  animateIn ({ target, options }) {
    const { duration } = this.props;

    if (target && target[0]) {
      return new TimelineMax()
        .set(target[0], { x: options.offset })
        .to(target[0], duration, {
          x: '0%',
          ease: Power1.easeInOut
        }, 'slideIn');
    }
  }

  animateOut ({ target, options }) {
    const { duration } = this.props;

    if (target && target[0]) {
      return new TimelineMax()
        .set(target[0], { x: '0%' })
        .to(target[0], duration, {
          x: options.offset,
          ease: Power1.easeInOut
        }, 'slideOut');
    }
  }

  render () {
    const { component, index, activeSlideIndex } = this.props;

    return (
      <div
        style={ { zIndex: index === activeSlideIndex ? 2 : 1, transform: 'translate(0%, 0%) matrix(1, 0, 0, 1, 0, 0)' } }
        ref={ (el) => { this.container = el; } }
        className="carousel__slide"
      >{ component }</div>
    );
  }
};

const { node, number } = React.PropTypes;
SlideWithHorizontalSliding.propTypes = {
  component: node,
  activeSlideIndex: number,
  index: number,
  duration: number,
  slideCount: number
};

SlideWithHorizontalSliding.defaultProps = {
  activeSlideIndex: 0
};

export default GSAP()(SlideWithHorizontalSliding);
