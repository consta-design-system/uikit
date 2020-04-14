import * as React from 'react';

function S(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path d="M2 3h12v2H2V3zM2 7h8v2H2V7zM6 11H2v2h4v-2z" />
    </svg>
  );
}

export default S;
