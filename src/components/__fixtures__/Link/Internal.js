/* eslint-disable no-alert, no-console */

const to = '/?component=Link&fixture=External&editor=true';
const data = { someStuff: 'isHere' };

export default {
  props: {
    to,
    data,
    className: 'special-class',
    beforeGo: () => {
      alert('Following link internally (fake). Path and data logged in console');
      console.log(to, data);
    }
  },
  children: 'Open internal link (not working in sandbox)!'
};
