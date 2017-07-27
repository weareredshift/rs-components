/* eslint-disable no-alert, no-console */

const to = 'https://www.google.com';

export default {
  props: {
    to,
    className: 'special-class',
    beforeGo: () => { alert('External link in new tab.'); },
    target: '_blank'
  },
  children: 'Open external link in new tab!'
};
