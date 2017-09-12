import { setActiveBreakpoint } from './actions';

export const defaultBreakpoints = {
  desktopLg: 1400,
  desktopMd: 1300,
  desktopSm: 1200,
  tabletLg: 1040,
  tabletMd: 991,
  tabletSm: 840,
  mobileLg: 767,
  mobileMd: 540,
  mobileSm: 400,
  mobileXsm: 350
};

/**
 * Returns a string of classes that match / are adjacent to the current breakpoint
 * @param {classObj} classObj           Obj containing key / value pairs for desired breakpoints
 * @param {Object} breakpoint           Obj describing current breakpoint state
 * @param {string} breakpoint.name      String defining current breakpoint name
 * @param {number} breakpoint.size      Number defining current breakpoint size
 * @return {string}                     Returns class string that matches correct breakpoint
 */
export function setClass (classObj, breakpoint, breakpoints = defaultBreakpoints) {
  if (classObj.default === undefined) classObj.default = '';
  if (typeof breakpoint !== 'object') {
    throw new Error(`Bad breakpoint type given: ${breakpoint} (${typeof breakpoint})`);
  }

  if (breakpoint.name === 'default') return classObj['default'];

  const sizeArray = Object.keys(breakpoints).reverse();
  const startingIndex = sizeArray.indexOf(breakpoint.name);
  const firstMatchedKey = sizeArray
    .slice(startingIndex)
    .find(key => classObj[key]) ||
    'default';

  return classObj[firstMatchedKey];
}

function dispatchActiveQuery (dispatch, mediaQueryState, action) {
  // Reduce media query to the smallest breakpoint
  const activeQuery = mediaQueryState.reduce((prev, curr) => curr.matches ? curr : prev && prev.matches ? prev : null);

  const breakpointName = activeQuery ? activeQuery.name : 'default';
  const breakpointSize = activeQuery && activeQuery.breakpoint;

  // Pushes active query string to store. If no breakpoint is active, pushes 'default'
  dispatch(action(breakpointName, breakpointSize, mediaQueryState));
}

/**
 * Called in componentDidMount in top-level app component, this initializes the Redux breakpoint object
 *
 * @param      {Object[]}   breakpoints    The breakpoint mapping used in the application
 * @param      {Function[]} action       The action for dispatching setActiveBreakpoint (defaults given)
 * @param      {Object[]}   windowObj    The window object (default given)
 */
export function initReduxBreakpoints (breakpoints = defaultBreakpoints, action = setActiveBreakpoint, windowObj = window) {
  if (!this.mediaQueryState) { this.mediaQueryState = []; }

  Object.keys(breakpoints).forEach(key => {
    // Create breakpoint object
    const query = windowObj.matchMedia(`(max-width: ${breakpoints[key]}px)`);
    // Add breakpoint value
    query.breakpoint = breakpoints[key];
    // Add breakpoint name
    query.name = key;
    // Add breakpoint change handler
    function breakpointChange () {
      dispatchActiveQuery(this.props.dispatch, this.mediaQueryState, action);
    }

    // Shouldn't need to remove listener since app wrapper is present in whole
    // app and mounted once.
    query.addListener(breakpointChange.bind(this));

    // Push breakpoint into array
    this.mediaQueryState.push(query);
  });

  dispatchActiveQuery(this.props.dispatch, this.mediaQueryState, action);
}

function breakpointFromString (string, breakpoints) {
  const breakpoint = breakpoints[string];

  if (!breakpoint) {
    throw new Error(`Bad breakpoint variable given: ${string}`);
  }

  return breakpoint;
}

/**
 * Returns a boolean indicating whether or not the currentBreakpointSize value
 * is greater than the passed breakpointToCompare value
 * @param {Object} breakpointToCompare           String or number, if string, it is used to retrieve
 *                                               the correct value from breakpoints[]
 * @param {number} currentBreakpointSize         Number indicating the current breakpoint value
 *                                               (usually breakpoint.size)
 * @param {Object} breakpoints                   Object defining breakpoints for app
 * @return {boolean}                             Returns boolean that indicates whether the passed
 *                                               breakpointToCompare string or number is currently
 *                                               greater than the currentBreakpointSize
 */
export const breakpointIsGreaterThan = (breakpointToCompare, currentBreakpointSize, breakpoints = defaultBreakpoints) => {
  const comparison = typeof breakpointToCompare === 'string'
    ? breakpointFromString(breakpointToCompare, breakpoints)
    : breakpointToCompare;

  if (currentBreakpointSize === null || currentBreakpointSize > comparison) {
    return true;
  } else {
    return false;
  }
};

/**
 * Returns a boolean indicating whether or not the currentBreakpointSize value
 * is less than the passed breakpointToCompare value
 * @param {Object} breakpointToCompare           String or number, if string, it is used to retrieve
 *                                               the correct value from breakpoints[]
 * @param {number} currentBreakpointSize         Number indicating the current breakpoint value
 *                                               (usually breakpoint.size)
 * @param {Object} breakpoints                   Object defining breakpoints for app
 * @return {boolean}                             Returns boolean that indicates whether the passed
 *                                               breakpointToCompare string or number is currently
 *                                               less than the currentBreakpointSize
 */
export const breakpointIsLessThan = (breakpointToCompare, currentBreakpointSize, breakpoints = defaultBreakpoints) => {
  const comparison = typeof breakpointToCompare === 'string'
    ? breakpointFromString(breakpointToCompare, breakpoints)
    : breakpointToCompare;

  if (currentBreakpointSize !== null &&
      currentBreakpointSize <= comparison) {
    return true;
  } else {
    return false;
  }
};
