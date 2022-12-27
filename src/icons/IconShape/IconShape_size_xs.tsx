import * as React from 'react';
import { SVGProps } from 'react';

const IconShapeSizeXs = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 1h2v1h6V1h2v2h-1v6h1v2H9v-1H3v1H1V9h1V3H1V1zm2 8h6V3H3v6z"
    />
  </svg>
);
export default IconShapeSizeXs;
