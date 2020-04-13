import * as React from 'react';

function M(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M11 12c2.761 0 4.5-2.896 4.5-5.5S15.167 1 11 1 6.5 3.896 6.5 6.5 8.239 12 11 12zM10 14c-5.5 0-8 2.053-8 8h18c0-6.667-3.5-8-8-8h-2z" />
    </svg>
  );
}

export default M;
