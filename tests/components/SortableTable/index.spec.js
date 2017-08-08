import { SortableTableUC } from 'components/SortableTable';
const Table = SortableTableUC;
import data from 'components/__fixtures__/SortableTable/ObjectColumns';

const props = (other) => ({
  onHeaderClick: () => {},
  ...data.props,
  ...other
});

describe('<SortableTable /<', () => {
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
});
