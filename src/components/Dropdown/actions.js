/**
 * Sets the dropdown values.
 *
 * @param      {string}  uid              Unique identifier for this dropdown
 * @param      {Array}  values           List of value objects selected
 * @return     {Object} Action object
 */
export function setDropdownValues (uid, values) {
  return ({
    type: 'SET_DROPDOWN_VALUES', uid, values
  });
}

/**
 * Sets the given dropdown as open (or, if uid is null, closes all dropdowns)
 *
 * @param      {string}  uid              Unique identifier for this dropdown
 * @return     {Object} Action object
 */
export function setOpenDropdownID (uid) {
  return ({
    type: 'SET_OPEN_DROPDOWN_ID', uid
  });
}
