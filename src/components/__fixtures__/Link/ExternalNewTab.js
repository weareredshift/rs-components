export default {
  props: {
    to: 'https://www.google.com',
    className: 'special-class',
    beforeGo: () => { alert('External link in new tab.'); },
    target: '_blank'
  },
  children: 'Open external link in new tab!'
};
