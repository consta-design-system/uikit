import * as React from 'react';

function S(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path d="M2 3h12v2H2V3zM4 7h8v2H4V7zM10 11H6v2h4v-2z" />
    </svg>
  );
}

export default S;
