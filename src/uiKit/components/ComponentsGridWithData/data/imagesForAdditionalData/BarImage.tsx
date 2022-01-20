import * as React from 'react';

function BarImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 0 1 4-4h192a4 4 0 0 1 4 4v112a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
        fill="#fff"
      />
      <path
        d="M100 25v69M179 25v69M21 25v69"
        stroke="#002033"
        strokeOpacity={0.08}
        strokeWidth={2}
        strokeDasharray="4 4"
      />
      <path d="M20 32h142v20H20V32Z" fill="#0078D2" />
      <path d="M20 66h105v20H20V66Z" fill="#DEE4E8" />
    </svg>
  );
}

export default BarImage;
