import * as React from 'react';

function Xs(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" {...props}>
      <path d="M10 10H2v1h8v-1zM10 9H2L1 4l3 1 2-4 2 4 3-1-1 5z" />
    </svg>
  );
}

export default Xs;
