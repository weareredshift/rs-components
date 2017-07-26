import { assertObjectEquality } from 'support/assertions';

import FormInput from 'components/FormInput';
import validators from 'components/BaseForm/validators';

describe('<FormInput />', () => {
  it('Renders the correct HTML and fires events properly', () => {
    const setParentState = sinon.spy();
    const baseProps = { setParentState, parentState: { formErrors: {} }, label: 'Whatever', labelType: 'label', type: 'whatever-type', stateKey: 'whatever' };
    const comp = mockComp(FormInput, baseProps);

    expect(comp.find('label').exists()).to.eq(true);
    expect(comp.find('label').text()).to.eq('Whatever');

    expect(comp.find('input').exists()).to.eq(true);
    expect(comp.find('input').props().type).to.eq('whatever-type');

    comp.find('input').simulate('change', { target: { value: 'someContent' } });
    expect(setParentState.lastCall.args[0]).to.eql({
      whatever: 'someContent'
    });
  });

  it('Can take a validator function, which controls error classes and passes errors up', () => {
    const setParentState = sinon.spy();
    const baseProps = { setParentState, parentState: { formErrors: {} }, label: 'Whatever', labelType: 'label', type: 'email', stateKey: 'email', validator: validators.email(), reportErrorImmediately: true };
    const comp = mockComp(FormInput, baseProps);

    expect(comp.find('label').exists()).to.eq(true);
    expect(comp.find('label').text()).to.eq('Whatever');

    expect(comp.find('input').exists()).to.eq(true);
    expect(comp.find('input').props().type).to.eq('email');

    comp.find('input').simulate('change', { target: { value: 'someContent' } });

    assertObjectEquality(setParentState.lastCall.args[0], {
      email: 'someContent',
      formErrors: {
        email: 'That whatever doesn\'t look right.'
      }
    });
  });

  it('Validates length correctly', () => {
    const setParentState = sinon.spy();
    const baseProps = { setParentState, parentState: { formErrors: {} }, label: 'Whatever', labelType: 'label', type: 'email', stateKey: 'email', validator: validators.length(40), reportErrorImmediately: true };
    const comp = mockComp(FormInput, baseProps);

    expect(comp.find('label').exists()).to.eq(true);
    expect(comp.find('label').text()).to.eq('Whatever');

    expect(comp.find('input').exists()).to.eq(true);
    expect(comp.find('input').props().type).to.eq('email');

    comp.find('input').simulate('change', { target: { value: 'someContent' } });

    expect(setParentState.lastCall.args[0]).to.eql({
      email: 'someContent',
      formErrors: {
        email: 'Whatever must be 40 or more characters.'
      }
    });

    const comp2 = mockComp(FormInput, Object.assign(baseProps, { validator: validators.length(2) }));

    comp2.find('input').simulate('change', { target: { value: 'someContent' } });
    expect(setParentState.lastCall.args[0]).to.eql({
      email: 'someContent',
      formErrors: {
        email: null
      }
    });
  });

  it('displays errors in styles', () => {
    const setParentState = sinon.spy();
    const baseProps = { setParentState, parentState: { formErrors: { email: 'Error!' } }, label: 'Whatever', labelType: 'label', type: 'email', stateKey: 'email' };
    const comp = mockComp(FormInput, baseProps);

    expect(comp.find('label').exists()).to.eq(true);
    expect(comp.find('label').text()).to.eq('Whatever');

    expect(comp.find('input').exists()).to.eq(true);
    expect(comp.find('input').hasClass('has-error')).to.eq(true);
  });
});
