import React from 'react';

/**
 * Renders an inline SVG version of the noon logo
 * @returns {React.Component}
 */
export function Logo () {
  return (
    <svg
      className="logo"
      version="1.1" id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 113.1 56.3"
      style={ { enableBackground: 'new 0 0 113.1 56.3' } }
      xmlSpace="preserve"
    >
      <g>
        <g>
          <path className="st0" d="M113.1,56.3h-2.7c0-14.3-5.6-27.8-15.8-37.9C84.5,8.3,70.9,2.7,56.5,2.7S28.6,8.3,18.5,18.4
            C8.3,28.5,2.7,41.9,2.7,56.3H0c0-15.1,5.9-29.2,16.6-39.8C27.2,5.8,41.4,0,56.5,0c15.1,0,29.3,5.8,40,16.5
            C107.2,27.1,113.1,41.2,113.1,56.3z" />
        </g>
        <path className="st0" d="M38.9,19.2c0-4.3,3.4-7.7,7.7-7.7s7.7,3.4,7.7,7.7S50.9,27,46.6,27S38.9,23.5,38.9,19.2z M46.6,24.2
          c2.7,0,5-2.2,5-5s-2.2-5-5-5c-2.7,0-5,2.2-5,5S43.9,24.2,46.6,24.2z" />
        <path className="st0" d="M66.4,27c-4.3,0-7.7-3.4-7.7-7.7s3.4-7.7,7.7-7.7s7.7,3.4,7.7,7.7S70.7,27,66.4,27z M71.4,19.2
          c0-2.7-2.2-5-5-5s-5,2.2-5,5s2.2,5,5,5S71.4,22,71.4,19.2z" />
        <polygon className="st0" points="33.1,36.5 26.9,30.1 39.1,30.8 40,30 29.8,19.5 27.8,21.4 34,27.8 21.9,27.1 21,28 31.1,38.4" />
        <polygon className="st0" points="75.1,31.7 81.4,25.4 80.9,37.5 81.8,38.4 92.1,28 90.1,26.1 83.8,32.4 84.3,20.3 83.4,19.4 73.1,29.7" />
      </g>
    </svg>
  );
}

export default Logo;
