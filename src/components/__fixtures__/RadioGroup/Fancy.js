export default {
  props: {
    uid: 'radio-fancy',
    items: [
      { value: 'vader', label: 'My favorite Star Wars character is Darth Vader', tag: 'Baddie' },
      { value: 'luke', label: 'My favorite Star Wars character is Luke Skywalker', tag: 'Hero' },
      { value: 'han', label: 'My favorite Star Wars character is Han Solo', tag: 'Smuggler' }
    ],
    afterCheck: (item) => {
      alert('Selected item in console');
      console.log(item);
    }
  }
};
