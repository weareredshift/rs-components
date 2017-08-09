/**
 * Sets the given checkbox value as true or false
 *
 * @param      {string}  uid                Unique identifier for this checkbox
 * @param      {string}  value              Whether the box is selected
 * @return     {Object} Action object
 */
export function setCheckboxValue (uid, value) {
  return ({
    type: 'SET_CHECKBOX_VALUE', uid, value
  });
}
