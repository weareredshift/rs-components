# RedirectWithFlash

The RedirectWithFlash component wraps a single child. It determines whether it should be rendered, and, if not, redirects to the given path, with the given flash message in location state. The component is built to work with the [Flash](../Flash) component, which is inserted into a high-level layout file and renders a flash message from the location state information.

Here's a simple example:

```jsx
<RedirectWithFlash
  redirectPath="/unauthorized"
  redirectIf={ !user.authToken }
  message="You need to sign in to see that!"
  type="warning"
>
  <AccountPage />
</RedirectWithFlash>
```

In the above example, if the user is not authorized (here, doesn't have an `authToken`), the child component will *not* render, and instead the user will be redirected to `/unauthorized`, with a message (with class "flash--warning") will show up telling the user that they need to sign in.

### Complex example

RedirectWithFlash can also be used with a `computeRedirect` function which is passed `state` and `dispatch` as arguments and returns either a path string, a path/message object, or `null` if the component should *not* redirect.

```jsx
<RedirectWithFlash
  computeRedirectAndMakeRequests={ (state, dispatch) => {
    const role = state.user.get('role');
    if (role === 'admin') {
      return null;
    } else if (role) {
      return { message: 'Oops. This page is for admins only!', redirectPath: '/', type: 'warning' };
    } else {
      // Don't have role yet -- allow the page to render, but fetch user info
      // and redirect silently, without flash.
      dispatch(actions.requestCurrentUser());
      return '/';
    }
  } }
>
  <AuthorizedPage />
</RedirectWithFlash>
```

> Note that because this function is passed dispatch, it can also perform side effects, and grab data necessary for the page to render.