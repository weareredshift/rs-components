import { connect } from 'react-redux';
import { node, func, bool, string } from 'prop-types';

import { logRequest } from './actions';

/**
 * Renders the given child if shouldRender is true. If not, renders the loader.
 *
 * @param      {Object}            props
 * @param      {React.Component}   props.children      Child component
 * @param      {boolean}           props.shouldRender  Whether the child should render
 * @param      {React.Component}   props.loader        The loader component
 * @param      {Function}          props.test          Test function. Given state object, returns true or false for whether
 *                                                     component should render.
 * @param      {string}            props.uid           Unique ID of component
 * @param      {Function}          props.request       If the component isn't ready to render, this function is called
 *                                                     with state an dispatch, to fetch necessary data.
 * @param      {boolean}           props.requested     Whether a request has been made for data
 */
export function RenderIfUC ({ children, shouldRender = false, loader = null, request, requested }) {
  const requestFunc = request || (() => {});
  if (shouldRender) {
    return children;
  } else {
    if (!requested) {
      requestFunc();
    }
    return loader;
  }
}

RenderIfUC.propTypes = {
  shouldRender: bool,
  test: func,
  children: node,
  loader: node,
  uid: string,
  request: func,
  requested: bool
};

export const mapStateToProps = (state, ownProps) => ({
  // Determine whether the component should render statically or using test function
  // given state object
  shouldRender: ownProps.shouldRender || (ownProps.test && ownProps.test(state)),
  requested: ownProps.request
    ? true
    : ownProps.requested || (state.renderIfRequests && state.renderIfRequests.get(ownProps.uid)),
  request: dispatch => () => { ownProps.request(state, dispatch); }
});

const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...stateProps,
  ...ownProps,
  request: () => {
    dispatch(logRequest(ownProps.uid));
    stateProps.request(dispatch);
  }
});

export default connect(mapStateToProps, undefined, mergeProps)(RenderIfUC);
