import React from 'react';
import { connect } from 'react-redux';

import Carousel, { currySwitchToNextSlide } from 'components/Carousel';
import Quote from 'components/Quote';
import './QuoteCarousel.scss';
import { setClass } from 'utils/responsiveHelpers';
import { SlideWithCrossfade } from './Slides/SlideWithCrossfade';

/**
 * Tab controls for carousel
 * @param {Object} props                                      React props
 * @param {Object[]} props.slideCollection                    Array of objects containing information about each slide
 * @param {string} props.slideCollection[].img                Img src for the slide
 * @param {string} props.slideCollection[].label              Label that appears in tab
 * @param {string} props.slideCollection[].icon               Class for icons that appears in tab
 * @param {Function} props.currySwitchToNextSlide                  Function that switches activeSlide to passed index
 * @param {number} props.activeSlideIndex                     The index of the currently active slide
 * @param {Function} props.dispatch                           Redux dispatch function
 * @param {string} props.carouselID                           Unique identifier of carousel
 * @returns {React.Component}
 */
function Controls (props) {
  const { activeSlideIndex, slideCollection, carouselID, dispatch } = props;

  const backIndex = [0, null, undefined].includes(activeSlideIndex)
    ? slideCollection.length - 1
    : activeSlideIndex - 1;

  const switchSlide = currySwitchToNextSlide(carouselID, dispatch, slideCollection);

  return (
    <div
      className="carousel__arrows"
    >
      <div
        className="carousel__arrows__prev"
        onClick={ () => switchSlide(backIndex) }
      ><span className="icon-arrow-left" /></div>

      <div
        className="carousel__arrows__next"
        onClick={ () => switchSlide((activeSlideIndex || 0) + 1) }
      ><span className="icon-arrow-right" /></div>
    </div>
  );
}

const { number, func, array, object, string } = React.PropTypes;
Controls.propTypes = {
  activeSlideIndex: number,
  slideCollection: array.isRequired,
  dispatch: func,
  carouselID: string.isRequired
};

/**
 * Full screen carousel with tabbed controls
 * @param {Object} props                                      React props
 * @param {Object[]} props.slideCollection                    Array of objects containing information about each slide
 * @param {string} props.slideCollection[].text               Quote body
 * @param {string} props.slideCollection[].title              Title of author (opt)
 * @param {number} props.activeSlideIndex                     Currently active slide for this carouselID
 * @param {string} props.slideCollection[].author             Name of author
 * @returns {React.Component}
 */
export function QuoteCarousel (props) {
  const { slideCollection, breakpoint, activeSlideIndex } = props;

  const slides = slideCollection.map((slide, index) => (
    <SlideWithCrossfade
      key={ index }
      index={ index }
      activeSlideIndex={ activeSlideIndex }
      duration={ 400 }
      component={
        <Quote { ...slide } >
          <Controls { ...props } />
        </Quote>
      }
    />
  ));

  return (
    <Carousel
      { ...props }
      autoplayInterval={ 3000 }
      controlClass={
        'layout--relative '.concat(setClass({
          default: 'col-3 typ--right',
          desktopSm: 'col-4 typ--right',
          mobileLg: 'mcol-6 typ--right',
          mobileXsm: 'mcol-6 typ--left'
        }, breakpoint))
      }
      classes="carousel__quote"
      slides={ slides }
    />
  );
}

QuoteCarousel.propTypes = {
  slideCollection: array,
  breakpoint: object,
  activeSlideIndex: number
};

const mapStateToProps = (state, givenProps) => ({
  breakpoint: state.breakpoint,
  activeSlideIndex: state.carousels.getIn([givenProps.carouselID, 'index'])
});

export default connect(mapStateToProps)(QuoteCarousel);
