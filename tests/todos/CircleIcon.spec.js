import CircleIcon from 'components/CircleIcon';

describe('<CircleIcon />', () => {
  it('renders an icon with the given props', () => {
    const comp = mockComp(CircleIcon, {
      src: 'source', alt: 'alt text'
    });

    expect(comp.find('.circleicon').first().find('.circleicon__circle')).to.exist;
    expect(comp.find('img').first().props().src).to.eq('source');
    expect(comp.find('img').first().props().alt).to.eq('alt text');
  });
});
