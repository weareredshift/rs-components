import { LinkUC } from 'components/Link';
const Link = LinkUC;

describe('<Link />', () => {
  describe('internal', () => {
    describe('without a target prop', () => {
      let props, beforeGo;
      const goInternal = sinon.spy();

      beforeEach(() => {
        beforeGo = sinon.spy();
        props = { children: 'Click me', goInternal, to: '/some/location', beforeGo };
      });

      it('routes using goInternal', () => {
        const link = mockComp(Link, props);
        link.simulate('click', { preventDefault: () => {} });
        expect(goInternal.lastCall.args[0]).to.eq('/some/location');
        expect(beforeGo.lastCall.args[0]).to.eq(undefined);
      });

      it('passes along given data', () => {
        const link = mockComp(Link, Object.assign(props, { data: { blob: true } }));
        link.simulate('click', { preventDefault: () => {} });
        expect(goInternal.lastCall.args[0]).to.eql({
          pathname: '/some/location',
          state: {
            blob: true
          }
        });
        expect(beforeGo.lastCall.args[0]).to.eq(undefined);
      });
    });

    describe('with a target prop', () => {
      it('generates a link correctly', () => {
        const link = mockComp(Link, { children: 'Click me', to: '/some/location', target: '_blank' });
        expect(link.html()).to.eq('<a href="/some/location" class="link rscomp" target="_blank">Click me</a>');
      });
    });
  });

  describe('external', () => {
    it('generates a link with all props', () => {
      const link = mockComp(Link, {
        children: 'Click me',
        to: 'www.website.com/some/location',
        target: '_blank',
        className: 'extra',
        style: { margin: 'auto' }
      });
      expect(link.html()).to
        .eq('<a href="www.website.com/some/location" class="link rscomp extra" style="margin:auto;" target="_blank">Click me</a>');
    });
  });
});
