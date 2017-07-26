import { QuantityEditor } from 'components/QuantityEditor';

let comp;
let onChange;

describe('<QuantityEditor />', () => {
  beforeEach(() => {
    onChange = sinon.spy();

    comp = mockComp(QuantityEditor, {
      quantity: 2,
      onChange
    });
  });

  it('renders a quantity selector given a quantity', () => {
    expect(comp).to.have.exactly(1).descendants('div.quantityeditor');
    expect(comp).to.have.exactly(2).descendants('span');
  });

  it('calls the given function correctly when increment/decrement buttons are clicked', () => {
    expect(onChange.callCount).to.eq(0);
    comp.find('span').first().simulate('click');
    expect(onChange.callCount).to.eq(1);
    expect(onChange.lastCall.args).to.eql([1, 'decrement']);
    comp.find('span').last().simulate('click');
    expect(onChange.callCount).to.eq(2);
    expect(onChange.lastCall.args).to.eql([3, 'increment']);
  });
});
