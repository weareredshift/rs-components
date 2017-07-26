import React from 'react';
import { connect } from 'react-redux';
import SlideWithVerticalSwipe from './Slides/SlideWithVerticalSwipe';
import Carousel from 'components/Carousel';
import Watcher from 'components/Watcher';
import { onScroll, disableScroll, getScrollDirection, enableScroll } from 'utils/scrollJack';
import { setCarouselIndex } from 'store/actions';
import { breakpointIsGreaterThan, breakpoints } from 'utils/responsiveHelpers';
import './CarouselWithVerticalSwipe.scss';

/**
 * Bullet controls for carousel
 * @param {Object} props                                      React props
 * @param {Object[]} props.slideCollection                    Array of objects containing information about each slide
 * @param {string} props.slideCollection[].img                Img src for the slide
 * @param {Object} props.slideCollection[].content            Content object that contains props for describing the CTA box.
 * @param {string} props.slideCollection[].content.img        Src for image icon that appears at the top of the cta box.
 * @param {string} props.slideCollection[].content.title      Title that appears below the image icon in the cta box.
 * @param {string} props.slideCollection[].content.copy       Paragraph of text that appears below the title and image in the cta box
 * @param {Function} props.switchToNextSlide                  Function that switches activeSlide to passed index
 * @param {number} props.activeSlideIndex                     The index of the currently active slide
 * @param {Function} props.dispatch                           Redux dispatch function
 * @returns {React.Component}
 */
function Controls (props) {
  const { slideCollection, activeSlideIndex, switchToNextSlide } = props;
  return (
    <ul className="carousel__bullets">
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
            onClick={ () => switchToNextSlide(index) }
            className={ activeIndex === index ? 'is-active' : '' }
          />
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
 * Full screen carousel with vertical swipe controls
 * @param {Object} props                                      React props
 * @param {Object[]} props.slideCollection                    Array of objects containing information about each slide
 * @param {string} props.slideCollection[].img                Img src for the slide
 * @param {Object} props.slideCollection[].content            Content object that contains props for describing the CTA box.
 * @param {string} props.slideCollection[].content.img        Src for image icon that appears at the top of the cta box.
 * @param {string} props.slideCollection[].content.title      Title that appears below the image icon in the cta box.
 * @param {string} props.slideCollection[].content.copy       Paragraph of text that appears below the title and image in the cta box
 * @param {string} props.carouselID                           String defining this specific carousel
 * @param {number} props.activeSlideIndex                     The index of the currently active slide
 * @param {Function} props.dispatch                           Redux dispatch function
 * @returns {React.Component}
 */
export class CarouselWithVerticalSwipe extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      carouselHasBeenEngaged: false,
      carouselEngaged: false,
      scrollDirection: null
    };
  }

  componentDidMount () {
    const { dispatch, carouselID } = this.props;

    onScroll(50, (event) => this.scrollHandler(event));
    dispatch(setCarouselIndex(carouselID, 0));
    // this.carousel.addEventListener('onwheel', this.scrollHandler);
  }

  componentWillUnmount () {
    enableScroll();
  }

  scrollHandler (event) {
    const { breakpoint } = this.props;
    const { carouselEngaged } = this.state;
    const { tabletMd } = breakpoints;

    if (carouselEngaged && breakpointIsGreaterThan(tabletMd, breakpoint.size)) {
      this.setState({ scrollDirection: getScrollDirection(event) });

      if (getScrollDirection(event) === 'down') {
        this.scrollToNextSlide();
      } else if (getScrollDirection(event) === 'up') {
        this.scrollToPrevSlide();
      }
    } else { return; }
  }

  scrollToPrevSlide () {
    const { carouselID, activeSlideIndex, dispatch } = this.props;

    if (activeSlideIndex === 0) {
      this.escapeScrollTrap();
    } else {
      dispatch(setCarouselIndex(carouselID, activeSlideIndex - 1));
    }
  }

  scrollToNextSlide () {
    const { carouselID, activeSlideIndex, dispatch, slideCollection } = this.props;

    if (activeSlideIndex === slideCollection.length - 1) {
      this.escapeScrollTrap();
    } else {
      dispatch(setCarouselIndex(carouselID, activeSlideIndex + 1));
    }
  }

  escapeScrollTrap () {
    enableScroll();
    this.setState({ carouselEngaged: false, carouselHasBeenEngaged: true });
    this.carousel.style.position = 'relative';
  }

  componentDidUpdate (prevProps, prevState) {
    const { breakpoint } = this.props;
    const { tabletMd } = breakpoints;

    if (breakpointIsGreaterThan(tabletMd, breakpoint.size) && !prevState.carouselEngaged && this.state.carouselEngaged) {
      disableScroll();
      this.carousel.style.position = 'fixed';
      this.carousel.style.top = 0;
      this.carousel.style.left = 0;
    }
  }

  watcherCallback (watcher) {
    if (watcher.isAboveViewport) {
      const { carouselHasBeenEngaged } = this.state;

      // watcher is in view
      if (!carouselHasBeenEngaged) {
        this.setState({ carouselEngaged: true });
      }
    }
  };

  render () {
    const { slideCollection, activeSlideIndex } = this.props;
    const { scrollDirection } = this.state;

    const slides = slideCollection.map((slide, index) => (
      <SlideWithVerticalSwipe
        { ...slide }
        scrollDirection={ scrollDirection }
        key={ index }
        activeSlideIndex={ activeSlideIndex }
        index={ index }
      />
    ));

    return (
      <div ref={ (el) => { this.carousel = el; } } className="carousel__verticalswipe">
        <div className="row">
          <Watcher
            offset={ { top: '-7vh' } }
            enterViewport={ (watcher) => this.watcherCallback(watcher) }
            stateChange={ (watcher) => this.watcherCallback(watcher) }
          />
          <Carousel
            { ...this.props }
            slides={ slides }
            controls={ <Controls /> }
          />
        </div>
      </div>
    );
  }
}

CarouselWithVerticalSwipe.propTypes = {
  slideCollection: React.PropTypes.array,
  activeSlideIndex: React.PropTypes.number,
  carouselID: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  breakpoint: React.PropTypes.object
};

const mapStateToProps = (state, props) => ({
  activeSlideIndex: state.carousels.getIn([props.carouselID, 'index']),
  breakpoint: state.breakpoint
});

export default connect(mapStateToProps)(CarouselWithVerticalSwipe);
