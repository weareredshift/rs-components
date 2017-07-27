import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import isExternal from 'is-url-external';
import { string, func, bool, oneOfType, element, object } from 'prop-types';

/**
 * A flexible link which can to app-internal pages and app-external pages,
 * as well as executing a callback before redirecting, and passing data
 * through the react-router state to the next page.
 *
 * @param      {Object}    props            React props
 * @param      {Object|string}    props.to  Where to redirect to
 * @param      {boolean}   props.className  Additional classes to apply
 * @param      {Function[]}  props.beforeGo Optional function to execute before redirect
 * @param      {boolean}   props.newTab     Whether to open in new tab (for external link)
 * @param      {Function}  props.goInteral  Function to route to location in app (passed in by mapStateToProps)
 * @param      {Object}    props.children   String or component to display within link
 * @param      {Object[]}  props.data       Optional data to send along with internal link
 *
 * @return     {React.Component}
 */
export function Link ({ to, className, beforeGo, openNewTab, goInternal, children, data }) {
  const external = isExternal(to) || openNewTab;

  const linkProps = {
    children,
    href: to,
    className: 'link rscomp '.concat(className),
    onClick: () => {
      console.log(children, external ? 'EXTERNAL' : 'INTERNAL');
      beforeGo && beforeGo(data);
      if (!external && !openNewTab) {
        goInternal(
          data
            ? { pathname: to, state: data }
            : to
        );
      }
    },
    target: openNewTab ? '_blank' : undefined
  };

  return (
    <a { ...linkProps } />
  );
}

Link.propTypes = {
  to: string.isRequired,
  className: string,
  beforeGo: func,
  children: oneOfType([element, string]).isRequired,
  data: object,
  goInternal: func.isRequired,
  openNewTab: bool
};

Link.defaultProps = {
  className: '',
  newTab: false,
  openNewTab: false
};

const mapStateToProps = () => ({
  goInternal: browserHistory.push
});

export default connect(mapStateToProps)(Link);
