/**
 * Object containing breakpoint names and sizes
 * @type {Object}
 */
export const breakpoints = {
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
export const setClass = (classObj, breakpoint) => {
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
};

function breakpointFromString (string) {
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
 * @return {boolean}                             Returns boolean that indicates whether the passed
 *                                               breakpointToCompare string or number is currently
 *                                               greater than the currentBreakpointSize
 */
export const breakpointIsGreaterThan = (breakpointToCompare, currentBreakpointSize) => {
  const comparison = typeof breakpointToCompare === 'string'
    ? breakpointFromString(breakpointToCompare)
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
 * @return {boolean}                             Returns boolean that indicates whether the passed
 *                                               breakpointToCompare string or number is currently
 *                                               less than the currentBreakpointSize
 */
export const breakpointIsLessThan = (breakpointToCompare, currentBreakpointSize) => {
  const comparison = typeof breakpointToCompare === 'string'
    ? breakpointFromString(breakpointToCompare)
    : breakpointToCompare;

  if (currentBreakpointSize !== null &&
      currentBreakpointSize <= comparison) {
    return true;
  } else {
    return false;
  }
};
