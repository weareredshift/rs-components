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
