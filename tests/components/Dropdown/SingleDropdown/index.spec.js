import ConnectedSingleDropdown, { SingleDropdown } from 'components/Dropdown/SingleDropdown';
import Dropdown from 'components/Dropdown';
import testComponent from 'support/testComponent';
import { assertObjectEquality } from 'support/assertions';

import { setDropdownValues, setOpenDropdownID } from 'store/actions';

testComponent({
  name: 'SingleDropdown',
  connected: ConnectedSingleDropdown,
  unconnected: SingleDropdown,
  searchFor: Dropdown,
  props: {
    items: [],
    dropID: 'test'
  }
});

describe('<SingleDropdown />', () => {
  it('Passes items correctly', () => {
    const dispatch = sinon.spy();
    const comp = mockComp(SingleDropdown, { dropID: 'test', items: ['One', 'Two'], dispatch });
    const drop = comp.find(Dropdown);
    drop.props().items[0].action([{ value: comp.props().items[0], index: 1 }]);

    assertObjectEquality(
      dispatch.firstCall.args[0],
      setOpenDropdownID(null)
    );

    assertObjectEquality(
      dispatch.secondCall.args[0],
      setDropdownValues('test', [{ index: 1, value: 'One' }])
    );
  });
});
