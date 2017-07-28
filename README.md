# Redshift Component Library

A library of reusable React-Redux components. This library is meant to be modular, reusable, and mostly style-indifferent.

## To use

```
yarn add rs-components
```

```
import { Dropdown } from 'rs-components'
```

## To explore

This repo includes a server for testing out the components, using [React Cosmos](https://github.com/react-cosmos/react-cosmos). Simply run `yarn start` and visit `localhost:3001` to view some examples of the components in action.

## To learn more

To view the programmatic JSDocs, pull down the repo and run `yarn server-docs`.

Each component also has additional docs, collocated in the component folder. Go there to read more.

#### Doc links

The below are arrange alphabetically. The list of links may not be up to date:

- [BaseForm](./components/BaseForm/README.md)
- [Checkbox](./components/Checkbox/README.md)
- [Dropdown](./components/Dropdown/README.md)
- [Link](./components/Link/README.md)

## Styling

Where relevant, components have been given a basic set of styles -- whatever is minimally sufficient to get them functional. Styling the components is designed to be easy. Each component declares a sensible top-level class, as well as classes for most of its contained nodes. For example, the Dropdown component has a `dropdown` class, as well as containing nodes with classes like `dropdown__menu`, `dropdown__item`, and `dropdown__title`. These classes follow BEM syntax.

Additionally, each component visible in the React Cosmos explorer has a second class applied at a high level: `rscomp` (for Redshift component). None of the built-in styles use this class, so by using this class as well as the normal built-in class, you should be able to overwrite all built-in styles because of the greater selector specificity:

```scss
.dropdown.rscomp {
  z-index: 1; // will overwrite
}
```

All the styles for the components are nested under the top-level class, so as long as no other items in the app use the same toplevel class names, the built-in styles should cause no conflicts.

# Adding components

A number of candidate components have not yet been added to the library. They are located in `src/comps`.

To add a component:

1. Write the new component or move the preexisting component into `src/components`.
2. Create a Fixture in `src/components/__fixtures__/`, following the examples

  > A fixture specifies the starting props for an instance of the component in the React Cosmos explorer.

3. Move the test from `tests/comps` to `test/components` (or write a complete new one) and get it passing.
4. Add it to `src/root/index.js` to make the component available through library input.