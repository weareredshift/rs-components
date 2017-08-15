import React from 'react';
import InlineSearch from 'components/InlineSearch';

const makeComp = () => mockComp(InlineSearch, {
  options: [
    { name: 'Conor McGregor', image: <img src="http://media.ufc.tv/fighter_images/Conor_McGregor/205-McGREGOR_CONOR.png" /> },
    { name: 'Floyd Mayweather', image: <img src="http://thesource.com/wp-content/uploads/2017/08/fm-e1433941678273.jpg" /> },
    { name: 'Muhammad Ali', image: <img src="https://www.biography.com/.image/t_share/MTQ3NjYxMzk4NjkwNzY4NDkz/muhammad_ali_photo_by_stanley_weston_archive_photos_getty_482857506.jpg" /> }
  ],
  placeholder: 'Type here!',
  className: 'extra'
});

describe('<InlineSearch />', () => {
  it('displays no results without typing', () => {
    const comp = makeComp();
    expect(comp.props().className.includes('inlinesearch')).to.eq(true);
    expect(comp.props().className.includes('extra')).to.eq(true);
    expect(comp.find('.inlinesearch__noresult').first().text()).to.eq('Type here!');
  });

  it('focuses when you click the fake input', () => {
    const comp = makeComp();
    const fakeInput = comp.find('.inlinesearch__fake-input');

    expect(comp.state().focused).to.eq(false);
    fakeInput.simulate('click');
    expect(comp.state().focused).to.eq(true);
  });

  it('searches through items correctly, and displays images', () => {
    const comp = makeComp();

    comp.setState({ search: 'greg' });
    const result = comp.find('.inlinesearch__result').first();
    expect(result.text()).to.eq('Conor McGregor');
    expect(result.find('img').first().props().src.includes('Conor_McGregor')).to.eq(true);

    comp.setState({ search: 'Flo' });
    const newResult = comp.find('.inlinesearch__result').first();
    expect(newResult.text()).to.eq('Floyd Mayweather');
  });
});
