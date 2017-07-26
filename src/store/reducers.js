import { constructReducers, curryMakeRootReducer, curryInjectReducer } from './boilerplate';
import * as handlers from './handlers';

// EXPORTS

/**
 * Dictionary of reducer functions, with each key the function name, and each
 * value the associated function.
 */
export const reducers = constructReducers({ ...handlers }, {});

export const makeRootReducer = curryMakeRootReducer(reducers);

export const injectReducer = curryInjectReducer(makeRootReducer);

export default makeRootReducer;
