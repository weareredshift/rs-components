# Modal

The Modal component is rendered in a high-level component (ie the app wrapper or a layout file). It is passed an object mapping a modal name (string) to modal content (a React component), and renders the component associated with the `openModalID` (if any) in the store.

```jsx
<Modal
  modals={ {
    account: <div className="account">Account modal</div>,
    alert: <div className="alert">Custom alert modal</div>
  } }
/>
```

The Modal component determines which, if any, content to display on the basis of the `openModalID` prop. Managing this prop in the Redux store is most easily accomplished through the helper functions provided with this library:

```
import { actions } from 'rs-components';

dispatch(actions.setModalID('someOpenModalID'))
```

#### URL Tracking

By default, any dispatch to open a modal is reflected automatically in the URL. If you wish *not* to have the modal reflected in the URL, pass `false` as a second argument into `actions.setModalID`, which tells the handler *not* to update the URL with the modal ID.

```js
dispatch(actions.setModalID('someOpenModalID', false));
```

The modal component itself tracks the URL and dispatches a change to the store if the URL references a modal state not reflected in the store (ie, if the user is being linked directly to a page with a modal).

#### Closing the modal on outside click

To enable closing of the modal on a click outside of the modal content, simply add the relevant classes to the `OutsideClickWatcher` in the app wrapper component, if you're using one:

```jsx
import { actions } from 'rs-components';

<OutsideClickWatcher
  watchables={
    [{
      classes: ['modal']
      action: actions.setOpenModalID(null),
      stateKey: 'openModalID'
    }]
  }
/>
```

#### Doing it right

This Modal setup expects the modal components themselves (ie the Account Modal and Custom Alert Modal in the above examples) to be self-contained, in that they provide their own data, and don't throw errors if they're rendered without the data they expect. This allows them to be rendered following a link with the modal ID in the title.

So when creating modal content, make sure it connects to any data it needs, and that it handles empty states correctly, including possibly dispatching to close the modal if it doesn't receive expected content:

```jsx
import { actions } from 'rs-components';

export default function AccountModal ({ user, dispatch }) {
  // Handle case without necessary data
  if (!user.size) {
    dispatch(actions.setOpenModalID(null));
    return null;
  }

  return (<div>Actual component</div>);
}
```