import * as React from 'react';

const TooltipImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <path
        opacity={0.9}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51.77 24A2.77 2.77 0 0049 26.77v26.307a2.77 2.77 0 002.77 2.77h44.076L100 60l4.154-4.154h44.077a2.77 2.77 0 002.769-2.77V26.77A2.77 2.77 0 00148.231 24H51.769z"
        fill="#0078D2"
      />
      <rect
        width={60}
        height={18}
        rx={2}
        transform="matrix(1 0 0 -1 70 81)"
        fill="#002033"
        fillOpacity={0.35}
      />
      <path
        d="M1 81h37a2 2 0 002-2V65a2 2 0 00-2-2H1v18zM156 79a2 2 0 002 2h41V63h-41a2 2 0 00-2 2v14z"
        fill="#DEE4E8"
      />
      <path
        d="M196 119a3 3 0 003-3V93H1v23a3 3 0 003 3h192z"
        fill="#004269"
        fillOpacity={0.07}
      />
    </svg>
  );
};

export default TooltipImage;
