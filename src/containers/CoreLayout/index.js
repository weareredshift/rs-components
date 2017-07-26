import React from 'react';
import './CoreLayout.scss';

/**
 * Wrapper component for most components in app.
 * Provides basic layout.
 *
 * @extends React.Component
 * @param {Object} props
 * @param {Object} props.children - Component wrapped by CoreLayout
 * @returns {React.Component}
 */
export function CoreLayout (props) {
  const { children } = props;

  return (
    <div className={ `core__viewport` }>
      <div className="layout--relative">{ children }</div>
    </div>
  );
}

const { element, oneOfType, array } = React.PropTypes;
CoreLayout.propTypes = {
  children: oneOfType([element, array])
};

export default CoreLayout;
