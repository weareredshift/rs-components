import { CarouselWithTabControls } from 'components/Carousel/CarouselWithTabControls';
import Carousel from 'components/Carousel';

describe('(Component) CarouselWithTabControls', () => {
  let _wrapper;

  beforeEach(() => {
    const dispatchSpy = sinon.spy();

    _wrapper = mockComp(CarouselWithTabControls, {
      dispatch: dispatchSpy,
      slideCollection: [
        {
          img: 'path/to/img1',
          label: 'Label1',
          icon: 'icon1'
        },
        {
          img: 'path/to/img2',
          label: 'Label2',
          icon: 'icon2'
        }
      ]
    });
  });

  describe('CarouselWithTabControls...', () => {
    it('should render a carousel component', () => {
      expect(_wrapper).to.have.exactly(1).descendants(Carousel);
    });
  });
});
