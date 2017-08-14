# OutsideClickWatcher

The OutsideClickWatcher component watches for click events inside it, and dispatches actions based on the "watchables" handed to it as props. Watchables are objects defining

- an array of CSS `classes`
- an `action` to perform if a user clicks outside of one of those classes
- a `stateKey` to watch and dispatch the action if the value of the key is not `null` or `undefined`.

Dropdowns provide a good example:

```
import { setOpenDropdownID } from 'store/actions';
...
<OutsideClickWatcher
  watchables={
    [{
      classes: ['dropdown', 'some-other-class-not-to-close-dropdown-when-clicked-within']
      action: setOpenDropdownID(null),
      stateKey: 'openDropdownID'
    }]
  }
/>
```

The above example will dispatch `setOpenDropdownID(null)` when a user clicks *outside* of the `'dropdown'` (or other) class, and the value of `state.openDropdownID` is `null` or `undefined`. This simplifies the logic behind closing the dropdown when you click outside of it.

This basic use-case is preloaded into the component, so that you simply have to wrap your root component with an `OutsideClickWatcher` with no props, and it will handle clicking outside of a dropdown. If you want to add additional watchables, simply follow the above pattern.