import * as React from 'react';

function Xs(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path d="M13 3H3v2h10V3zM1 7h14v2H1V7zM3 11h10v2H3v-2z" />
    </svg>
  );
}

export default Xs;
