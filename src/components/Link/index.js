import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import isExternal from 'is-url-external';
import { string, func, object, oneOfType, element } from 'prop-types';

/**
 * A flexible link which can to app-internal pages (using react-router) and
 * app-external pages, as well as executing a callback before redirecting,
 * and passing data through the react-router state to the next page.
 *
 * @param      {Object}           props            React props
 * @param      {Object|string}    props.to         Where to redirect to
 * @param      {string[]}         props.className  Additional classes to apply
 * @param      {Function[]}       props.beforeGo   Optional function to execute before redirect
 * @param      {Function}         props.goInternal Function to route to location in app (passed in by mapStateToProps)
 * @param      {Object[]}         props.data       Optional data to send along with internal link
 * @param      {string}           props.target     Typical 'a' tag target prop. If _blank given, opens new tab.
 * @param      {Object[]}         props.style      Optional style object
 * @param      {Object}           props.children   String or component to display within link
 *
 * @return     {React.Component} A tag which handles variable link types
 */
export function LinkUC (props) {
  const { to, className, beforeGo, goInternal, data, target, style, children } = props;

  const linkProps = {
    href: to,
    className: classnames('link rscomp', className),
    onClick: (e) => {
      const routeInternally = !isExternal(to) && target !== '_blank';
      if (routeInternally) e.preventDefault(); // Don't follow href for internal links

      beforeGo && beforeGo();

      if (routeInternally) {
        goInternal(
          data
            ? { pathname: to, state: data }
            : to
        );
      }
    },
    style,
    target,
    children
  };

  return (
    <a { ...linkProps } />
  );
}

LinkUC.propTypes = {
  to: string.isRequired,
  className: string,
  beforeGo: func,
  data: object,
  goInternal: func,
  target: string,
  style: object,
  children: oneOfType([string, element])
};

LinkUC.defaultProps = {
  className: '',
  newTab: false,
  openNewTab: false
};

const mapStateToProps = () => ({
  goInternal: browserHistory.push
});

export default connect(mapStateToProps)(LinkUC);
