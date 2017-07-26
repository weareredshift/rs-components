import React, { Component } from 'react';
import { TimelineMax, Power1 } from 'gsap';
import GSAP from 'react-gsap-enhancer';

/**
 * Slide with an animating content div and crossfading background img
 *
 * animate in on componentDidEnter and animate out on componentWillLeave
 * @param {Object} props                                      React props
 * @param {Object} props.content                              Object containing the copy for the content div
 * @param {string} props.content.slide                        String url src to the img that appears in the content div
 * @param {string} props.content.title                        String defining the title that appears in the h3 in the content div
 * @param {string} props.content.copy                         String defining the copy that appears in the p in the content div
 * @param {string} props.img                                  String url src to slide img
 * @param {string} props.scrollDirection                      String determining direction of scroll event (either up or down)
 * @param {number} props.activeSlideIndex                     Currently active slide for this carouselID
 * @param {number} props.index                                This slides index
 * @returns {React.Component}
 */
export class SlideWithVerticalSwipe extends Component {
  componentDidMount () {
    const { activeSlideIndex, index } = this.props;

    if (activeSlideIndex === index) {
      setTimeout(() => this.addAnimation(this.animateIn.bind(this)).play(), 200);
    }
  }

  componentDidUpdate (prevProps) {
    const { activeSlideIndex, index } = this.props;

    if (prevProps.activeSlideIndex !== activeSlideIndex) {
      if (activeSlideIndex === index) {
        this.addAnimation(this.animateIn.bind(this)).play();
      } else if (prevProps.activeSlideIndex === index) {
        this.addAnimation(this.animateOut.bind(this)).play();
      }
    }
  }

  animateIn ({ target }) {
    if (target && target[0]) {
      target[0].style.zIndex = 3;
      const img = target[0].querySelector('.carousel__boximg');
      const content = target[0].querySelector('.carousel__boxcontent');
      const bgImg = target[0].querySelector('.carousel__slide__bg');

      return new TimelineMax()

      .staggerTo([img, content], 0.3, { y: 0, opacity: 1, ease: Power1.eastOut }, 0.2, 'slideIn')
      .to(bgImg, 0.2, { opacity: 1 }, 'slideIn+=0.3');
    }
  }

  animateOut ({ target }) {
    const { scrollDirection } = this.props;

    if (target && target[0]) {
      target[0].style.zIndex = 1;
      const img = target[0].querySelector('.carousel__boximg');
      const content = target[0].querySelector('.carousel__boxcontent');
      const bgImg = target[0].querySelector('.carousel__slide__bg');

      return new TimelineMax()

      .staggerTo([img, content], 0.3, {
        y: scrollDirection === 'down' ? -50 : 50,
        opacity: 0,
        ease: Power1.eastOut }, 0, 'slideOut')
      .to(bgImg, 0.2, { opacity: 0 }, 'slideOut+=0.3');
    }
  }

  render () {
    const { content, img, scrollDirection, activeSlideIndex, index } = this.props;

    const style = {
      transform: scrollDirection === 'up' ? 'matrix(1, 0, 0, 1, 0, -50)' : 'matrix(1, 0, 0, 1, 0, 50)',
      opacity: 0
    };

    return (
      <div
        ref={ (el) => { this.container = el; } }
        className="carousel__slide"
        style={ { zIndex: activeSlideIndex === index ? 3 : 0 } }
      >
        <div className="carousel__slide__bg" style={ { opacity: 0, backgroundImage: `url(${img})` } } />
        <div className="carousel__content layout--flex theme--dark">
          <div>
            <img
              style={ style }
              className="slide__img carousel__boximg"
              src={ content.img }
              alt={ content.title }
            />
            <div
              style={ style }
              className="carousel__boxcontent"
            >
              <h3 className="carousel__content__title typ--heading typ--white">{ content.title }</h3>
              <p className="mb0">{ content.copy }</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const { object, string, number } = React.PropTypes;
SlideWithVerticalSwipe.propTypes = {
  content: object,
  img: string,
  scrollDirection: string,
  activeSlideIndex: number,
  index: number
};

export default GSAP()(SlideWithVerticalSwipe);
