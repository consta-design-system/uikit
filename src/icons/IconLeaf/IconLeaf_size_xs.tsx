import * as React from 'react';
import { SVGProps } from 'react';

const IconLeafSizeXs = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.001 5.001 6 5l-5 5 1 1c.342-.514.978-1.32 1.666-2.16 1.444.334 3.888.608 5.334-.838 2.148-2.148 2-8 2-8s-5.852-.148-8 2c-1.321 1.321-1.206 3.476-.922 4.94C5.426 3.788 9 2.001 9 2.001l-2.999 3z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path d="M0 0h11v11H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default IconLeafSizeXs;
