# Link

The Link component is designed to simplify/combine all linking within and outside of the containing app. A Link component takes a path, determines whether it is to a location in or outside of the app, and behaves accordingly, either performing a within-app no-reload `react-router` redirect, or routing normally to an external location.

Link components can also take a `beforeGo` callback, of arbitrary behavior to be run before the link is followed, as well as a `target` attribute, which behaves identically to an `a` tag's `target` attribute. For internal links, a `data` object can be passed in as an attribute which will be available in the target page as `props.location.state`.

Here's an example internal link with passed data:

```jsx
<Link
  to='/other-page'
  beforeGo={ () => { console.log('About to redirect!'); } }
  data={ { arbitrary: 'data' } }
>
  Click me!
</Link>
```

External links work identically:

```jsx
<Link
  to='https://www.github.com'
  beforeGo={ () => { console.log('About to redirect!'); } }
  target="_blank" // Open in new tab
>
  Click me!
</Link>
```