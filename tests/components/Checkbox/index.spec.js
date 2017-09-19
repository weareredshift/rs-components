import { CheckboxUC } from 'components/Checkbox';
const Checkbox = CheckboxUC;

describe('<Checkbox />', () => {
  it('Dispatches correctly on click', () => {
    const toggle = sinon.spy();
    const comp = mockComp(Checkbox, { uid: 'test', name: 'Imma box', toggle, checked: false });
    const input = comp.find('input');

    expect(toggle.callCount).to.eq(0);

    expect(input.props().name).to.eq('Imma box');
    expect(input.props().checked).to.eq(false);

    expect(toggle.firstCall).not.to.exist;
    comp.simulate('click');
    expect(toggle.firstCall).to.exist;
  });

  it('shows up as checked if set correctly', () => {
    const toggle = sinon.spy();
    const comp = mockComp(Checkbox, { uid: 'test', name: 'Imma box', toggle, checked: true });
    const input = comp.find('input');

    expect(input.props().name).to.eq('Imma box');
    expect(input.props().checked).to.eq(true);
  });
});
