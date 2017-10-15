export function setOpenModalID (id, updateURL = true, data = {}) {
  return { type: 'SET_OPEN_MODAL_ID', id, updateURL, data };
}
