import AppWrapper from 'containers/AppWrapper';
import Explorer from './Explorer';

/**
 * @param {Object} store Redux store
 * @returns {Object[]} Object defining routes throughout app
 */
export function createRoutes () {
  return ([
    {
      path: '/',
      component: AppWrapper,
      indexRoute: { component: Explorer },
      childRoutes: [
        { path: '*', component: Explorer }
      ]
    }
  ]);
}

export default createRoutes;
