import { FlashUC } from 'components/Flash';

describe('<Flash />', () => {
  describe('with no message given', () => {
    it('starts off', () => {
      const comp = mockComp(FlashUC);
      expect(comp.state().status).to.eq('off');
      expect(comp.find('.flash').first().props().className.includes('flash--off')).to.eq(true);
    });
  });

  describe('with message', () => {
    it('starts on and displays correctly', (done) => {
      const comp = mockComp(FlashUC, { message: 'Here', type: 'note', duration: 50, className: 'bonus' });
      expect(comp.state().status).to.eq('on');
      const flash = comp.find('.flash').first();

      expect(flash.props().className.includes('flash--on')).to.eq(true);
      expect(flash.props().className.includes('flash--off')).to.eq(false);
      expect(flash.props().className.includes('bonus')).to.eq(true);
      expect(flash.props().className.includes('flash--note')).to.eq(true);

      expect(flash.text()).to.eq('Here');

      // Test auto-hide timeout
      setTimeout(() => {
        const reloadedFlash = comp.find('.flash').first();
        expect(reloadedFlash.props().className.includes('flash--on')).to.eq(false);
        expect(reloadedFlash.props().className.includes('flash--off')).to.eq(true);
        done();
      }, 60);
    });
  });
});
