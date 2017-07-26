import validators from 'components/BaseForm/validators';

let val;

describe('validators', () => {
  describe('email', () => {
    beforeEach(() => { val = validators.email(); });

    it('rejects invalid emails', () => {
      expect(val('fake@incomplete')).to.eq('That email doesn\'t look right.');
    });

    it('accepts valid emails', () => {
      expect(val('fake@complete.com')).to.eq(null);
    });
  });

  describe('length', () => {
    beforeEach(() => { val = validators.length(5); });

    it('rejects short strings', () => {
      expect(val('tiny')).to.eq('Value must be 5 or more characters.');
    });

    it('accepts sufficiently long strings', () => {
      expect(val('longstring')).to.eq(null);
    });
  });

  describe('presence', () => {
    beforeEach(() => { val = validators.presence(); });

    it('rejects empty fields', () => {
      expect(val()).to.eq('Missing required fields.');
      expect(val(null)).to.eq('Missing required fields.');
      expect(val('')).to.eq('Missing required fields.');
      expect(val('', 'Field name')).to.eq('Field Name is required.');
    });

    it('accepts fields with any content', () => {
      expect(val('a')).to.eq(null);
    });
  });

  describe('equalsField', () => {
    beforeEach(() => { val = validators.equalsField('password'); });

    it('rejects the field if it is not equal to its comparison', () => {
      expect(val('mypassword', 'password confirmation', { password: 'myPassword' }))
        .to.eq('Password Confirmation must equal Password.');
    });

    it('accepts equal fields', () => {
      expect(val('myPassword', 'password confirmation', { password: 'myPassword' }))
        .to.eq(null);
    });
  });

  describe('differsFromField', () => {
    beforeEach(() => { val = validators.differsFromField('password'); });

    it('rejects the field if it is equal to its comparison', () => {
      expect(val('myPassword', 'password confirmation', { password: 'myPassword' }))
        .to.eq('Password Confirmation must be different from Password.');
    });

    it('accepts differing fields', () => {
      expect(val('myPassword', 'password confirmation', { password: 'mypassword' }))
        .to.eq(null);
    });
  });

  describe('multiple', () => {
    beforeEach(() => {
      val = validators.multiple([validators.email(), validators.length(20)]);
    });

    it('allows for multiple field validtors', () => {
      expect(val('fake@incomplete')).to.eq('That email doesn\'t look right.');
      expect(val('fake@complete.com', 'Email')).to.eq('Email must be 20 or more characters.');
      expect(val('fakeandlong@complete.com')).to.eq(null);
    });
  });

  describe('phone', () => {
    beforeEach(() => {
      val = validators.phone();
    });

    it('accepts phones in a variety of acceptable formats', () => {
      expect(val('1234567890')).to.eq(null);
      expect(val('(123)456-7890')).to.eq(null);
      expect(val('(123)-456-7890')).to.eq(null);
      expect(val('123-456-7890')).to.eq(null);
      expect(val('(123)-4567890')).to.eq(null);
      expect(val('(123)4567890')).to.eq(null);
      expect(val('123 456 7890')).to.eq(null);
      expect(val('123 456-7890')).to.eq(null);
      expect(val('+123-456-7890')).to.eq(null);
    });

    it('rejects phones in improper formats', () => {
      const error = 'Please enter a complete 10-digit phone number, with area code.';
      expect(val('4567890')).to.eq(error);
      expect(val('456-7890')).to.eq(error);
      expect(val('1-123-456-7890')).to.eq(error);
      expect(val('001-123-456-7890')).to.eq(error);
      expect(val('abc-efg-hijk')).to.eq(error);
    });
  });

  describe('website', () => {
    beforeEach(() => {
      val = validators.website();
    });

    it('accepts websites in a variety of acceptable formats', () => {
      expect(val('https://www.google.com')).to.eq(null);
      expect(val('http://www.google.com')).to.eq(null);
      expect(val('http://google.com')).to.eq(null);
      expect(val('https://google.com')).to.eq(null);
      expect(val('www.google.com')).to.eq(null);
      expect(val('google.co.uk')).to.eq(null);
      expect(val('google.com')).to.eq(null);
      expect(val('google.nz')).to.eq(null);
      expect(val('sub.domain.com')).to.eq(null);
      expect(val('https://sub.domain.com')).to.eq(null);
    });

    it('rejects websites in improper formats', () => {
      const error = 'Please enter a valid website URL.';
      expect(val('google.c')).to.eq(error);
      expect(val('htt://www.google.com')).to.eq(error);
      expect(val('://www.google.com')).to.eq(error);
    });
  });
});
