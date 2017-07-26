import Immutable from 'immutable';

import ConnectedCheckbox, { Checkbox } from 'components/Checkbox';
import testComponent from 'support/testComponent';
import { assertObjectEquality } from 'support/assertions';

import { setCheckboxValue } from 'store/actions';

testComponent({
  name: 'Checkbox',
  connected: ConnectedCheckbox,
  unconnected: Checkbox,
  searchFor: 'label',
  props: {
    name: 'Imma box',
    boxID: 'box',
    checkboxes: Immutable.fromJS({})
  }
});

describe('<Checkbox />', () => {
  it('Dispatches correctly on click', () => {
    const dispatch = sinon.spy();
    const comp = mockComp(Checkbox, { boxID: 'test', name: 'Imma box', dispatch, checkboxes: Immutable.fromJS({}) });
    const input = comp.find('input');

    expect(dispatch.callCount).to.eq(0);

    expect(input.props().name).to.eq('Imma box');
    expect(input.props().checked).to.eq(undefined);

    input.simulate('change', { value: true });
    assertObjectEquality(
      dispatch.firstCall.args[0],
      setCheckboxValue('test', true)
    );
  });

  it('Gets its value from the Immutable checkboxes object', () => {
    const dispatch = sinon.spy();
    const comp = mockComp(Checkbox, { boxID: 'test', name: 'Imma box', dispatch, checkboxes: Immutable.fromJS({ test: true }) });
    const input = comp.find('input');

    expect(dispatch.callCount).to.eq(0);

    expect(input.props().name).to.eq('Imma box');
    expect(input.props().checked).to.eq(true);

    input.simulate('change', { value: false });
    assertObjectEquality(
      dispatch.firstCall.args[0],
      setCheckboxValue('test', false)
    );
  });
});
