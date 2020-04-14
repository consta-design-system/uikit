import * as React from 'react';

function S(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path d="M2 13h12v2H2zM14 11H2L1 4l4 3 3-6 3 6 4-3-1 7z" />
    </svg>
  );
}

export default S;
