import React from 'react';
import { SlideWithCrossfade } from 'components/Carousel/Slides/SlideWithCrossfade';
import { SlideWithHorizontalSliding } from 'components/Carousel/Slides/SlideWithHorizontalSliding';
import { SlideWithVerticalSwipe } from 'components/Carousel/Slides/SlideWithVerticalSwipe';

describe('Carousel Slides', () => {
  it('Crossfade displays as active if the index matches', () => {
    const active = mockComp(SlideWithCrossfade, {
      activeSlideIndex: 0,
      index: 0,
      children: <div />
    });

    const inactive = mockComp(SlideWithCrossfade, {
      activeSlideIndex: 0,
      index: 1,
      children: <div />
    });

    expect(active.hasClass('is-active')).to.eq(true);
    expect(inactive.hasClass('is-active')).to.eq(false);
  });

  it('Horizontal displays if the index matches', () => {
    const active = mockComp(SlideWithHorizontalSliding, {
      activeSlideIndex: 0,
      index: 0,
      children: <div />
    });

    const inactive = mockComp(SlideWithHorizontalSliding, {
      activeSlideIndex: 0,
      index: 1,
      children: <div />
    });

    expect(active.props().style.zIndex).to.eq(2);
    expect(inactive.props().style.zIndex).to.eq(1);
  });

  it('Vertical displays if the index matches', () => {
    const active = mockComp(SlideWithVerticalSwipe, {
      activeSlideIndex: 0,
      index: 0,
      content: {}
    });

    const inactive = mockComp(SlideWithVerticalSwipe, {
      activeSlideIndex: 0,
      index: 1,
      content: {}
    });

    expect(active.props().style.zIndex).to.eq(3);
    expect(inactive.props().style.zIndex).to.eq(0);
  });
});
