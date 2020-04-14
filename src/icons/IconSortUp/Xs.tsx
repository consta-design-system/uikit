import * as React from 'react';

function Xs(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" {...props}>
      <path d="M5 3v1H1V3h4zM8 7V6H1v1h7zM11 10V9H1v1h10z" />
    </svg>
  );
}

export default Xs;
