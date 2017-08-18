import { GridSelector } from 'components/GridSelector';

describe('(Component) GridSelector', () => {
  let _wrapper;

  const callbackSpy = sinon.spy();

  beforeEach(() => {
    _wrapper = mockComp(GridSelector, {
      type: 'radio',
      callback: callbackSpy,
      items: [{
        label: 'Toggle',
        img: 'img/toggle.jpg'
      }, {
        label: 'Outlet',
        img: 'img/outlet.jpg'
      }]
    });
  });

  describe('GridSelector (radio)...', () => {
    it('should render a conaining div and as many selection elements as items' +
       'passed in', () => {
      expect(_wrapper).to.have.exactly(1).descendants('div.gridselector');
      expect(_wrapper).to.have.exactly(2).descendants('div.gridselector__item');
      expect(_wrapper).to.have.exactly(2).descendants('div.gridselector__icon');
    });

    it('should fire the callback function with an array of length 1 when an' +
       ' item is selected', () => {
      const toggleItem = _wrapper.find('.gridselector__item').first();
      const outletItem = _wrapper.find('.gridselector__item').last();
      toggleItem.simulate('click');
      expect(callbackSpy.calledWith(['toggle']));

      outletItem.simulate('click');
      expect(callbackSpy.calledWith(['outlet']));
    });
  });

  describe('GridSelector (checkbox)...', () => {
    const _wrapper = mockComp(GridSelector, {
      type: 'checkbox',
      callback: callbackSpy,
      items: [{
        label: 'Toggle',
        img: 'img/toggle.jpg'
      }, {
        label: 'Outlet',
        img: 'img/outlet.jpg'
      }]
    });

    it('should render a conaining div and as many selection elements as items' +
       'passed in', () => {
      expect(_wrapper).to.have.exactly(1).descendants('div.gridselector');
      expect(_wrapper).to.have.exactly(2).descendants('div.gridselector__item');
      expect(_wrapper).to.have.exactly(2).descendants('div.gridselector__icon');
    });

    it('should fire the callback function with an array of as many items as' +
       ' selected', () => {
      const toggleItem = _wrapper.find('.gridselector__item').first();
      const outletItem = _wrapper.find('.gridselector__item').last();
      toggleItem.simulate('click');
      expect(callbackSpy.calledWith(['toggle']));

      outletItem.simulate('click');
      expect(callbackSpy.calledWith(['toggle', 'outlet']));
    });
  });
});
