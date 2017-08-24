import { connect } from 'react-redux';
import { node, func, bool } from 'prop-types';

/**
 * Renders the given child if shouldRender is true. If not, renders the loader.
 *
 * @param      {Object}   props
 * @param      {React.Component}   props.children        Child component
 * @param      {boolean}  props.shouldRender  Whether the child should render
 * @param      {React.Component}   props.loader        The loader component
 * @param      {Function} props.test          Test function. Given state object, returns true or false for whether
 *                                            component should render.
 */
export function RenderIfUC ({ children, shouldRender = false, loader = null }) {
  if (shouldRender) {
    return children;
  } else {
    return loader;
  }
}

RenderIfUC.propTypes = {
  shouldRender: bool.isRequired,
  test: func,
  children: node,
  loader: node
};

export const mapStateToProps = (state, ownProps) => ({
  // Determine whether the component should render statically or using test function
  // given state object
  shouldRender: ownProps.shouldRender || (ownProps.test && ownProps.test(state))
});

export default connect(mapStateToProps)(RenderIfUC);
