import { SlideWithVerticalSwipe } from 'components/Carousel/Slides/SlideWithVerticalSwipe';

describe('(Component) SlideWithVerticalSwipe', () => {
  let _wrapper;

  beforeEach(() => {
    _wrapper = mockComp(SlideWithVerticalSwipe, {
      img: 'path/to/img.jpg',
      content: {
        img: 'path/to/img2.jpg',
        title: 'Slide Title',
        copy: 'This is some slide copy'
      }
    });
  });

  describe('SlideWithVerticalSwipe...', () => {
    it('should render a single slide', () => {
      expect(_wrapper).to.have.exactly(1).descendants('div.carousel__slide');
    });

    it('should render the correct content copy', () => {
      expect(_wrapper.find('h3').text()).to.equal('Slide Title');
      expect(_wrapper.find('p').text()).to.equal('This is some slide copy');
    });
  });
});
