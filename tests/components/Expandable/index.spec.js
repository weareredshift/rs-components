import React from 'react';
import { mount } from 'enzyme';
import Expandable from 'components/Expandable';
import SlideToggle from 'components/Animators/SlideToggle';

describe('(Component) Expandable', () => {
  let _wrapper;

  beforeEach(() => {
    _wrapper = mockComp(Expandable, {
      type: 'specs',
      children: () => <div>Child</div>,
      heading: 'Heading'
    });
  });

  describe('Expandable...', () => {
    it('should render all content except for a SlideToggle of children on load', () => {
      expect(_wrapper).to.have.state('open', false);
      expect(_wrapper.find(SlideToggle)).to.have.style('height', '0');
    });

    it('should expand on click with a click listener on its button', () => {
      _wrapper.find('button').simulate('click');
      expect(_wrapper).to.have.state('open', true);
    });

    it('should animate self if props.type == specs', () => {
      const mountedWrapper = mount(<Expandable { ...{
        type: 'specs',
        children: () => <div>Child</div>,
        heading: 'Heading'
      } } />);

      mountedWrapper.find('button').simulate('click');
      expect(mountedWrapper).to.have.ref('heading');
    });

    it('adds props.type to its HTML classes', () => {
      expect(_wrapper).to.have.className('specs');
    });

    it('places props.heading a span inside a button', () => {
      expect(_wrapper.find('span').first()).to.have.text('Heading');
    });

    it('has an expandable HTML class', () => {
      expect(_wrapper).to.have.className('expandable');
    });
  });
});
