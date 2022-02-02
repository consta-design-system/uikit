import * as React from 'react';

function PieImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M141 59.5a41.503 41.503 0 0 1-32.538 40.521 41.505 41.505 0 0 1-46.592-23.02 41.5 41.5 0 0 1 64.37-49.238l-13.37 15.869a20.75 20.75 0 1 0 7.38 15.868H141Z"
        fill="#DEE4E8"
      />
      <path
        d="M99.5 18a41.5 41.5 0 1 1-31.702 68.281l15.851-13.39a20.748 20.748 0 0 0 34.671-4.653 20.755 20.755 0 0 0-1.329-19.901A20.745 20.745 0 0 0 99.5 38.75V18Z"
        fill="#0078D2"
      />
    </svg>
  );
}

export default PieImage;
