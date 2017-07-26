import { setClass } from 'utils/responsiveHelpers';

describe('responsiveHelpers', () => {
  const obj = { desktopLg: 'desktopLg', desktopMd: 'desktopMd', tabletLg: 'tabletLg' };
  describe('setClass', () => {
    it('returns the class string for given breakpoint if present', () => {
      expect(setClass(obj, { name: 'desktopLg' })).to.eq('desktopLg');
      expect(setClass(obj, { name: 'desktopMd' })).to.eq('desktopMd');
      expect(setClass(obj, { name: 'tabletLg' })).to.eq('tabletLg');
    });

    it('reaches up for higher breakpoint classes', () => {
      expect(setClass(obj, { name: 'desktopSm' })).to.eq('desktopMd');
      expect(setClass(obj, { name: 'tabletMd' })).to.eq('tabletLg');
      expect(setClass(obj, { name: 'mobileSm' })).to.eq('tabletLg');
    });

    it('fills in a default if nothing is found', () => {
      const noDefault = { tabletSm: 'tabletSm' };
      expect(setClass(noDefault, { name: 'tabletLg' })).to.eq('');
      expect(setClass(noDefault, { name: 'default' })).to.eq('');

      const objWithDefault = { tabletSm: 'tabletSm', default: 'default' };
      expect(setClass(objWithDefault, { name: 'tabletLg' })).to.eq('default');
      expect(setClass(objWithDefault, { name: 'default' })).to.eq('default');
    });

    it('throws an error if bad breakpoint type given', () => {
      expect(() => { setClass(obj, 'desktopLg'); }).to.throw(Error);
    });
  });
});
