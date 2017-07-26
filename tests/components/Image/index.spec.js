import { Image } from 'components/Image';

describe('<Image />', () => {
  const img = comp => comp.find('img').first();

  it('does not apply loadedClass if show is false, even if image is loaded', () => {
    const comp = mockComp(Image, { show: false, loadedClass: 'loaded' });

    expect(comp.state('loaded')).to.eq(false);

    img(comp).props().onLoad();
    expect(comp.state('loaded')).to.eq(true);

    expect(img(comp).props().className.indexOf('loaded')).to.eq(-1);
  });

  it('applies loadedClass if image is loaded and show is true', () => {
    const comp = mockComp(Image, { show: true, loadedClass: 'loaded' });

    expect(comp.state('loaded')).to.eq(false);
    expect(img(comp).props().className.indexOf('loaded')).to.eq(-1);

    img(comp).props().onLoad();
    expect(comp.state('loaded')).to.eq(true);

    expect(img(comp).props().className.indexOf('loaded')).not.to.eq(-1);
  });
});
