import { redirectWithFlash } from './utils';
import { node, string, bool } from 'prop-types';

/**
 * Wraps a component, and takes a redirectIf condition, which determines whether the component
 * is redirected away from or rendered. If redirect, redirects to given redirectPath,
 * with the given flash message and message type.
 *
 * @param      {Object}  props
 * @param      {React.Component}  props.children      The child component to display
 * @param      {boolean}  props.redirectIf     The condition to fulfill in order to redirect
 * @param      {string}  props.redirectPath   Where to redirect if condition fails
 * @param      {string}  props.message         Flash message to display on redirect.
 * @param      {string}  props.type          String class of flash type (ie alert, notification, success)
 */
export function RedirectWithFlashUC ({ children, redirectIf, redirectPath, message, type }) {
  if (redirectIf) {
    redirectWithFlash(redirectPath, message, type);
    return null;
  } else {
    return children;
  }
}

RedirectWithFlashUC.propTypes = {
  children: node.isRequired,
  redirectIf: bool.isRequired,
  redirectPath: string.isRequired,
  message: string.isRequired
};

RedirectWithFlashUC.defaultProps = {
  type: 'notification'
};

export default RedirectWithFlashUC;
