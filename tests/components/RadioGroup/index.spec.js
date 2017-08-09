import { RadioGroupUC } from 'components/RadioGroup';
const RadioGroup = RadioGroupUC;
import assert from 'support/assert';

describe('<RadioGroup />', () => {
  it('Can be generated from an array of strings', () => {
    const onCheck = sinon.spy();
    const comp = mockComp(RadioGroup, { uid: 'test', items: ['One', 'Two'], onCheck });
    const ul = comp.find('ul');
    const li = ul.find('li').first();
    const li2 = ul.find('li').last();

    expect(onCheck.callCount).to.eq(0);

    expect(li.find('input').props().name).to.eq('test');
    expect(li.find('input').props().value).to.eq('One');

    li.simulate('click');
    assert.eq(
      onCheck.lastCall.args,
      [{ label: 'One', value: 'One', index: 0 }, 'test']
    );

    li2.simulate('click');
    assert.eq(
      onCheck.lastCall.args,
      [{ label: 'Two', value: 'Two', index: 1 }, 'test']
    );
  });

  it('Responds to value in Immutable radios', () => {
    const comp = mockComp(RadioGroup, { uid: 'test', items: ['One', 'Two'], selectedValue: 'Two', onCheck: noop });

    expect(comp.find('input').first().props().checked).to.eq(false);
    expect(comp.find('input').last().props().checked).to.eq(true);
  });
});
