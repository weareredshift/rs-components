import _ from 'lodash';

const print = obj => JSON.stringify(obj, null, 2);

export const assertPass = (message) => {
  if (message) {
    it(message, () => { assert.isOk(true); });
  } else {
    assert.isOk(true);
  }
};

export const assertFail = (message, provideItBlock = false) => {
  if (provideItBlock) {
    it(message, () => { assert.fail(0, 1); });
  } else {
    assert.fail(0, 1, message);
  }
};

export const assertObjectEquality = (obj1, obj2) => {
  if (_.isEqual(obj1, obj2)) {
    assertPass();
  } else {
    assertFail(`\nExpected object equality:\n${print(obj1)}\n\n${print(obj2)}\n`);
  }
};

export const assertArrayEquality = (arr1, arr2) => {
  arr1.forEach((element, index) => {
    if (!_.isEqual(element, arr2[index])) {
      assertFail(`\nExpected array equality, but items at index ${index} are unequal:\n${print(arr1)}\n\n${print(arr2)}\n`);
    }
  });
  assertPass();
};
