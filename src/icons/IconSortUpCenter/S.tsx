import * as React from 'react';

function S(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path d="M10 5H6V3h4v2zM4 7v2h8V7H4zm-2 6h12v-2H2v2z" />
    </svg>
  );
}

export default S;
