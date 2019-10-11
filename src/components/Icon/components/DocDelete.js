import React from 'react';
const SVG = props => {
  switch (props.size) {
    case 'm':
      return (
        <svg fill={`${currentColor}`} width="24" height="24">
          <path d="M4.01 4c0-1.1.89-2 1.99-2h7.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V20c0 1.1-.9 2-2 2H5.99C4.89 22 4 21.1 4 20l.01-16zM13 3.5V8a1 1 0 001 1h4.5L13 3.5zm-.3 12.314l1.414-1.414 1.414 1.414 1.415-1.414 1.414 1.414-1.414 1.415 1.414 1.414-1.414 1.414-1.415-1.414-1.414 1.414-1.414-1.414 1.414-1.415-1.414-1.414z" />
        </svg>
      );
    case 's':
      return (
        <svg fill={`${currentColor}`} width="16" height="16">
          <g clipPath="url(#clip0)">
            <path d="M13.56 4.354a1.5 1.5 0 01.44 1.06V14a1 1 0 01-1 1H3a1 1 0 01-1-1V1a1 1 0 011-1h5.586a1.5 1.5 0 011.06.44l3.915 3.914zM9.5 5h3.293L9 1.207V4.5a.5.5 0 00.5.5zm1.656 7.863L9.5 11.207l-1.635 1.635-.707-.707L8.793 10.5 7.137 8.844l.707-.707L9.5 9.793l1.635-1.635.707.707-1.635 1.635 1.656 1.656-.707.707z" />
          </g>
          <defs>
            <clipPath id="clip0">
              <path d="M0 0h16v16H0z" />
            </clipPath>
          </defs>
        </svg>
      );
  }
};
export default SVG;
