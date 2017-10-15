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

  it('makes the request if the component can\'t load', () => {
    const request = sinon.spy();
    expect(request.callCount).to.eq(0);
    const comp = mockComp(RenderIfUC, { children: <span>Hello</span>, loader: <span>Loader</span>, shouldRender: false, request });
    expect(comp.text()).to.eq('Loader');
    expect(request.callCount).to.eq(1);
  });

  it('does not make the request if it has already', () => {
    const request = sinon.spy();
    expect(request.callCount).to.eq(0);
    const comp = mockComp(RenderIfUC, { children: <span>Hello</span>, loader: <span>Loader</span>, shouldRender: false, request, requested: true });
    expect(comp.text()).to.eq('Loader');
    expect(request.callCount).to.eq(0);
  });

  it('mapStateToProps converts test to shouldRender appropriately', () => {
    expect(mapStateToProps({
      stateKey: 'specialValue'
    }, { test: (state) => state.stateKey === 'specialValue' }).shouldRender).to.eq(true);

    expect(mapStateToProps({
      stateKey: 'specialValue'
    }, { test: (state) => state.stateKey === 'otherValue' }).shouldRender).to.eq(false);
  });
});
