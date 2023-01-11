import * as React from 'react';
import { SVGProps } from 'react';

const IconPanelLeftSizeS = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7 5H3v6h4V5z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 2h16v12H0V2zm2 2h12v8H2V4z"
    />
  </svg>
);
export default IconPanelLeftSizeS;
