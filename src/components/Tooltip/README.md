# Tooltip

The Tooltip component is rendered inline, and consists of a trigger element, that, when clicked, toggles the JSX elements passed through the children prop.

```jsx
<Tooltip
  id="tooltipID"
  triggerContent={ <span>Click to open.</span> }
>
  <p>Content to be revalead when the tooltip is open.</p>
</Tooltip>
```

The Tooltip component determines which, if any, content to display on the basis of the `openTooltipID` prop. Managing this prop in the Redux store is most easily accomplished through the helper functions provided with this library:

```
import { actions } from 'rs-components';

dispatch(actions.setActiveTooltip('someOpenTooltipID'))
```

#### Closing the modal on outside click

To enable closing of the tooltip on a click outside of the modal content, simply add the relevant classes to the `OutsideClickWatcher` in the app wrapper component, if you're using one:

```jsx
import { actions } from 'rs-components';

<OutsideClickWatcher
  watchables={
    [{
      classes: ['tooltip__content'],
      action: setActiveTooltip(null),
      ifTrue: state => state.openTooltipID
    }]
  }
/>
```
