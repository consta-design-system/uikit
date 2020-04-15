import * as React from 'react';

function M(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 12c2.761 0 4.5-2.896 4.5-5.5S16.167 1 12 1 7.5 3.896 7.5 6.5 9.239 12 12 12zm-1 2c-5.5 0-8 2.053-8 8h18c0-6.667-3.5-8-8-8h-2z" />
    </svg>
  );
}

export default M;
