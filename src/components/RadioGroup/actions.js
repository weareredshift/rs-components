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
