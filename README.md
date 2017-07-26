# Noon Flagship

[![CircleCI](https://circleci.com/gh/weareredshift/noon.svg?style=svg&circle-token=1300f4388720eea55cf10bf9d16a53b0a3bcd64a)](https://circleci.com/gh/weareredshift/noon)

## Getting started

### Development environment

1. Install [node](https://nodejs.org/en/).
1. Install [yarn](https://yarnpkg.com/docs/install).
2. `yarn install`
3. `yarn start`
4. Visit https://localhost:3000/

### Production environments

We show the server in two production environments; one internal, one external.

#### Internal server

- URL: <https://locoroll-dev.redshiftdigital.io>
- Launched with: `yarn run start:prod`

#### Client-facing server

- URL: <https://locoroll.redshiftdigital.io>
- Launched with: `yarn run start:prod`

## Documentation

More documentation can be found in the docs directory. Specifically:

- The [architecture](./docs/architecture.md) on which this application is based.
- [Styling conventions](./docs/styling.md)
- [Testing patterns](./docs/testing.md)
- Code documentation:
  1. `yarn run serve-docs`
  2. Visit `localhost:4001`.
- [Virtual environment setup](./docs/virtual-environment-setup.md)
