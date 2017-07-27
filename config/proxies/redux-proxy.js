import createReduxProxy from 'react-cosmos-redux-proxy';

import createStore from 'store/createStore';

export default () => createReduxProxy({
  // Called when fixture loads with fixture.reduxState as initial state.
  // See https://github.com/skidding/flatris/blob/master/cosmos/redux-proxy.js
  createStore,
  alwaysCreateStore: true
});
