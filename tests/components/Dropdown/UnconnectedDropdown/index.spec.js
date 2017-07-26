import React from 'react';
import { shallow, mount } from 'enzyme';

import { UnconnectedDropdown } from 'components/Dropdown/UnconnectedDropdown';

const itemClick = sinon.spy();
const onTitleClick = sinon.spy();

const defaultItems = [
  { label: 'First', value: 'first', action: itemClick },
  { label: 'Second', value: 'second', action: itemClick },
  { label: 'Third', value: 'third', action: itemClick }
];

const dropdownComponent = (props = {}) => {
  const finalProps = Object.assign({
    items: defaultItems,
    title: 'Default Title',
    onTitleClick,
    open: true
  }, props);

  return (<UnconnectedDropdown { ...finalProps } />);
};

describe('<UnconnectedDropdown />', () => {
  it('It renders the appropriate number of items, and passes on props', () => {
    const dropdown = shallow(dropdownComponent());
    const itemLength = dropdown.find('li').length;
    expect(itemLength).to.eq(3);
  });

  it('Clicking an item calls the given action with its index and value', () => {
    const dropdown = mount(dropdownComponent());
    const item = dropdown.find('li').first();

    item.simulate('click');

    expect(itemClick.lastCall.args[0]).to.eql([{ index: 0, value: 'first' }]);
  });

  it('Clicking title calls the onTitleClick function', () => {
    const dropdown = shallow(dropdownComponent());

    dropdown.find('.dropdown__toggle').first().simulate('click');
    expect(onTitleClick.called).to.eq(true);
  });
});
