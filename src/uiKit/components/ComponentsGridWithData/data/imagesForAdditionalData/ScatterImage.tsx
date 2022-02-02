import * as React from 'react';

function ScatterImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 0 1 4-4h192a4 4 0 0 1 4 4v112a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
        fill="#fff"
      />
      <path
        d="M21 25h157M21 60h157M21 94h157"
        stroke="#002033"
        strokeOpacity={0.08}
        strokeWidth={2}
        strokeDasharray="4 4"
      />
      <circle cx={44} cy={77} r={6} fill="#0078D2" />
      <circle cx={126} cy={34} r={6} transform="rotate(90 126 34)" fill="#0078D2" />
      <circle cx={84} cy={48} r={4} fill="#0078D2" />
      <circle cx={161} cy={52} r={4} transform="rotate(90 161 52)" fill="#0078D2" />
      <circle cx={122.5} cy={80.5} r={9.5} transform="rotate(90 122.5 80.5)" fill="#0078D2" />
      <circle cx={44.5} cy={36.5} r={2.5} transform="rotate(90 44.5 36.5)" fill="#0078D2" />
    </svg>
  );
}

export default ScatterImage;
