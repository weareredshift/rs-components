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

Most of these components depend on Redux actions and accompanying "handlers" to run smoothly, so those should be imported as well and incorporated into the Redux store:

***store/reducers.js**

```
import { constructReducers, curryMakeRootReducer, curryInjectReducer } from './boilerplate';
import { handlers } from 'rs-components';

export const reducers = constructReducers({ ...handlers, ...otherHandlers }, {});
```

## To explore

This repo includes a server for testing out the components, using [React Cosmos](https://github.com/react-cosmos/react-cosmos). Simply run `yarn start` and visit `localhost:3001` to view some examples of the components in action.

## To learn more

To view the programmatic JSDocs, pull down the repo and run `yarn server-docs`.

Each component also has additional docs, collocated in the component folder. Go there to read more.

#### Doc links

The below are arrange alphabetically. The list of links may not be up to date:

- [BaseForm](./src/components/BaseForm/README.md)
- [Checkbox](./src/components/Checkbox/README.md)
- [Dropdown](./src/components/Dropdown/README.md)
- [Link](./src/components/Link/README.md)
- [RadioGroup](./src/components/RadioGroup/README.md)

## Styling

Where relevant, components have been given a basic set of styles in React Cosmos -- whatever is minimally sufficient to get them functional. These styles are **not** exported with the components, so the components should be styled from scratch in any importing library. The base styles used in this repo are co-located in the same directory as each component, so they can be easily copied.

Styling the components is designed to be easy. Each component declares a sensible top-level class, as well as classes for most of its contained nodes. For example, the Dropdown component has a `dropdown` class, as well as containing nodes with classes like `dropdown__menu`, `dropdown__item`, and `dropdown__title`. These classes follow BEM syntax.

Additionally, each component visible in the React Cosmos explorer has a second class applied at a high level: `rscomp` (for Redshift component). None of the built-in styles use this class, so by using this class as well as the normal built-in class, you should be able to overwrite all built-in styles because of the greater selector specificity:

```scss
.dropdown.rscomp {
  z-index: 1; // will overwrite
}
```

All the example styles for the components are nested under the top-level class, so as long as no other items in the app use the same toplevel class names, the built-in styles should cause no conflicts.

## Adding components

A number of candidate components have not yet been added to the library. They are located in `todos`.

To add a component:

1. Write the new component or move the preexisting component into `src/components`.
2. Create a Fixture in `src/components/__fixtures__/`, following the examples

  > A fixture specifies the starting props for an instance of the component in the React Cosmos explorer.

3. Move the test from `tests/comps` to `test/components` (or write a complete new one) and get it passing.
4. Add it to `src/index.js` to make the component available through library input.
5. Optionally, add a `.scss` file, and import it into `src/styles/components.scss` to get the styles showing in React Cosmos.

## Roadmap

- Add a ton of components