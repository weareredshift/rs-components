# Redshift Component Library

A library of reusable React-Redux components. This library is meant to be modular, reusable, and mostly style-indifferent.

## To use

```
yarn add rs-components
```

Then import components like so:

```
import { Dropdown } from 'rs-components';
```

Most of these components depend on Redux actions and accompanying reducers to run smoothly, so those should be imported as well and incorporated into the Redux store:

**store/createStore.js**
```
import { fromJS } from 'immutable';
import { reduxUtils } from 'rs-components';

// Create that store, with optional initial values
const store = createStore(reduxUtils.initReducers({
  dropdowns: fromJS({
    someDrop: [{ value: 'I start selected', index: 2 }]
  })
}));
```

## To explore

This repo includes a server for testing out the components, using [React Cosmos](https://github.com/react-cosmos/react-cosmos). Simply run `yarn start` and visit `localhost:3001` to view some examples of the components in action.

## To learn more

To view the programmatic JSDocs, pull down the repo and run `yarn docs:build && yarn docs:serve`.

Each component also has additional Markdown docs, co-located in the component folder. Go there to read more:

- [BaseForm](./src/components/BaseForm)
- [Checkbox](./src/components/Checkbox)
- [Dropdown](./src/components/Dropdown)
- [Link](./src/components/Link)
- [RadioGroup](./src/components/RadioGroup)
- [SortableTable](./src/components/SortableTable)
- [OutsideClickWatcher](./src/components/OutsideClickWatcher)

## Styling

Where relevant, components have been given a basic set of styles in React Cosmos -- whatever is minimally sufficient to get them functional. These styles are **not** exported with the components, so the components should be styled from scratch in any importing library. The base styles used in this repo are co-located in the same directory as each component, so they can be easily copied.

Styling the components is designed to be easy. Each component declares a sensible top-level class, as well as classes for most of its contained nodes. For example, the Dropdown component has a `dropdown` class, as well as containing nodes with classes like `dropdown__menu`, `dropdown__item`, and `dropdown__title`. These classes follow BEM syntax.

Additionally, each component visible in the React Cosmos explorer has a second class applied at a high level: `rscomp` (for Redshift component). This is simply (and probably unnecessarily) to allow for added specificity, if there happens to be a clash between one of the RS Component classes and one in your app:

```scss
.dropdown.rscomp {
  z-index: 1;
}
```

## Adding components

A number of candidate components have not yet been added to the library. They are located in `todos/components` and the corresponding tests are in `todos/tests`.

To add a component:

1. Write the new component or move the preexisting component into `src/components`.

> Note: Components should be exported by name (for testing) and by default (for use), and should *not* be named the same as their containing folders, because React Cosmos will grab the named export, which isn't connected. The pattern we've been using is to name components `SomeComponentUC` (for UnConnected). See any of the existing components for examples.

2. Create a Fixture in `src/components/__fixtures__/`, following the examples

  > A fixture specifies the starting props for an instance of the component in the React Cosmos explorer.

3. Move the test file from `todos/tests` to `test/components` (or write a complete new one) and get it passing.
4. Add it to `src/index.js` to make the component available through library import.
5. Optionally, add a `.scss` file, and import it into `src/styles/components.scss` to get the styles showing in React Cosmos. (These styles will not be exported).

## Deploying

To deploy, run `yarn prep` with the change type (patch, minor, major) the tag message, and an optional commit message (will default to tag message). This will add and commit your code, bump the version, and push the code and tags. Then run `npm publish` (NOT `yarn publish`), to deploy to NPM:

```
yarn prep patch "Message for tag" "Optional separate message for commit"
npm publish
```

## Roadmap

- Add a ton of components. Some hi-priority ones:
  - Breakpoint wrapper
  - Expandable (maybe rely on external libraries)