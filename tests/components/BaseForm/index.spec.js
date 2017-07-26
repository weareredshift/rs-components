import { BaseForm } from 'components/BaseForm';
import validators from 'components/BaseForm/validators';
import FormInput from 'components/FormInput';

describe('<BaseForm />', () => {
  it('renders a FormInput for each field', () => {
    const onSubmit = sinon.spy();
    const comp = mockComp(
      BaseForm, {
        fields: [
          [
            { label: 'Full Name', stateKey: 'name' },
            { label: 'Password', stateKey: 'password', type: 'password' }
          ]
        ],
        onSubmit,
        breakpoint: {}
      }
    );
    const nameField = comp.find(FormInput).get(0);
    expect(nameField.props.label).to.eq('Full Name');
    expect(nameField.props.stateKey).to.eq('name');
    expect(nameField.props.type).to.eq('text');

    const passwordField = comp.find(FormInput).get(1);
    expect(passwordField.props.label).to.eq('Password');
    expect(passwordField.props.stateKey).to.eq('password');
    expect(passwordField.props.type).to.eq('password');
  });

  it('validates submissions', () => {
    const onSubmit = sinon.spy();
    const comp = mockComp(
      BaseForm, {
        fields: [
          [
            { label: 'Full Name', stateKey: 'name' },
            { label: 'Password', stateKey: 'password', type: 'password', validator: validators.presence() }
          ]
        ],
        onSubmit,
        breakpoint: {}
      }
    );

    const submit = comp.find('.btn').first();

    submit.props().onClick();
    expect(onSubmit.lastCall).to.eq(null);
    expect(comp.state().formErrors.password).to.eq('Password is required.');
    expect(comp.state().formErrors.name).to.eq(null);
    expect(comp.find('.form__error').first().text()).to.eq('*Password is required.');
  });

  it('shows a global error if given', () => {
    const comp = mockComp(
      BaseForm, {
        fields: [
          [
            { label: 'Full Name', stateKey: 'name' },
            { label: 'Password', stateKey: 'password', type: 'password', validator: validators.presence() }
          ]
        ],
        onSubmit: () => {},
        breakpoint: {},
        globalError: 'Something went wrong!'
      }
    );

    expect(comp.find('.form__error').first().text()).to.eq('Something went wrong!');
  });
});
