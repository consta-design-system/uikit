import * as React from 'react';

function S(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path d="M4 3H2v2h2V3zM14 3H5v2h9V3zM5 7h9v2H5V7zM14 11H5v2h9v-2zM2 7h2v2H2V7zM4 11H2v2h2v-2z" />
    </svg>
  );
}

export default S;
