# Respond

The respond component wraps another component, and passes it a `className` prop which results from watching the window size and calculating the class string appropriate for the breakpoint.

At its simplest, the Respond component takes one prop: `classes`, an object defining classes for various breakpoints. It passes the right class to its child:

```jsx
<Respond classes={ { desktopSm: 'mt5', tabletLg: 'mt3' } }>
  <img src="whatever.jpg">
</Respond>
```

In the above example, the `img` tag would get passed a `classname` prop of `'mt5'` on the `desktopSm` breakpoint, and `'mt3'` on `tabletLg`. These breakpoints have default values, defined in the [utils](./utils.js) file, but you could overwrite them:

```jsx
<Respond
  classes={ { desktopSm: 'mt5', tabletLg: 'mt3' } }
  breakpoints={ { desktopSm: 1040, tabletLg: 800, tabletMd: 700 }}
>
  <img src="whatever.jpg">
</Respond>
```

To get these working, the app container component of your app must watch the window size and dispatch it to the breakpoint object. There's a helper util for that:

```js
import { utils } from 'rs-components';
const { initReduxBreakpoints } = utils;

...

  componentDidMount () {
    initReduxBreakpoints.call(this)
    // Can also be passed optional arguments, with default values:
    // initReduxBreakpoints.call(this, otherBreakpointsObject, otherActionToDispatchOnWindowsizeChange, windowObject)
  }
```