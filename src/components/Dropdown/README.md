# Dropdown

The Dropdown component renders a Dropdown for users to choose values from, which are stored in Redux state.

> Note: Sample base styles located [here](./Dropdown.scss).

Below is a simple Dropdown example:

```jsx
<Dropdown
  uid="simple"
  items={ [
    'Item 1',
    'Item 2',
    'Item 3'
  ] }
/>
```

The above will produce a drodown with three options. When the title is clicked, the dropdown will open, and when it's clicked again or an item is chosen, the dropdown will close. The title will reflect the selected item, or fall back to the default: "Select one". Both the index of the chosen item and the value of the choice will be stored as the only item in the array of choices in the Redux `dropdowns` object.

Here's a more complex dropdown example, using objects instead of strings as items.

> The value to this is limited, but this syntax allows for different on-click behavior, as well as item-specific classes, and the storage of different values from the presented label.

```jsx
<Dropdown
  uid="more-complex"
  title="Choose a value"
  className="why-not"
  items={ [
    { value: '1', label: 'Item 1, className: 'item-1' },
    { value: '2', label: 'Item 2, className: 'item-2' },
    { value: '3', label: 'Item 3, className: 'item-3' },
  ] }
  replaceTitle={ false }
/>
```

The title of the above dropdown will *not* be replaced on selection, and each item will be given a distinct className.

The Dropdown component is also capable of allowing for multiple selection:

```
<Dropdown
  uid="multiple"
  items={ [
    'Item 1',
    'Item 2',
    'Item 3'
  ] },
  title="Select multiple"
  multipleSelect={ true }
/>
```

A multiple selection dropdown will not close on item selection. Because multiple selections are possible, `replaceTitle` doesn't make sense, and the title will not reflect decisions. (If you want the title to change based on selections, read the selections outside of the Dropdown and pass the title in dynamically).