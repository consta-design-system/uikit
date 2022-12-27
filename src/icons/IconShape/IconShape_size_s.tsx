import * as React from 'react';
import { SVGProps } from 'react';

const IconShapeSizeS = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 1h3v1h8V1h3v3h-1v8h1v3h-3v-1H4v1H1v-3h1V4H1V1zm3 11h8V4H4v8z"
    />
  </svg>
);
export default IconShapeSizeS;
