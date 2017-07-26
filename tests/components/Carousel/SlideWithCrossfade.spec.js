import React from 'react';
import { SlideWithCrossfade } from 'components/Carousel/Slides/SlideWithCrossfade';

describe('(Component) SlideWithCrossfade', () => {
  let _wrapper;

  beforeEach(() => {
    _wrapper = mockComp(SlideWithCrossfade, {
      component: <div className="slide">Slide</div>
    });
  });

  describe('SlideWithCrossfade...', () => {
    it('should render a single slide', () => {
      expect(_wrapper).to.have.exactly(1).descendants('div.carousel__slide');
    });

    it('should render the component prop as a child element', () => {
      expect(_wrapper.find('.slide').text()).to.equal('Slide');
    });
  });
});
