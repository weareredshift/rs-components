import React from 'react';
import { TooltipUC } from 'components/Tooltip';

describe('<Tooltip />', () => {
  it('renders the tooltip content for the open ID', () => {
    const comp = mockComp(TooltipUC, {
      openTooltipID: 'tooltipID',
      id: 'tooltipID',
      triggerContent: <span>Click to open</span>,
      children: <p>Tooltip content</p>
    });

    expect(comp.find('p').first().text()).to.eq('Tooltip content');
  });

  it('does not render content when nothing matches', () => {
    const comp = mockComp(TooltipUC, {
      openModal: 'bs',
      id: 'tooltipID',
      triggerContent: <span>Click to open</span>,
      children: <p>Tooltip content</p>
    });

    expect(comp.find('p')).not.to.exist;
  });
});
