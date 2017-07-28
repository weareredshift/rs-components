const to = 'https://www.google.com';

export default {
  props: {
    to,
    className: 'special-class',
    beforeGo: () => { alert('Following link to Google (fake).'); }
  },
  children: 'Open external link (not working in sandbox)!'
};
