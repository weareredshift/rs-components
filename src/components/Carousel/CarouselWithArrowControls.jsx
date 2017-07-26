import React from 'react';
import Carousel from 'components/Carousel';
import SlideWithHorizontalSliding from 'components/Carousel/Slides/SlideWithHorizontalSliding';
import { connect } from 'react-redux';
import CarouselInfo from 'components/Carousel/CarouselInfo';
import './CarouselWithArrowControls.scss';

const duration = 0.6;

/**
 * Arrow controls for carousel
 * @param {Object} props                                      React props
 * @param {Function} props.switchToNextSlide                  Function that switches activeSlide to passed index
 * @param {number} props.activeSlideIndex                     The index of the currently active slide
 * @param {string} props.classes                            String of classes that are applied to the top level div
 * @returns {React.Component}
 */
class Controls extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      animationInProgress: false
    };
  }

  triggerNextSlide (nextSlideIndex) {
    const { switchToNextSlide } = this.props;
    const { animationInProgress } = this.state;

    if (animationInProgress) return;
    this.setState({ animationInProgress: true });

    switchToNextSlide(nextSlideIndex);
    setTimeout(() => {
      this.setState({ animationInProgress: false });
    }, duration * 1000);
  };

  render () {
    const { activeSlideIndex } = this.props;

    return (
      <div className="carousel__arrows">
        <div
          className="carousel__arrows__prev"
          onClick={ () => this.triggerNextSlide(activeSlideIndex - 1) }
        ><span className="icon-arrow-left" /></div>

        <div
          className="carousel__arrows__next"
          onClick={ () => this.triggerNextSlide(activeSlideIndex + 1) }
        ><span className="icon-arrow-right" /></div>
      </div>
    );
  }
}

Controls.propTypes = {
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
 * @param {string} props.info                                 Determines whether or not this carousel has info blocks
 * @param {boolean} props.arrows                              Determines whether to show the arrows or not
 * @returns {React.Component}
 */
export function CarouselWithTabControls (props) {
  const { slideCollection, classes, arrows, activeSlideIndex, info } = props;

  const slides = slideCollection.map((slide, index) => (
    <SlideWithHorizontalSliding
      key={ index }
      index={ index }
      activeSlideIndex={ activeSlideIndex }
      slideCount={ slideCollection.length - 1 }
      duration={ duration }
      component={
        <div className="cf">
          <div className="carousel__slide carousel__slidewrap">
            <img
              src={ slide.img }
              className="carousel__slideimg"
              alt={ slide.label }
            />
          </div>
          { info &&
            <CarouselInfo { ...slide.info } />
          }
        </div>
      }
    />
  ));

  return (
    <Carousel
      { ...props }
      slides={ slides }
      controls={ arrows && <Controls /> }
      classes={ `${classes} carousel__arrowcontrols ${info ? 'carousel__withinfo' : ''}` }
    />
  );
}

const { array, string, bool, number } = React.PropTypes;
CarouselWithTabControls.propTypes = {
  slideCollection: array,
  classes: string,
  arrows: bool,
  activeSlideIndex: number,
  info: bool
};

CarouselWithTabControls.defaultProps = {
  classes: '',
  arrows: true
};

const mapStateToProps = (state, props) => ({
  activeSlideIndex: state.carousels.getIn([props.carouselID, 'index'])
});

export default connect(mapStateToProps)(CarouselWithTabControls);
