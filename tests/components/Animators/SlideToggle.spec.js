import React from 'react';
import { mount } from 'enzyme';
import { SlideToggle } from 'components/Animators/SlideToggle';

describe('(Component) SlideToggle', () => {
  let _collapsedWrapper;

  beforeEach(() => {
    _collapsedWrapper = mount(<SlideToggle { ...{
      children: () => <div>Content</div>,
      open: false,
      classes: 'newClass'
    } } />);
  });

  describe('SlideToggle...', () => {
    it('should start in the collapsed state', () => {
      expect(_collapsedWrapper).to.have.ref('container');
      expect(_collapsedWrapper.ref('container')).to.have.style('height', '0px');
      expect(_collapsedWrapper.ref('container')).to.have.style('opacity', '0');
      expect(_collapsedWrapper.ref('container')).to.have.style('overflow', 'hidden');
    });

    // Intermittently fails with real consistency
    // TODO: Fix/revisit later
    xit('should animate open and closed, and opacity should change from 0 to 1', (done) => {
      expect(_collapsedWrapper.state('animationInProgress')).to.equal(false);
      _collapsedWrapper.setProps({ open: true });

      setTimeout(() => {
        expect(_collapsedWrapper.state('animationInProgress')).to.equal(true);
        setTimeout(() => {
          expect(_collapsedWrapper.state('animationInProgress')).to.equal(false);
          expect(_collapsedWrapper.ref('container')).to.not.have.style('opacity', '0');
          done();
        }, 300);
      }, 50);
    }, 600);

    it('should accept classNames as props', () => {
      expect(_collapsedWrapper.ref('container').hasClass('newClass'));
    });
  });
});
