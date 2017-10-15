export function setOpenModal (id, updateURL = true, data = {}) {
  return { type: 'SET_OPEN_MODAL', id, updateURL, data };
}
