import React from 'react';
import './CircleIcon.scss';

/**
 * Renders a grey circle with a monotone white and grey icon
 * @param {Object} props           React props object
 * @param {string} props.src       Source of the icon image
 * @param {string} props.alt       Alt text of the icon image
 * @returns {React.Component}       Returns react component
 */
export function CircleIcon (props) {
  const { src, alt } = props;
  return (
    <div className="circleicon">
      <div className="circleicon__circle" />
      <img src={ src } alt={ alt } />
    </div>
  );
};

CircleIcon.propTypes = {
  src: React.PropTypes.string,
  alt: React.PropTypes.string
};

export default CircleIcon;
