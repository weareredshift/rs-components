import { combineReducers } from 'redux';

function reducerObjFromHandlerWrapper (handlers) {
  return function produceReducerObj (handlerName) {
    const handler = handlers[handlerName];
    const initState = handler.init;

    delete handler['init'];

    const reducerFunc = (state = initState, action) => handler[action.type]
            ? handler[action.type](state, action)
            : state;

    return { [handlerName]: reducerFunc };
  };
}

/**
 * Combines a list of handlers into an object of reducer functions.
 * @param {Object} handlers - Key-value store pairing action names with
 * functions to resolve the action.
 * @param {Object} otherReducers - Object of reducer functions
 * @returns {Object} An object of reducer functions
 */
export function constructReducers (handlers, otherReducers = {}) {
  const reducerObjFromHandler = reducerObjFromHandlerWrapper(handlers);
  const reducers = Object.keys(handlers)
          .reduce((obj, name) => Object.assign(
            obj, reducerObjFromHandler(name)),
                  {});

  Object.keys(otherReducers).forEach(key => {
    reducers[key] = otherReducers[key];
  });

  return reducers;
}

/**
 * Take reducers object, and returns a function which combines that object with
 * another reducers object.
 * @param {Object} mainReducers - Object of reducer functions
 * @returns {Function} Function which takes a reducer object and returns an new
 * reducer object
 */
export function curryMakeRootReducer (mainReducers) {
  return function (asyncReducers) {
    return combineReducers({
      ...mainReducers,
      ...asyncReducers
    });
  };
}

/**
 * @param {Function} makeRootReducer Creates the root reducer given additional asynchronous reducers
 * @returns {Function} Returns a function which injects the reducers when creating store
 */
export function curryInjectReducer (makeRootReducer) {
  return function (store, { key, reducer }) {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
  };
}
