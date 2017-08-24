# Flash

The Flash component is intended to be rendered in a high-level layout file. Given the correct location state parameters, it renders a flash message, which times out in the duration given by the `duration` prop.

Here's a full example:

```
<Flash
  message="Something went wrong!"
  type="error"
  duration={ 2000 }
  className="my-special-flash"
/>
```

In the above example, the message "Something went wrong" will display within a div with the class "flash flash--error my-special-flash flash--on", and the `flash--on` class will turn to `flash--off` once the 2000 miliseconds have ellapsed, triggering whatever CSS animation you desire to hide the message.

Practically, this component is designed to be used without passing props directly. If you use the [RedirectWithFlash](../RedirectWithFlash) component or its associated `redirectWithFlash` [util](../RedirectWithFlash/utils.js), the Flash will grab its `message` and `type` props from `props.location.state`, so you can just do this in a high-level layout file:

```
<Flash />
```

When anything uses the above util to redirect to a page in that high-level layout component, the flash will render with the correct message and type.