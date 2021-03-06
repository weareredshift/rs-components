import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { kebabCase } from 'lodash';

import { sortTable } from './actions';

/**
 * Renders a table component, the headers of which can optionally be used to sort the rows.
 *
 * @param      {Object}    props                                      React props object
 * @param      {[string]}  props.className                            Optional additional class for table
 * @param      {Function}  props.onRowClick                           On click for row, fed cells and row index
 * @param      {Array[]}   props.rows                                 An array of rows, each represented by an object with cells
 * @param      {string}    [props.rows[].className]                   Optional additionalClass for the row
 * @param      {Function}  props.rows[].onClick                       Called on row click, *unless* clicked cell has its own onClick function
 * @param      {Object}    props.rows[].style                         Optional style object for row
 * @param      {Object[]}  props.rows[].cells                         An array of objects representing row cells
 * @param      {Object}    props.rows[].cells                         An object representing a row cell
 * @param      {string}    props.rows[].cells.columnName              Column in which to display the cell
 * @param      {string}    props.rows[].cells.fieldValue              Sortable string value, displayed as default
 * @param      {Function}  props.rows[].cells.onClick                 On click event for cell, fed cell, cell index, and row index
 * @param      {Object}    props.rows[].cells.style                   Optional style object for cell
 * @param      {[React.Component]}    props.rows[].cells.fieldContent Optional node to show in place of field value
 * @param      {Object[]}  props.columns                              Array of columns in table
 * @param      {string}    props.columns[].name                       Name of column
 * @param      {[string]}  props.columns[].className                  Optional class name to add to column
 * @param      {string}    props.columns[].allowSortBy                Whether the column is sortable (default: true)
 * @param      {string}    props.sortBy                               The column to sort by
 * @param      {string}    props.sortDirection                        The direction (asc or desc) to sort by
 * @param      {Function}  props.onHeaderClick                        Function called on header item click (to sort table)
 *
 * @return     {React.Component}    Table which can be sorted by column, using Redux store
 */
export function SortableTableUC ({ className, rows, columns, sortBy, sortDirection, onHeaderClick }) {
  let orderedRows = rows;
  if (sortBy) {
    const val = row => {
      const cell = row.cells.find(c => c.columnName === sortBy);
      return cell && cell.fieldValue;
    };

    // Sort rows by given direction
    orderedRows = rows
      .sort((a, b) => {
        const aVal = val(a);
        const bVal = val(b);

        let sortVal = 0;
        if (aVal < bVal) {
          sortVal = sortDirection === 'asc' ? -1 : 1;
        } else if (aVal > bVal) {
          sortVal = sortDirection === 'asc' ? 1 : -1;
        }

        return sortVal;
      });
  }

  return (
    <table className={ classnames('sortable-table rscomp', className) } >
      <thead className="sortable-table__head">
        <tr>
          {
            columns.map((column, index) => (
              <th
                className={ classnames(
                  'sortable-table__th',
                  // Classes if sorting by this column
                  sortBy === column.name && `sortable-table__th--sortby sortable-table__th--sortby-${sortDirection}`,
                  `sortable-table__th--column-${ kebabCase(column.name) }`, // Column-specific class
                  (column.allowSortBy && !column.hideName) && `sortable-table__th--sortable`,
                  column.className
                ) }
                onClick={ () => { onHeaderClick(column); } }
                key={ index }
              >
                { column.hideName ? null : column.name }
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody className="sortable-table__body">
        {
          orderedRows
            .map((row, rowIndex) => (
              <tr
                className={ classnames(
                  'sortable-table__tr',
                  `sortable-table__tr--row-${ rowIndex }`,
                  row.className
                ) }
                key={ rowIndex }
                style={ row.style || {} }
              >
                {
                  columns.map((col, colIndex) => {
                    const cell = row.cells.find(cell => cell.columnName === col.name);
                    if (cell) {
                      return (
                        <td
                          className={ classnames(
                            'sortable-table__td',
                            `sortable-table__td--cell-${ kebabCase(col.name) }`,
                            `sortable-table__td--col-${colIndex}`,
                            cell.className
                          ) }
                          key={ colIndex }
                          onClick={ () => {
                            if (cell.onClick) {
                              cell.onClick(cell, colIndex, rowIndex);
                            } else if (row.onClick) {
                              row.onClick(cell, row, colIndex, rowIndex);
                            }
                          } }
                          style={ cell.style || {} }
                        >
                          { cell.fieldContent || cell.fieldValue }
                        </td>
                      );
                    } else {
                      return (
                        <td
                          className={ classnames(
                            'sortable-table__td',
                            `sortable-table__td--cell-${ kebabCase(col.name) }`
                          ) }
                          key={ colIndex }
                          onClick={ () => {
                            if (row.onClick) {
                              row.onClick(cell, row, colIndex, rowIndex);
                            }
                          } }
                        />
                      );
                    }
                  })
                }
              </tr>
            ))
        }
      </tbody>
    </table>
  );
}

const { string, shape, arrayOf, oneOfType, node, bool, func, number, object } = PropTypes;
SortableTableUC.propTypes = {
  uid: string.isRequired,
  onRowClick: func,
  columns: arrayOf(shape({
    name: string.isRequired,
    allowSortBy: bool.isRequired,
    hideName: bool
  })),
  rows: arrayOf(
    shape({ // Row
      onClick: func,
      cells: arrayOf(
        shape({ // Cell
          columnName: string.isRequired,
          fieldValue: oneOfType([string, number]).isRequired,
          fieldContent: oneOfType([node, string]),
          className: string,
          onClick: func,
          style: object
        })
      ),
      style: object
    })
  ).isRequired,
  sortBy: string,
  sortDirection: string,
  className: string,
  onHeaderClick: func.isRequired
};

export const mapStateToProps = (state, ownProps) => {
  // Allow for array of column strings to be passed in, for more simple format
  const columns = typeof ownProps.columns[0] === 'string'
      ? ownProps.columns.map(col => ({ name: col, allowSortBy: true }))
      : ownProps.columns.map(col => ({ allowSortBy: true, ...col }));

  // Allow for array of row strings to be passed in, for more simple format
  const rows = ownProps.rows.map(row => ({
    ...row,
    cells: row.cells.map((cell, index) => typeof cell === 'string'
      ? { columnName: columns[index].name, fieldValue: cell }
      : { columnName: columns[index].name, ...cell }
    )
  }));

  return {
    sortBy: state.sortableTables.getIn([ownProps.uid, 'sortBy']),
    sortDirection: state.sortableTables.getIn([ownProps.uid, 'sortDirection']),
    columns,
    rows
  };
};

const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...ownProps,
  ...stateProps,

  // Sort by column, if sortable by that column. Reverse sorting if it's already in place.
  onHeaderClick: (column) => {
    if (!column.allowSortBy) return null;

    dispatch(sortTable(
      ownProps.uid,
      column.name,
      stateProps.sortBy === column.name && stateProps.sortDirection === 'desc'
        ? 'asc'
        : 'desc'
    ));
  }
});

export default connect(mapStateToProps, undefined, mergeProps)(SortableTableUC);
