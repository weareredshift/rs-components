import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, string, oneOfType, object, node, array, shape, func } from 'prop-types';
import { setOpenDropdownID } from '../Dropdown/actions';

const closestParent = (el, predicate) => el && (predicate(el) ? el : closestParent(el.parentNode, predicate));

const getClassList = (className) => {
  let classList = [];

  if (typeof className === 'string') {
    classList = className.split(' ');
  } else if (typeof className === 'object' && className.baseVal) {
    classList = className.baseVal.split(' ');
  }

  return classList;
};

const ifNotInParents = (event, targetClasses, callback) => {
  const target = event.target;

  const hasParentWithTargetClass = targetClasses.some(targetClass => closestParent(target, el => (
    getClassList(el.className).indexOf(targetClass) !== -1
  )));

  if (!hasParentWithTargetClass) { callback(); }
};

/**
 * Watches for click, and dispatches actions according to passed watchables. For example, wrapped around app HTML,
 * it will wait for clicks, and, if they fall outside of given classes, will dispatch associated actions.
 *
 * @param      {Object}             props
 * @param      {React.Component}    props.children
 * @param      {Function}           props.dispatch
 * @param      {Object[]}           props.watchables            List of watchables to react to
 * @param      {string[]}           props.watchables[].classes  List of classes under which NOT to dispatch action
 * @param      {Object}             props.watchables[].action   Action to dispatch when clicked outside of classes
 * @param      {string[]}           props.watchables[].stateKey Key of Redux state object to watch. When truthy, component will dispatch
 * @param      {*[]}              props.watchables[].stateValue Value of Redux state object to watch. When truthy, comp will dispatch
 */
export function OutsideClickWatcherUC ({ children, dispatch, watchables }) {
  const dispatchAsNecessary = (event) => {
    watchables.forEach(watchable => {
      if (watchable.stateValue) {
        ifNotInParents(event, watchable.classes, () => {
          dispatch(watchable.action);
        });
      }
    });
  };

  return (
    <div className="close-on-click rscomp" onClick={ (e) => { dispatchAsNecessary(e); } }>
      { children }
    </div>
  );
}

OutsideClickWatcherUC.propTypes = {
  children: oneOfType([node, array, string]).isRequired,
  watchables: arrayOf(
    shape({
      classes: arrayOf(string),
      action: object,
      stateKey: string
    })
  ),
  dispatch: func
};

OutsideClickWatcherUC.defaultProps = {
  watchables: []
};

const mapStateToProps = (state, { watchables }) => {
  const dropdownDefault = {
    classes: ['dropdown'],
    action: setOpenDropdownID(null),
    stateKey: 'openDropdownID'
  };

  // Combine default and given dropdown classes, or add dropdown as default watchable
  let dropdownWatchable = watchables.find(w => w.classes.includes('dropdown'));
  if (dropdownWatchable) {
    dropdownWatchable = Object.assign(dropdownDefault, dropdownWatchable);
  } else {
    watchables.push(dropdownDefault);
  }

  return {
    // Convert the key of the state value being watched
    // to the actual value
    watchables: Object.keys(watchables)
      .reduce((obj, key) => Object.assign(
        obj,
        {
          [key]: Object.assign(
            watchables[key],
            watchables[key].stateKey ? { stateValue: state[watchables[key].stateKey] } : {},
            { stateKey: undefined }
          )
        }
      ), {})
  };
};

export default connect(mapStateToProps)(OutsideClickWatcherUC);
