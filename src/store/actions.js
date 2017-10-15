export { setCheckboxValue } from '../components/Checkbox/actions';
export { setDropdownValues, setOpenDropdownID } from '../components/Dropdown/actions';
export { setRadioValue } from '../components/RadioGroup/actions';
export { sortTable } from '../components/SortableTable/actions';
export { setOpenModal } from '../components/Modal/actions';
export { logRequest } from '../components/RenderIf/actions';

export function locationChange (location = '/') {
  return ({
    type: 'LOCATION_CHANGE', location
  });
}

export function updateLocation ({ dispatch }: { dispatch: Function }) {
  return function (nextLocation: string) {
    dispatch(locationChange(nextLocation));
  };
}

// export function setCarouselIndex (carouselID: string, index: number) {
//   return ({
//     type: 'SET_CAROUSEL_INDEX', carouselID, index
//   });
// }

// /**
//  * Changes the active breakpoint
//  *
//  * @param {string} breakpointName          String defining the active breakpoint
//  * @param {number} breakpointSize          Number defining the active breakpoint
//  * @param {Array} queryState               Array of mediaQueryList objects
//  * @return {Object} Action object
//  */
// export function setActiveBreakpoint (breakpointName, breakpointSize, queryState) {
//   return ({
//     type: 'SET_ACTIVE_BREAKPOINT', breakpointName, breakpointSize, queryState
//   });
// }

// *
//  * Toggles the modal open or closed
//  *
//  * @param {boolean} open            Boolean describing whether the modal is open or not
//  * @return {Object} Action object

// export function toggleModal (open) {
//   return ({
//     type: 'TOGGLE_MODAL', open
//   });
// }

// /**
//  * Swaps the active modal
//  *
//  * @param {string} modalID          Unique id defining the active modal
//  * @return {Object} Action object
//  */
// export function setActiveModal (modalID) {
//   return ({
//     type: 'SET_ACTIVE_MODAL', modalID
//   });
// }

// /**
//  * Sets the name of the expanded section in a given area of the app.
//  *
//  * @param      {string}  section  The area in which the given expandable item exists
//  * @param      {string}  name     The name of the expandable item
//  * @return     {Object}  Action object
//  */
// export function setExpanded (section, name) {
//   return ({
//     type: 'SET_EXPANDED', section, name
//   });
// }
