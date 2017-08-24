import React from 'react';
import { mapStateToProps, RenderIfUC } from 'components/RenderIf';

describe('<RenderIf />', () => {
  it('renders the component if shouldRender is true', () => {
    const comp = mockComp(RenderIfUC, { children: <span>Hello</span>, loader: <span>Loader</span>, shouldRender: true });
    expect(comp.text()).to.eq('Hello');
  });

  it('renders the loader if shouldRender is false', () => {
    const comp = mockComp(RenderIfUC, { children: <span>Hello</span>, loader: <span>Loader</span>, shouldRender: false });
    expect(comp.text()).to.eq('Loader');
  });

  it('mapStateToProps converts test to shouldRender appropriately', () => {
    expect(mapStateToProps({
      stateKey: 'specialValue'
    }, { test: (state) => state.stateKey === 'specialValue' })).to.eql({ shouldRender: true });

    expect(mapStateToProps({
      stateKey: 'specialValue'
    }, { test: (state) => state.stateKey === 'otherValue' })).to.eql({ shouldRender: false });
  });
});
