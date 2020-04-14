import * as React from 'react';

function Xs(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" {...props}>
      <path d="M8 3v1H4V3h4zM9 7V6H3v1h6zM11 10V9H1v1h10z" />
    </svg>
  );
}

export default Xs;
