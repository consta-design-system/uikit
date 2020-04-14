import * as React from 'react';

function M(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M13 2h-2v9H2v2h9v9h2v-9h9v-2h-9V2z" />
    </svg>
  );
}

export default M;
