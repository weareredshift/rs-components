/* eslint-disable no-alert, no-console */
import { validators } from 'components/BaseForm/utils';

export default {
  props: {
    fields: [
      [
        {
          stateKey: 'name',
          validator: validators.length(8)
        },
        {
          stateKey: 'email',
          validator: validators.email()
        }
      ],
      [
        {
          stateKey: 'password',
          type: 'password',
          validator: validators.presence()
        },
        {
          stateKey: 'passwordConfirmation',
          type: 'password',
          validator: validators.equalsField('password')
        }
      ],
      [
        {
          stateKey: 'message',
          type: 'textarea',
          startingValue: 'I already have some content!'
        }
      ]
    ],
    onSubmit: (attrs, setGlobalError) => {
      alert('Submitted successfully! Attrs in console');
      setGlobalError('This is an error resulting from form submission, just because I can!');
      console.log(attrs);
    },
    title: 'Example form',
    actions: [
      { label: 'Alert', action: () => { alert('You clicked me!'); } }
    ],
    note: 'I\'m a note that can be set'
  }
};
