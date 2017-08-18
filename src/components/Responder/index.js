import React from 'react';
import { connect } from 'react-redux';
import { object, node } from 'prop-types';

import { setClass, defaultBreakpoints } from './utils';

/**
 * Wrapper component which watches window size and passes calculated classes to children.
 *
 * @param      {Object}  props
 * @param      {Object}  props.classes      Object mapping breakpoints to their respective classes.
 * @param      {React.Component}  props.children     The child to be passed calculated classes
 * @param      {[Object]}  props.breakpoint   The Redux breakpoint object
 * @param      {[Object]}  props.breakpoints  Object defining breakpoints for the app.
 */
export function RespondUC ({ classes, children, breakpoint, breakpoints }) {
  const finalBreakpoints = Object.assign(defaultBreakpoints, breakpoints);
  return (
    <div className="respond rscomp">
      {
        React.cloneElement(
          children,
          {
            className: setClass(classes, breakpoint, finalBreakpoints)
          }
        )
      }
    </div>
  );
}

RespondUC.propTypes = {
  classes: object.isRequired,
  children: node.isRequired,
  breakpoint: object.isRequired,
  breakpoints: object
};

RespondUC.defaultProps = {
  breakpoints: {}
};

const mapStateToProps = state => ({
  breakpoint: state.breakpoint
});

export default connect(mapStateToProps)(RespondUC);
