import * as React from 'react';

function M(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M20.8 3H3.2C1.99 3 1.011 4.013 1.011 5.25L1 18.75C1 19.988 1.99 21 3.2 21h17.6c1.21 0 2.2-1.012 2.2-2.25V5.25C23 4.013 22.01 3 20.8 3zm0 15.75H3.2V7.5l8.8 5.625L20.8 7.5v11.25zM12 10.875L3.2 5.25h17.6L12 10.875z" />
    </svg>
  );
}

export default M;
