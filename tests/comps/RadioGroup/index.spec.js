import Immutable from 'immutable';

import ConnectedRadioGroup, { RadioGroup } from 'components/RadioGroup';
import testComponent from 'support/testComponent';
import { assertObjectEquality } from 'support/assertions';

import { setRadioValue } from 'store/actions';

testComponent({
  name: 'RadioGroup',
  connected: ConnectedRadioGroup,
  unconnected: RadioGroup,
  searchFor: 'ul',
  props: {
    items: [],
    groupID: 'radio',
    radios: Immutable.fromJS({})
  }
});

describe('<RadioGroup />', () => {
  it('Can be generated from an array of strings', () => {
    const dispatch = sinon.spy();
    const comp = mockComp(RadioGroup, { groupID: 'test', items: ['One', 'Two'], dispatch, radios: Immutable.fromJS({}) });
    const ul = comp.find('ul');
    const li = ul.find('li').first();
    const li2 = ul.find('li').last();

    expect(dispatch.callCount).to.eq(0);

    expect(li.find('input').props().name).to.eq('test');
    expect(li.find('input').props().value).to.eq('One');

    li.simulate('click');
    assertObjectEquality(
      dispatch.firstCall.args[0],
      setRadioValue('test', { label: 'One', value: 'One', index: 0 })
    );

    li2.simulate('click');
    assertObjectEquality(
      dispatch.secondCall.args[0],
      setRadioValue('test', { label: 'Two', value: 'Two', index: 1 })
    );
  });

  it('Responds to value in Immutable radios', () => {
    const radios = { test: { value: 'Two' } };
    const comp = mockComp(RadioGroup, { groupID: 'test', items: ['One', 'Two'], radios: Immutable.fromJS(radios) });

    expect(comp.find('input').first().props().checked).to.eq(false);
    expect(comp.find('input').last().props().checked).to.eq(true);
  });
});
