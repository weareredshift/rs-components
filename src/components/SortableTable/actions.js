/**
 * Sorts a table by the given column and direction
 *
 * @param      {string} uid             Unique identifier for this sortable table
 * @param      {string} sortBy          Name of column to sort by
 * @return     {string} sortDirection   Direction to sort by (asc or desc)
 */
export function sortTable (uid, sortBy, sortDirection) {
  return ({
    type: 'SORT_TABLE', uid, sortBy, sortDirection
  });
}
