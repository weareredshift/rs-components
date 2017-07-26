import React from 'react';
import Carousel from 'components/Carousel';
import SlideWithCrossfade from 'components/Carousel/Slides/SlideWithCrossfade';
import Image from 'components/Image';
import { connect } from 'react-redux';
import './CarouselWithThumbnailControls.scss';

/**
 * Tab controls for carousel
 * @param {Object} props                                      React props
 * @param {Object[]} props.slideCollection                    Array of objects containing information about each slide
 * @param {string} props.slideCollection[].src                Img src for the slide
 * @param {string} props.slideCollection[].alt                Alt tag
 * @param {string} props.slideCollection[].caption            Optional caption to display below image
 * @param {Function} props.switchToNextSlide                  Function that switches activeSlide to passed index
 * @param {number} props.activeSlideIndex                     The index of the currently active slide
 * @param {Function} props.dispatch                           Redux dispatch function
 * @returns {React.Component}
 */
function Controls (props) {
  const { slideCollection, activeSlideIndex, switchToNextSlide } = props;
  return (
    <ul className="carousel__thumbs">
      {
        slideCollection.map((slide, index) => {
          const activeIndex = activeSlideIndex || 0;

          return (
            <li
              key={ index }
              onClick={ () => switchToNextSlide(index, true) }
              className={ activeIndex === index ? 'is-active' : '' }
            >
              <Image src={ slide.src } alt={ slide.alt } />
            </li>
          );
        })
      }
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
 * @param {string} props.slideCollection[].src                Img src for the slide
 * @param {string} props.slideCollection[].alt                Alt tag
 * @param {string} props.slideCollection[].caption            Optional caption to display below image
* @param {number} props.activeSlideIndex                     The index of the currently active slide
 * @returns {React.Component}
 */
export function CarouselWithThumbnailControls (props) {
  const { slideCollection, activeSlideIndex } = props;

  const slides = slideCollection.map((slide, index) => (
    <div>
      <SlideWithCrossfade
        index={ index }
        activeSlideIndex={ activeSlideIndex }
        key={ index }
        startingOpacity={ 1 }
        component={
          <div className="carousel-image" style={ { backgroundImage: `url(${slide.src})` } } />
        }
      />{ slide.caption && <p className="caption">{ slide.caption }</p> }
    </div>
  ));

  return (
    <Carousel
      classes="carousel__thumbnailcontrols"
      { ...props }
      slides={ slides }
      controls={ <Controls /> }
    />
  );
}

const { array, number } = React.PropTypes;
CarouselWithThumbnailControls.propTypes = {
  slideCollection: array,
  activeSlideIndex: number
};

const mapStateToProps = (state, props) => ({
  activeSlideIndex: state.carousels.getIn([props.carouselID, 'index'])
});

export default connect(mapStateToProps)(CarouselWithThumbnailControls);
