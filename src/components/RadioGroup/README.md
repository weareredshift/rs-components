# RadioGroup

The RadioGroup component creates a group of radio buttons and stores the selected value in the Redux store. The buttons can be given both values and separate names, as well as an optional "tag" displayed alongside the radio button and label. Additionally, an `afterCheck` callback can be passed, to execute additional arbitrary information right after the info is stored in Redux state.

> Note: Sample base styles located [here](./RadioGroup.scss).

```jsx
<RadioButton
  groupID="radio-fancy"
  items={ [
    { value: 'vader', label: 'My favorite Star Wars character is Darth Vader', tag: 'Baddie' },
    { value: 'luke', label: 'My favorite Star Wars character is Luke Skywalker', tag: 'Hero' },
    { value: 'han', label: 'My favorite Star Wars character is Han Solo', tag: 'Smuggler' }
  ] }
  afterCheck={ (item) => {
    alert('Selected item in console');
    console.log(item);
  } }
/>
```