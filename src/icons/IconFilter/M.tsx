import * as React from 'react';

function M(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M15 3h-2v2H2v2h11v1h2V3zM17 5h5v2h-5V5zM6 14v-1H2v-2h4V9h2v5H6zM20 17H2v2h18v1h2v-5h-2v2zM22 11H10v2h12v-2z" />
    </svg>
  );
}

export default M;
