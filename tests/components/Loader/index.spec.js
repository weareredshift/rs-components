import { LoaderUC } from 'components/Loader';

describe('<Loader />', () => {
  it('adds and removes class at determined rate', (done) => {
    const comp = mockComp(LoaderUC, { children: 'Here', speed: 100, className: 'other' });
    const find = (c) => c.find('.loader').first();

    expect(find(comp).hasClass('other')).to.eq(true);
    expect(find(comp).hasClass('loader--off')).to.eq(false);

    setTimeout(() => {
      const c = find(comp);
      expect(c.hasClass('other')).to.eq(true);
      expect(c.hasClass('loader--off')).to.eq(true);
    }, 150);

    setTimeout(() => {
      const c = find(comp);
      expect(c.hasClass('other')).to.eq(true);
      expect(c.hasClass('loader--off')).to.eq(false);
      done();
    }, 250);
  });
});
