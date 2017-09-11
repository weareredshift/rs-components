import React from 'react';
import { ResponderUC } from 'components/Responder';
const Responder = ResponderUC;

describe('<Responder />', () => {
  it('calculates classes from the breakpoint, and combines them with the child classes', () => {
    const comp = mockComp(Responder, {
      children: <span className="im already here">Hello</span>,
      breakpoint: { name: 'tabletLg' },
      classes: {
        default: 'defaultClass',
        mobileSm: 'mobileSmClass',
        mobileMd: 'mobileMdClass',
        mobileLg: 'mobileLgClass',
        tabletSm: 'tabletSmClass',
        tabletMd: 'tabletMdClass',
        tabletLg: 'tabletLgClass',
        desktopSm: 'desktopSmClass',
        desktopMd: 'desktopMdClass',
        desktopLg: 'desktopLgClass'
      }
    });

    const result = comp.find('span').first();
    expect(result.props().className).to.eq('im already here tabletLgClass');
  });
});
