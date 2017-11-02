export default {
  props: {
    uid: 'onclick',
    columns: ['Height', 'Weight'],
    rows: [
      { cells: ['5ft 7in', '156lb'] },
      { cells: [{ columnName: 'Height', fieldValue: 'Click me! I\'m silent', onClick: () => {} }, '180lb'] },
      { cells: ['5ft 0in', { columnName: 'Weight', fieldValue: 'Click me! I\'m special', onClick: () => { alert('You clicked a cell. It overrides the row click.'); } }] }
    ].map((row, ind) => ({ ...row, onClick: () => { alert(`You clicked row ${ind}`); } }))
  }
};
