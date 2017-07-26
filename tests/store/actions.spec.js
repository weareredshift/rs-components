import _ from 'lodash';

import * as mainActions from 'store/actions';
import parse from 'support/parseFunc';

// Ignore specialized actions
const exceptions = [
  'updateLocation'
];

const actions = { ...mainActions };

const recursivelyTestFunctions = (object, ifFunctionCallback) => {
  _.keys(object).filter(key => exceptions.indexOf(key) === -1).forEach(key => {
    if (object[key] instanceof Function) {
      ifFunctionCallback(key, object);
    } else {
      recursivelyTestFunctions(object[key], ifFunctionCallback);
    }
  });
};

const they = it; // To get the tests reading like basic English

describe('Redux actions', () => {
  they('have appropriate types', () => {
    const assertFunctionType = (keyName, actionObject) => {
      const typeCased =
              _.kebabCase(keyName)
              .split('-')
              .map(w => w.toUpperCase())
              .join('_');

      expect(actionObject[keyName](1, 2).type).to.equal(typeCased);
    };

    recursivelyTestFunctions(actions, assertFunctionType);
  });

  they('construct object predictably from argument(s)', () => {
    const testThatArgsPassedCorrectly = (key, actionObject) => {
      const argNameArray = parse(actionObject[key]).arguments;
      const args = _.map(argNameArray, (arg, index) => `Argument-${index}`);
      const response = actionObject[key](...args);

      // Make sure the args get added to the action object under the appropriate/predictable argKey
      argNameArray.forEach((argumentName, i) => {
        if (argumentName && argumentName.length) {
          if (response[argumentName] === args[i]) {
            // Pass
          } else {
            const stringComponents = [
              `\nExpected the argument '${argumentName}' to be associated with a key of the same name.`,
              'Returned object:',
              `\n  ${JSON.stringify(response)}`
            ];

            assert.fail(0, 1, stringComponents.join('\n'));
          }
          expect(response[argumentName]).to.eq(args[i]);
        }
      });
    };

    recursivelyTestFunctions(actions, testThatArgsPassedCorrectly);
  });
});
