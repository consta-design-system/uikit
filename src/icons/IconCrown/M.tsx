import * as React from 'react';

function M(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M4 18h16v3H4zM20 16H4L2 7l6 3 4-7 4 7 6-3-2 9z" />
    </svg>
  );
}

export default M;
