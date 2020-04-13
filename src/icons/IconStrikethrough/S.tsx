import * as React from 'react';

function S(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path d="M7 14h2v-4H7v4zM3 2v2h4v2h2V4h4V2H3zM2 9h12V7H2v2z" />
    </svg>
  );
}

export default S;
