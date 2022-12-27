import * as React from 'react';
import { SVGProps } from 'react';

const IconTargetSizeS = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0zm-2 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
    />
  </svg>
);
export default IconTargetSizeS;
