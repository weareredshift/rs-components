/**
 * Updates the active tooltip
 *
 * @param {string} tooltipID       String defining tooltip id
 * @return {Object}                Action object
 */
export function setActiveTooltip (tooltipID) {
  return { type: 'SET_ACTIVE_TOOLTIP', tooltipID };
}
