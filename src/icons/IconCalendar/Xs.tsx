import * as React from 'react';

function Xs(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 0a.5.5 0 00-.5.5V2H1a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1h-1V.5a.5.5 0 00-1 0V2H3V.5a.5.5 0 00-.5-.5zM11 4H1v6h10V4z"
      />
    </svg>
  );
}

export default Xs;
