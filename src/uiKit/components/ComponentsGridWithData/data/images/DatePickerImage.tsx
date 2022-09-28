import * as React from 'react';

const DatePickerImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#ECF1F4"
      />
      <rect x={33} y={40} width={134} height={40} rx={4} fill="#fff" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M52 53a1 1 0 00-1 1v1h-2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V56a1 1 0 00-1-1h-2v-1a1 1 0 10-2 0v1h-4v-1a1 1 0 00-1-1zm-2 6h10v6H50v-6z"
        fill="#0078D2"
      />
      <path
        d="M75 67h6.35m2.382 0h6.35m7.145 0h6.35m2.382 0h6.35m7.145 0h6.35m2.382 0h6.35m2.382 0h6.35m2.381 0H152"
        stroke="#0078D2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DatePickerImage;
