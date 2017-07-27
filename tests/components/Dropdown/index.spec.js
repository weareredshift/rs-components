import assert from 'support/assert';

import { DropdownUC } from 'components/Dropdown';
const Dropdown = DropdownUC; // Use unconnected version in test

const drop = (addProps = {}) => {
  const props = Object.assign({
    items: [
      'Label1',
      'Label2'
    ],
    title: 'Default title',
    className: 'extra-class',
    dropID: 'testID',
    selectedIndices: [],
    replaceTitle: true,
    onItemClick: () => {},
    onTitleClick: () => {}
  }, addProps);

  return mockComp(Dropdown, props);
};

describe('<Dropdown />', () => {
  describe('with string items', () => {
    it('displays correctly when closed', () => {
      const closed = drop();

      expect(closed.find('.dropdown.rs-comp').first()).to.exist;
      expect(closed.find('.dropdown__menu').length).to.eq(0);
      expect(closed.find('.dropdown__title').first().text()).to.eq('Default title');
    });

    it('displays correctly when closed with selected item', () => {
      const closed = drop({ selectedIndices: [0] });

      expect(closed.find('.dropdown.rs-comp').first()).to.exist;
      expect(closed.find('.dropdown__menu').length).to.eq(0);
      expect(closed.find('.dropdown__title').first().text()).to.eq('Label1');
    });

    it('displays correctly when opened', () => {
      const open = drop({ open: true });

      expect(open.find('.dropdown.rs-comp').first()).to.exist;
      expect(open.find('.dropdown__menu').length).to.eq(1);
      const menu = open.find('.dropdown__menu').first();
      assert.arrEq(
        menu.find('li.dropdown__item').map(li => li.props().children),
        ['Label1', 'Label2']
      );

      expect(menu.find('li.dropdown__item').first().props().className.includes('is-active')).to.eq(false);
    });

    it('displays correctly when opened with an item selected', () => {
      const open = drop({ open: true, selectedIndices: [0] });

      expect(open.find('.dropdown.rs-comp').first()).to.exist;
      expect(open.find('.dropdown__menu').length).to.eq(1);
      const menu = open.find('.dropdown__menu').first();

      assert.arrEq(
        menu.find('li.dropdown__item').map(li => li.props().children),
        ['Label1', 'Label2']
      );

      expect(menu.find('li.dropdown__item').first().props().className.includes('is-active')).to.eq(true);
    });
  });

  describe('with object items', () => {
    it('can include className additions', () => {
      const open = drop({ open: true, selectedIndices: [0], items: [{ value: 'Label1', className: 'fancy' }] });

      expect(open.find('.dropdown.rs-comp').first()).to.exist;
      expect(open.find('.dropdown__menu').length).to.eq(1);
      const menu = open.find('.dropdown__menu').first();

      assert.arrEq(
        menu.find('li.dropdown__item').map(li => li.props().children),
        ['Label1']
      );

      expect(menu.find('li.dropdown__item').first().props().className.includes('is-active')).to.eq(true);
      expect(menu.find('li.dropdown__item').first().props().className.includes('fancy')).to.eq(true);
    });
  });

  describe('replaceTitle logic', () => {
    it('replaces the title if true and single select', () => {
      const otherTitle = drop({ selectedIndices: [0] }); // Defaults replaceTitle to true
      expect(otherTitle.find('.dropdown__title').first().text()).to.eq('Label1');
    });

    it('does not replace the title without replaceTitle true', () => {
      const noReplace = drop({ selectedIndices: [0], replaceTitle: false });
      expect(noReplace.find('.dropdown__title').first().text()).to.eq('Default title');
    });

    it('does not replace the title with multipleSelect true', () => {
      const mult = drop({ selectedIndices: [0], multipleSelect: true });
      expect(mult.find('.dropdown__title').first().text()).to.eq('Default title');
    });
  });

  describe('click logic', () => {
    it('calls onTitleClick on title click', () => {
      const onTitleClick = sinon.spy();
      const comp = drop({ onTitleClick });

      comp.find('.dropdown__toggle').first().simulate('click');
      expect(onTitleClick.callCount).to.eq(1);
    });

    it('calls onTitleClick on title click', () => {
      const onTitleClick = sinon.spy();
      const comp = drop({ onTitleClick });

      comp.find('.dropdown__toggle').first().simulate('click');
      expect(onTitleClick.callCount).to.eq(1);
    });

    it('calls onItemClick on item click', () => {
      const onItemClick = sinon.spy();
      const comp = drop({ onItemClick, open: true });

      comp.find('.dropdown__item').first().simulate('click');
      expect(onItemClick.callCount).to.eq(1);
    });
  });
});
