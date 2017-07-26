import React from 'react';

/**
 * Wrapper component for every route component in the app
 *
 * @extends React.Component
 * @param {Object} props
 * @param {Object} props.children               Current page component
 * @returns {React.Component}
 */
export function AppWrapper ({ children }) {
  return (
    <div id="app">
      { children }
    </div>
  );
}

const { element } = React.PropTypes;
AppWrapper.propTypes = {
  children: element.isRequired
};

export default AppWrapper;
