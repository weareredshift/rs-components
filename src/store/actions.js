export function locationChange (location = '/') {
  return ({
    type: 'LOCATION_CHANGE', location
  });
}

/**
 * Sets the dropdown values.
 *
 * @param      {string}  id              Unique identifier for this dropdown
 * @param      {Array}  values           List of value objects selected
 * @return     {Object} Action object
 */
export function setDropdownValues (id, values) {
  return ({
    type: 'SET_DROPDOWN_VALUES', id, values
  });
}

/**
 * Sets the given dropdown as open (or, if id is null, closes all dropdowns)
 *
 * @param      {string}  id              Unique identifier for this dropdown
 * @return     {Object} Action object
 */
export function setOpenDropdownID (id) {
  return ({
    type: 'SET_OPEN_DROPDOWN_ID', id
  });
}

/**
 * Sets the given radio item in the given group as selected
 *
 * @param      {string}  groupID         Unique identifier for radio button group
 * @param      {string}  item            Object representing selected value
 * @return     {Object} Action object
 */
export function setRadioValue (groupID, item) {
  return ({
    type: 'SET_RADIO_VALUE', groupID, item
  });
}

/**
 * Sets the given checkbox value as true or false
 *
 * @param      {string}  boxID              Unique identifier for this checkbox
 * @param      {string}  value              Whether the box is selected
 * @return     {Object} Action object
 */
export function setCheckboxValue (boxID, value) {
  return ({
    type: 'SET_CHECKBOX_VALUE', boxID, value
  });
}

/**
 * Signs the user out of Cognito, and clears localStorage
 *
 * @return     {Object} Action object
 */
export function cognitoSignOut () {
  return { type: 'COGNITO_SIGN_OUT' };
}

export function setCarouselIndex (carouselID: string, index: number) {
  return ({
    type: 'SET_CAROUSEL_INDEX', carouselID, index
  });
}

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

/**
 * Toggles the modal open or closed
 *
 * @param {boolean} open            Boolean describing whether the modal is open or not
 * @return {Object} Action object
 */
export function toggleModal (open) {
  return ({
    type: 'TOGGLE_MODAL', open
  });
}

/**
 * Swaps the active modal
 *
 * @param {string} modalID          Unique id defining the active modal
 * @return {Object} Action object
 */
export function setActiveModal (modalID) {
  return ({
    type: 'SET_ACTIVE_MODAL', modalID
  });
}

/**
 * Sets the name of the expanded section in a given area of the app.
 *
 * @param      {string}  section  The area in which the given expandable item exists
 * @param      {string}  name     The name of the expandable item
 * @return     {Object}  Action object
 */
export function setExpanded (section, name) {
  return ({
    type: 'SET_EXPANDED', section, name
  });
}

// Specialized actions below -- don't follow patterns
// When adding actions here, add them to the exceptions array in the actions spec.

export function updateLocation ({ dispatch }: { dispatch: Function }) {
  return function (nextLocation: string) {
    dispatch(locationChange(nextLocation));
  };
}
