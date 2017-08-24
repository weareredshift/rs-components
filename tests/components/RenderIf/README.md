# RenderIf

The RenderIf component takes a child, a `loader`, and either a `test` or `shouldRender` prop. If `shouldRender` is true (or the `test` function returns a truthy value), the component renders. If not, the Loader renders.

```
<RenderIf
  test={ (state) => state.user.size > 0 }
  loader={ <span>Fetching user data</span> }
>
  <UserAccount />
</RenderIf>
```

The above can alternately be written with `shouldRender` instead of a test function, if the relevant information either isn't in global Redux state or is in some state data that is accessible:

```
<RenderIf
  shouldRender={ user.size > 0 }
  loader={ <span>Fetching user data</span> }
>
  <UserAccount data={ user } />
</RenderIf>
```