import React from 'react';
import Carousel from 'components/Carousel';
import SlideWithCrossfade from 'components/Carousel/Slides/SlideWithCrossfade';
import { connect } from 'react-redux';

/**
 * Tab controls for carousel
 * @param {Object} props                                      React props
 * @param {Object[]} props.slideCollection                    Array of objects containing information about each slide
 * @param {string} props.slideCollection[].img                Img src for the slide
 * @param {string} props.slideCollection[].label              Label that appears in tab
 * @param {string} props.slideCollection[].icon               Class for icons that appears in tab
 * @param {Function} props.switchToNextSlide                  Function that switches activeSlide to passed index
 * @param {number} props.activeSlideIndex                     The index of the currently active slide
 * @param {Function} props.dispatch                           Redux dispatch function
 * @returns {React.Component}
 */
function Controls (props) {
  const { slideCollection, activeSlideIndex, switchToNextSlide } = props;
  return (
    <ul className="carousel__tabs">
      { slideCollection.map((slide, index) => {
        let activeIndex = activeSlideIndex;

        if (activeSlideIndex) {
          activeIndex = activeSlideIndex;
        } else {
          activeIndex = 0;
        }

        return (
          <li
            key={ index }
            onClick={ () => switchToNextSlide(index, true) }
            className={ activeIndex === index ? 'is-active' : '' }
          >
            <span className={ `icon-${slide.icon}` } />
            <span className="carousel__tabs__label hide--tlg">{ slide.label }</span>
            <span className="carousel__tabs__label show--tlg">{ slide.tabletLabel }</span>
          </li>
        );
      }) }
    </ul>
  );
}

Controls.propTypes = {
  slideCollection: React.PropTypes.array,
  activeSlideIndex: React.PropTypes.number,
  switchToNextSlide: React.PropTypes.func
};

/**
 * Full screen carousel with tabbed controls
 * @param {Object} props                                      React props
 * @param {Object[]} props.slideCollection                    Array of objects containing information about each slide
 * @param {string} props.slideCollection[].img                Img src for the slide
 * @param {string} props.slideCollection[].label              Label that appears in tab
 * @param {string} props.slideCollection[].icon               Class for icons that appears in tab
 * @returns {React.Component}
 */
export function CarouselWithTabControls (props) {
  const { slideCollection, activeSlideIndex } = props;

  const slides = slideCollection.map((slide, index) => (
    <SlideWithCrossfade
      key={ index }
      { ...slide }
      index={ index }
      activeSlideIndex={ activeSlideIndex }
      component={
        <div className="carousel__slide carousel__slidewrap">
          <img
            className="carousel__slideimg"
            src={ slide.img }
            alt={ slide.label }
          />
        </div>
      }
    />
  ));

  return (
    <Carousel
      { ...props }
      slides={ slides }
      controls={ <Controls /> }
    />
  );
}

const { array, number } = React.PropTypes;
CarouselWithTabControls.propTypes = {
  slideCollection: array,
  activeSlideIndex: number
};

const mapStateToProps = (state, props) => ({
  activeSlideIndex: state.carousels.getIn([props.carouselID, 'index'])
});

export default connect(mapStateToProps)(CarouselWithTabControls);
