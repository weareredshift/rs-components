import React from 'react';
import { setCarouselIndex } from 'store/actions';
import { connect } from 'react-redux';
import './Carousel.scss';

let autoplay;

function wrapInd (val, length) {
  val = val % length;
  if (val < 0) val = length + val;
  return val;
}

/**
 * Returns a function for dispatching the next carousel index
 *
 * @param {Object} props
 * @param      {string}    carouselID       The carousel id
 * @param      {Function}  dispatch         The dispatch
 * @param      {Object[]}  slideCollection  The slide collection
 * @return     {Function}  Dispatches next index for carousel
 */
export function currySwitchToNextSlide (carouselID, dispatch, slideCollection) {
  return function (index, pause = false) {
    dispatch(setCarouselIndex(carouselID, wrapInd(index, slideCollection.length)));
    if (pause) clearInterval(autoplay);
  };
}

/**
 * Base carousel component that controls basic functionality
 * @param {Object} props                                React props
 * @param {Object[]} props.slideCollection              Array of objects containing information about each slide, unique to carousel type
 *                                                      (detailed documentation located in the components for each carousel)
 * @param {string} props.carouselID                     String defining this specific carousel
 * @param {number} props.activeSlideIndex               The index of the currently active slide
 * @param {number} [props.autoplay]                     Duration in milliseconds of autoplay interval. If undefined, the carousel
 *                                                      does not autoplay.
 * @param {Object} [props.controls]                     React node that houses carousel controls, passed and defined in each unique
 *                                                      carousel component.
 * @param {Array} props.slides                          Array of React nodes that houses processed jsx for each slide
 * @param {number} [props.startingSlideIndex]           Optional number declaring the 1st active slide, defaults to 0
 * @param {string} [props.classes]                      String of classes that are applied to the top level div
 * @param {Function} props.dispatch                     Redux dispatch function
 * @param {number} props.delay                          Optional delay, in milliseconds
 * @returns {React.Component}
 */
export class Carousel extends React.Component {
  constructor (props) {
    super(props);
    const { autoplayInterval, delay } = props;

    if (autoplayInterval) {
      this.delay = setTimeout(() => {
        this.startAutoplay(autoplayInterval);
      }, delay || 0);
    }
  }

  startAutoplay (interval) {
    autoplay = setInterval(() => {
      this.swapSlideDuringAutoplay();
    }, interval);
  }

  componentDidMount () {
    const { startingSlideIndex } = this.props;
    this.switchToNextSlide(startingSlideIndex);
  }

  swapSlideDuringAutoplay () {
    const { activeSlideIndex, slideCollection } = this.props;
    this.switchToNextSlide(Math.abs((activeSlideIndex + 1) % slideCollection.length));
  }

  switchToNextSlide (index, pause = false) {
    const { carouselID, dispatch, slideCollection } = this.props;
    currySwitchToNextSlide(carouselID, dispatch, slideCollection)(index, pause);
  }

  componentWillUnmount () {
    const { delay } = this.props;
    if (autoplay) clearInterval(autoplay);
    if (delay) clearTimeout(this.delay);
  }

  render () {
    const { slideCollection, activeSlideIndex, controls, slides, classes, controlClass } = this.props;

    return (
      <div className={ `carousel ${classes}` }>
        <div className="carousel__viewport">
          { slides }
        </div>

        { controls &&
          <div className={ 'carousel__controls col-center theme--dark '.concat(controlClass) }>
            { React.cloneElement(controls, {
              switchToNextSlide: (index, pause) => this.switchToNextSlide(index, pause),
              slideCollection,
              activeSlideIndex
            }) }
          </div>
        }
      </div>
    );
  }
}

const { string, array, number, func, node } = React.PropTypes;
Carousel.propTypes = {
  slideCollection: array.isRequired,
  activeSlideIndex: number.isRequired,
  carouselID: string.isRequired,
  dispatch: func,
  autoplayInterval: number,
  controls: node,
  slides: array.isRequired,
  classes: string,
  controlClass: string,
  startingSlideIndex: number,
  delay: number
};

Carousel.defaultProps = {
  classes: '',
  activeSlideIndex: 0,
  controlClass: 'col-17',
  startingSlideIndex: 0
};

const mapStateToProps = (state, props) => ({
  activeSlideIndex: state.carousels.getIn([props.carouselID, 'index'])
});

export default connect(mapStateToProps)(Carousel);
