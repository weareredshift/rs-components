import { browserHistory } from 'react-router';

/**
 * Redirects to a path, and passes in a flash message for CoreLayout to render.
 *
 * @param      {string}  pathname The path to which to route
 * @param      {string}  flash    The flash message to display
 */
export function redirectWithFlash(pathname, flash, flashType = 'notification') {
  browserHistory.push({ pathname, state: { flash, flashType } });
}
