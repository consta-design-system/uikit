import * as React from 'react';
import { SVGProps } from 'react';

const IconWarningSizeS = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.14 1.493a1 1 0 0 1 1.723 0l6.999 11.886A1 1 0 0 1 15 14.886H1.002A1 1 0 0 1 .14 13.38l7-11.886zM9.1 13c0 .552-.492 1-1.1 1-.608 0-1.1-.448-1.1-1s.492-1 1.1-1c.608 0 1.1.448 1.1 1zM8 4a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0V5a1 1 0 0 0-1-1z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default IconWarningSizeS;
