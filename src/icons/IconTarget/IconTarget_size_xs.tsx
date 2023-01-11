import * as React from 'react';
import { SVGProps } from 'react';

const IconTargetSizeXs = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 6A5 5 0 1 1 1 6a5 5 0 0 1 10 0zm-1 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
    />
  </svg>
);
export default IconTargetSizeXs;
