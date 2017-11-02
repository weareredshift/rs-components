# SortableTable

The SortableTable component allows for creating tables the contents of which can be sorted by column. Users just click on columns, and the table is sorted by them (starting descending). When the column is clicked again, the sorting direction is switched. Classes are applied to elements throughout the DOM of the component to make it easy to style in almost any circumstance.

The simplest example uses an array of strings for both the columns and for each row. This produces a table which is sortable by all columns, and in which every cell of every row is provided in the same order as the column order, and each cell displays just this string:

> Note: This use case is brittle (no empty row values), and limited (no non-text content).

```jsx
<SortableTable
  uid="simple"
  columns={ ['Height', 'Weight'] }
  rows={ [
    ['5ft 7in', '156lb'],
    ['6ft 2in', '180lb'],
    ['5ft 0in', '200lb']
  ] }
/>
```

The format can be made progressively more complicated. If you want to allow for blank cells or content inside the cell that isn't identical to the string value by which you are sorting (ie, an image within the cell), you can pass in objects as row cells:

```jsx
<SortableTable
  uid="stringTable"
  columns={ ['Name', 'Age', 'Gender'] }
  rows={ [
    [ // Row
      { columnName: 'Name', fieldValue: 'Jack' }, // Cell
      { columnName: 'Age', fieldValue: '28' },
      { columnName: 'Gender', fieldValue: 'M' }
    ],
    [
      { columnName: 'Name', fieldValue: 'Jill' },
      { columnName: 'Gender', fieldValue: 'F' }
      // Note that age is missing
    ],
    [
      { columnName: 'Name', fieldValue: 'Pat' },
      { columnName: 'Age', fieldValue: '32' },
      {
        columnName: 'Gender',
        fieldValue: '?',
        // In this example, we sort by '?' but display the `fieldContent` below
        fieldContent: <img
          src="https://www.lifezette.com/wp-content/uploads/2016/04/298216_full.jpg"
          alt="It's Pat!"
          width={ 50 }
          height={ 50 }
        />
      }
    ]
  ] }
/>
```

Rows and cells can also be passed onClick functions. The cell function takes precedence over the row function:

```
<SortableTable
  uid="stringTable"
  columns={ ['Name', 'Age', 'Gender'] }
  rows={ [
    { cells: ['5ft 7in', '156lb'] },
    { cells: [{ columnName: 'Height', fieldValue: 'Click me! I\'m silent', onClick: () => {} }, '180lb'] },
    { cells: ['5ft 0in', { columnName: 'Weight', fieldValue: 'Click me! I\'m special', onClick: () => { alert('You clicked a cell. It overrides the row click.'); } }] }
    ].map((row, ind) => ({ ...row, onClick: () => { alert(`You clicked row ${ind}`); } }))
  }
/>
```

> Cell `onClick` is passed the cell, the `columnIndex`, and the `rowIndex`, and row `onClick` is passed the `cell`, the `row`, the `columnIndex`, and the `rowIndex`.

Finally, if you want to block sorting by certain columns, simply replace the column string with an object. The object has a `name` which is the display name for the column, and a boolean `allowSortBy` field. If `false`, the header will be unsortable.
