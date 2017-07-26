import { objectFromKeyValueArray } from 'utils/object';

describe('objectFromKeyValueArray', () => {
  it('handles a sensible array', () => {
    const array = [['key', 'val'], ['key2', {}], ['key3', 3]];
    const obj = objectFromKeyValueArray(array);
    expect(obj).to.eql({
      key: 'val',
      key2: {},
      key3: 3
    });
  });
});
