const to = '/?component=Link&fixture=ExternalNewTab&editor=true';

export default {
  props: {
    to,
    className: 'special-class',
    beforeGo: () => { alert('Internal link in new tab.'); },
    target: '_blank'
  },
  children: 'Open internal link in new tab!'
};
