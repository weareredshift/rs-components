import React from 'react';
import { Carousel } from 'components/Carousel';

describe('(Component) Carousel', () => {
  let _wrapper;
  const spy = sinon.spy();
  beforeEach(() => {
    _wrapper = mockComp(Carousel, {
      carouselID: 'carousel',
      autoplayInterval: 500,
      dispatch: spy,
      controls: (<div className="controls" />),
      slideCollection: [0, 1, 2, 3, 4, 5],
      slides: [
        <div className="slide">0</div>,
        <div className="slide">1</div>,
        <div className="slide">2</div>,
        <div className="slide">3</div>,
        <div className="slide">4</div>,
        <div className="slide">5</div>
      ],
      activeSlideIndex: 4
    });
  });

  describe('Carousel...', () => {
    it('should render divs with appropriate classes', () => {
      expect(_wrapper.type()).to.equal('div');
      expect(_wrapper).to.have.exactly(1).descendants('div.carousel');
      expect(_wrapper).to.have.exactly(1).descendants('div.carousel__controls');
    });

    it('should render all the slides', () => {
      expect(_wrapper.type()).to.equal('div');
      expect(_wrapper).to.have.exactly(6).descendants('.slide');
    });
  });
});
