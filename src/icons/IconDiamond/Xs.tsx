import * as React from 'react';

function Xs(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 12l5-8-2.727-3H3.727L1 4l4.286 6.857L3.727 4H6v8z"
      />
    </svg>
  );
}

export default Xs;
