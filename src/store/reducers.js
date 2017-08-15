import { constructReducers, curryMakeRootReducer, curryInjectReducer } from './boilerplate';
import * as handlers from './handlers';

export const initializeRSReducers = (initializers = {}) => {
  const initializedHandlers = Object.keys(handlers)
    .reduce((obj, key) => Object.assign(obj, {
      [key]: initializers[key]
        ? Object.assign(handlers[key], { _init: initializers[key] })
        : handlers[key]
    }), {});
  constructReducers({ ...initializedHandlers }, {});
};

export const reducers = initializeRSReducers();

export const makeRootReducer = curryMakeRootReducer(reducers);

export const injectReducer = curryInjectReducer(makeRootReducer);

export default makeRootReducer;
