/**
 * Changes the active breakpoint
 *
 * @param {string} breakpointName          String defining the active breakpoint
 * @param {number} breakpointSize          Number defining the active breakpoint
 * @param {Array} queryState               Array of mediaQueryList objects
 * @return {Object} Action object
 */
export function setActiveBreakpoint (breakpointName, breakpointSize, queryState) {
  return ({
    type: 'SET_ACTIVE_BREAKPOINT', breakpointName, breakpointSize, queryState
  });
}
