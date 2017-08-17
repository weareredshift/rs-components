import { fromJS } from 'immutable';
import { constructReducers, curryMakeRootReducer, curryInjectReducer } from './boilerplate';
import * as handlers from './handlers';
/**
 * Takes an object of reducer initializers, and returns initialized reducers
 *
 * @param      {Object}  initializers  Initializer object. Keys are names of reducers,
 *                                     and values are how they should initialize
 * @return     {Object} reducers object
 */
export const initializeRSReducers = (initializers = {}) => {
  const initializedHandlers = Object.keys(handlers)
    .reduce((obj, key) => Object.assign(obj, {
      [key]: initializers[key]
        ? Object.assign(handlers[key], { init: initializers[key] })
        : handlers[key]
    }), {});
  return constructReducers({ ...initializedHandlers }, {});
};

export const reducers = initializeRSReducers({
  dropdowns: fromJS({
    simple: [{ index: 0 }]
  })
});

export const makeRootReducer = curryMakeRootReducer(reducers);

export const injectReducer = curryInjectReducer(makeRootReducer);

export default makeRootReducer;
