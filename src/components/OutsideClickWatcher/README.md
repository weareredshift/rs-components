# OutsideClickWatcher

The OutsideClickWatcher component watches for click events inside it, and dispatches actions based on the "watchables" handed to it as props. Watchables are objects defining

- an array of CSS `classes`
- an `action` to perform if a user clicks outside of one of those classes

  > `action` can be either a Redux action object (which will be dispatched), or a custom function, which takes `dispatch` as an argument.

- an `ifTrue` function, (takes `state` as argument) to watch and dispatch the action if true.

Dropdowns provide a good example:

```
import { setOpenDropdownID } from 'store/actions';
...
<OutsideClickWatcher
  watchables={
    [{
      classes: ['dropdown', 'some-other-class-not-to-close-dropdown-when-clicked-within']
      action: setOpenDropdownID(null),
      ifTrue: state => state.openDropdownID
    }]
  }
/>
```

The above example will dispatch `setOpenDropdownID(null)` when a user clicks *outside* of the `'dropdown'` (or other) class, and the value of `state.openDropdownID` is `null` or `undefined`. This simplifies the logic behind closing the dropdown when you click outside of it.

This basic use-case is preloaded into the component, so that you simply have to wrap your root component with an `OutsideClickWatcher` with no props, and it will handle clicking outside of a dropdown. If you want to add additional watchables, simply follow the above pattern.