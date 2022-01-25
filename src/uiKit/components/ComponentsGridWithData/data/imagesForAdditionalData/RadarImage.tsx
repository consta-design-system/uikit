import * as React from 'react';

function RadarImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 0 1 4-4h192a4 4 0 0 1 4 4v112a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
        fill="#fff"
      />
      <circle opacity={0.5} cx={99.5} cy={59.5} r={41} stroke="#DEE4E8" />
      <circle opacity={0.5} cx={99.5} cy={59.5} r={30} stroke="#DEE4E8" />
      <circle opacity={0.5} cx={99.5} cy={59.5} r={20} stroke="#DEE4E8" />
      <circle opacity={0.5} cx={99.5} cy={59.5} r={11} stroke="#DEE4E8" />
      <path
        opacity={0.5}
        d="M100 18v83M141 59.5H58M70.655 30.155l57.983 57.983M70.655 88.845l57.983-57.983"
        stroke="#DEE4E8"
      />
      <path
        d="M85.5 45 100 18.5v21l14 6 26.5 14H100l14 14-14 27-29.5-12-1-29 16-14.5Z"
        stroke="#0078D2"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default RadarImage;
