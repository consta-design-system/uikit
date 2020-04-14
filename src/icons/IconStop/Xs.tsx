import * as React from 'react';

function Xs(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" {...props}>
      <path d="M2 3h7v7H2z" />
    </svg>
  );
}

export default Xs;
