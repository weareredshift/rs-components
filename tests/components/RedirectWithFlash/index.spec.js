import { RedirectWithFlashUC } from 'components/RedirectWithFlash';
import React from 'react';

describe('<RedirectWithFlash />', () => {
  it('renders the content if the redirect conditions fail', () => {
    const redirect = sinon.spy();
    const comp = mockComp(RedirectWithFlashUC, { message: 'Hello', redirectIf: false, children: <span>I render</span>, redirect });
    expect(comp.text()).to.eq('I render');
    expect(redirect.lastCall).to.eq(null);
  });

  it('redirects if the redirect conditions pass', () => {
    const redirect = sinon.spy();
    const comp = mockComp(RedirectWithFlashUC, { message: 'Hello', redirectIf: true, children: <span>I render</span>, redirect });
    expect(comp.text()).to.eq('');
    expect(redirect.lastCall.args).to.eql([
      '/', // Default path
      'Hello',
      'notification' // Default type
    ]);
  });
});
