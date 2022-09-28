import * as React from 'react';

const DragNDropFieldImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <path
        stroke="#004166"
        strokeOpacity={0.2}
        strokeWidth={2}
        strokeDasharray="4 4"
        d="M21 16h158v88H21z"
      />
      <rect x={77} y={75} width={46} height={14} rx={2} fill="#0078D2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105.778 45.879a3 3 0 00-4.242 0l-7.072 7.07a5 5 0 107.072 7.072l5.683-5.684 1.414 1.415-5.683 5.683a7 7 0 01-9.9-9.9l7.071-7.07a5 5 0 117.071 7.07l-7.06 7.061a3 3 0 11-4.243-4.243L102.243 48l1.414 1.414-6.353 6.354a1 1 0 001.414 1.414l7.06-7.06a3 3 0 000-4.243z"
        fill="#004166"
        fillOpacity={0.2}
      />
    </svg>
  );
};

export default DragNDropFieldImage;
