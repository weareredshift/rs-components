# Checkbox

The Checkbox component renders a simple Redux-connected `input` with type `checkbox` which stores its value in the `checkbox` Map in state.

The only props it needs to take are a display `name` and a unique `boxID` under which the checkbox value will be stored in Redux state.

```jsx
<Checkbox
  uid="checkbox"
  name="Check me"
/>
```
