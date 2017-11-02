import { fromJS } from 'immutable';

import assert from 'support/assert';

import { SortableTableUC, mapStateToProps } from 'components/SortableTable';
const Table = SortableTableUC;
import data from 'components/__fixtures__/SortableTable/ObjectColumns';

const props = (other) => ({
  onHeaderClick: () => {},
  ...data.props,
  ...other
});

describe('<SortableTable />', () => {
  describe('mapStateToProps', () => {
    it('turns string columns into objects', () => {
      const result = mapStateToProps({ sortableTables: fromJS({}) }, { columns: ['One', 'Two'], rows: [{ cells: ['First', 'Second'] }] });

      assert.objEq(
        result.columns[0],
        {
          name: 'One',
          allowSortBy: true
        }
      );
    });

    it('turns string rows into objects', () => {
      const result = mapStateToProps({ sortableTables: fromJS({}) }, { columns: ['One', 'Two'], rows: [{ cells: ['First', 'Second'] }] });

      expect(result.rows[0].cells[0].columnName).to.eq('One');
      expect(result.rows[0].cells[0].fieldValue).to.eq('First');

      expect(result.rows[0].cells[1].columnName).to.eq('Two');
      expect(result.rows[0].cells[1].fieldValue).to.eq('Second');
    });

    it('allows object columns', () => {
      const result = mapStateToProps({ sortableTables: fromJS({}) }, { columns: [{ name: 'One', allowSortBy: false }], rows: [{ cells: ['First'] }] });

      assert.objEq(
        result.columns[0],
        {
          name: 'One',
          allowSortBy: false
        }
      );
    });

    it('allows object cells', () => {
      const result = mapStateToProps({ sortableTables: fromJS({}) }, { columns: ['One'], rows: [{ cells: [{ columnName: 'One', fieldValue: 'First', onClick: 'imhere' }] }] });

      expect(result.rows[0].cells[0].fieldValue).to.eq('First');
      expect(result.rows[0].cells[0].onClick).to.eq('imhere');
    });
  });

  describe('basic HTML rendering', () => {
    it('renders a table with well-labeled components', () => {
      const comp = mockComp(Table, props({ sortBy: 'Name', sortDirection: 'desc' }));
      expect(comp.find('thead').length).to.eq(1);
      expect(comp.find('tbody').length).to.eq(1);
      expect(comp.find('thead tr').first().find('.sortable-table__th').length).to.eq(4);
      const sortHeaders = comp.find('.sortable-table__th.sortable-table__th--sortby');
      expect(sortHeaders.length).to.eq(1);
      expect(sortHeaders.first().props().className).to.include('sortable-table__th--sortby-desc');
      expect(sortHeaders.first().props().className).to.include('sortable-table__th--column-name');

      expect(comp.find('tbody tr').length).to.eq(3);

      // Reverse alphabetical by name
      expect(comp.find('tbody tr').first().find('.sortable-table__td--cell-name').first().text()).to.eq('Pat');

      const jack = comp.find('tbody tr').last();
      expect(jack.find('.sortable-table__td--cell-name').text()).to.eq('Jack');
      expect(jack.find('.sortable-table__td--cell-unsortable-random').text()).to.eq('');
    });
  });

  describe('basic HTML rendering with reversed order', () => {
    it('renders a table with well-labeled components', () => {
      const comp = mockComp(Table, props({ sortBy: 'Name', sortDirection: 'asc' }));

      // Alphabetical by name
      expect(comp.find('tbody tr').first().find('.sortable-table__td--cell-name').first().text()).to.eq('Jack');

      const pat = comp.find('tbody tr').last();
      expect(pat.find('.sortable-table__td--cell-name').text()).to.eq('Pat');
      expect(pat.find('.sortable-table__td--cell-unsortable-random').text()).to.eq('It\'s Pat!');
    });
  });

  describe('header clicking logic', () => {
    it('dispatches an action with the right info', () => {
      const onHeaderClick = sinon.spy();
      const comp = mockComp(Table, props({ sortBy: 'Name', sortDirection: 'desc', onHeaderClick }));
      const name = comp.find('thead tr .sortable-table__th').first();
      name.simulate('click');
      expect(onHeaderClick.lastCall.args[0]).to.eql({ name: 'Name', allowSortBy: true });
    });
  });

  describe('row and cell clicking logic', () => {
    it('calls the row click unless there is a cell click, which takes precedence', () => {
      const rowClick = sinon.spy();
      const cellClick = sinon.spy();
      const cells = [{ columnName: 'One', onClick: cellClick, fieldValue: 'First' }, { columnName: 'Two', fieldValue: 'Second' }];
      const columns = [{ name: 'One', allowSortBy: true }, { name: 'Two', allowSortBy: true }];
      const comp = mockComp(Table, props({ sortBy: 'Name', sortDirection: 'desc', rows: [{ cells, onClick: rowClick }], columns }));

      const firstCell = comp.find('.sortable-table__td--cell-one').first();
      const secondCell = comp.find('.sortable-table__td--cell-two').first();
      expect(firstCell.text()).to.eq('First');
      expect(secondCell.text()).to.eq('Second');

      firstCell.simulate('click');

      expect(cellClick.callCount).to.eq(1);
      expect(rowClick.callCount).to.eq(0);

      const cellArgs = cellClick.lastCall.args;
      expect(cellArgs[0].fieldValue).to.eq('First');
      expect(cellArgs[1]).to.eq(0);
      expect(cellArgs[2]).to.eq(0);

      secondCell.simulate('click');
      expect(cellClick.callCount).to.eq(1);
      expect(rowClick.callCount).to.eq(1);

      const rowArgs = rowClick.lastCall.args;
      expect(rowArgs[0].fieldValue).to.eq('Second');
      expect(rowArgs[1].onClick).to.exist;
      expect(rowArgs[1].cells instanceof Array).to.eq(true);
      expect(rowArgs[2]).to.eq(1);
      expect(rowArgs[3]).to.eq(0);
    });
  });
});
