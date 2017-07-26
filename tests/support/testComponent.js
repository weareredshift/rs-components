import _ from 'lodash';
import parseFunc from 'support/parseFunc';
import { assertFail, assertPass } from './assertions';

const rendersElement = (comp, givenProps, searchFor) => {
  const props = { breakpoint: {} }; // Default props that might be passed to any component
  const logs = [];

  _.keys(comp.propTypes).forEach(propName => {
    if (givenProps[propName]) {
      props[propName] = givenProps[propName];
    } else {
      // Store un-given prop name to list if render fails
      logs.push('   - '.concat(propName));
    }
  });

  const element = mockComp(comp, props);

  // Rendering elements with connected children throws an error,
  // so instead, check tree for div or specified component (string or component).
  const foundElement = element.find(searchFor);

  if (foundElement.length) {
    return true;
  } else {
    if (logs.length) { logs.unshift('  Declared props which weren\'t supplied:'); }
    logs.unshift(`  Given child to search for:\n   - ${searchFor}`);
    logs.unshift('\nFailed to render any HTML elements or specified children.');
    assertFail(logs.join('\n'), true);
  }
};

const requiresAllNecessaryProps = (comp, givenProps) => {
  const necessaryButNotExplicitlyRequiredProps = _.keys(givenProps).filter(key => {
    const props = comp.propTypes;
    const explicitlyRequiredProps = _.keys(props).filter(prop => !props[prop].isRequired); // Unintuitive, but true
    return explicitlyRequiredProps.indexOf(key) === -1;
  });

  if (necessaryButNotExplicitlyRequiredProps.length > 0) {
    const note = 'Props are passed in to pass test but not explicitly required in propTypes:';
    assertFail([note, necessaryButNotExplicitlyRequiredProps.map(prop => `- ${prop}`)].join('\n'), true);
    return false;
  } else {
    return true;
  }
};

const isExportedCorrectly = (unconnected, connected) => {
  const isCorrect = [connected, unconnected].filter(comp => typeof comp === 'function').length === 2;
  if (!isCorrect) {
    assertFail('Not exported in both connected and unconnected forms!', true);
    return false;
  }
  return true;
};

export default function testComponent ({ name, connected, unconnected, props = {}, searchFor = 'div' }) {
  const presentName = name || (unconnected && parseFunc(unconnected).name) || 'NameNotFound';
  describe(`<${presentName} />`, () => {
    const passes = isExportedCorrectly(unconnected, connected) &&
      requiresAllNecessaryProps(unconnected, props) &&
      rendersElement(unconnected, props, searchFor);

    if (passes) {
      assertPass('Follows all basic component rules', true);
    }
  });
}
