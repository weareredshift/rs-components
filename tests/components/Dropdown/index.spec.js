import { fromJS } from 'immutable';
import { Dropdown } from 'components/Dropdown';
import UnconnectedDropdown from 'components/Dropdown/UnconnectedDropdown';

const onClick = sinon.spy();
const onTitleClick = sinon.spy();

describe('<Dropdown />', () => {
  it('renders an appropriate UnconnectedDropdown', () => {
    const comp = mockComp(Dropdown, {
      items: [
        {
          label: 'Label1',
          action: onClick
        },
        {
          label: 'Label2',
          action: onClick
        }
      ],
      title: 'Default title',
      onTitleClick,
      className: 'extra-class',
      dropID: 'testID',
      dropdowns: fromJS({
        testID: [{ index: 0, value: 'Label1' }]
      }),
      openDropdownID: 'testID',
      replaceTitle: true
    });

    const uncon = comp.find(UnconnectedDropdown).first();
    expect(uncon.props().items[0]).to.eql({
      label: 'Label1',
      action: onClick,
      isActive: true
    });

    expect(uncon.props().items[1]).to.eql({
      label: 'Label2',
      action: onClick,
      isActive: false
    });

    expect(uncon.props().open).to.eq(true);
  });
});
