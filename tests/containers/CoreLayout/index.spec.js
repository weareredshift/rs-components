import React from 'react';
import { CoreLayout } from 'containers/CoreLayout';

describe('(Layout) Core', () => {
  it('Should render as a <div>.', () => {
    const comp = mockComp(CoreLayout, { children: <div /> });
    expect(comp.type()).to.equal('div');
  });
});
