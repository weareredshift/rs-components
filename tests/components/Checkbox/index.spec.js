import Immutable from 'immutable';

import { CheckboxUC } from 'components/Checkbox';
const Checkbox = CheckboxUC;

import assert from 'support/assert';
import { setCheckboxValue } from 'components/Checkbox/actions';

describe('<Checkbox />', () => {
  it('Dispatches correctly on click', () => {
    const dispatch = sinon.spy();
    const comp = mockComp(Checkbox, { boxID: 'test', name: 'Imma box', dispatch, checkboxes: Immutable.fromJS({}) });
    const input = comp.find('input');

    expect(dispatch.callCount).to.eq(0);

    expect(input.props().name).to.eq('Imma box');
    expect(input.props().checked).to.eq(undefined);

    input.simulate('change', { value: true });
    assert.objEq(
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
    assert.objEq(
      dispatch.firstCall.args[0],
      setCheckboxValue('test', false)
    );
  });
});
