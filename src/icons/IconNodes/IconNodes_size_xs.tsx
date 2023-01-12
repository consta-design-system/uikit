import * as React from 'react';
import { SVGProps } from 'react';

const IconNodesSizeXs = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)">
      <path d="M2.5 2a1 1 0 0 0-1 1v.5a2.5 2.5 0 0 1 0 5V9a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-.5a2.5 2.5 0 0 1 0-5V3a1 1 0 0 0-1-1h-7z" />
      <path d="M12 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM1.5 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    </g>
    <defs>
      <clipPath id="a">
        <path d="M0 0h12v12H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default IconNodesSizeXs;
