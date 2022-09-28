import * as React from 'react';

const ContextMenuImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <rect
        x={46}
        y={14}
        width={20}
        height={20}
        rx={4}
        fill="#002033"
        fillOpacity={0.08}
      />
      <rect x={46} y={34} width={108} height={72} rx={4} fill="#fff" />
      <path
        fill="#002033"
        fillOpacity={0.35}
        d="M59 67h82v5H59zM59 87h82v5H59zM59 47h82v5H59z"
      />
      <rect
        x={46.5}
        y={34.5}
        width={107}
        height={71}
        rx={3.5}
        stroke="#004166"
        strokeOpacity={0.2}
      />
      <path
        d="M57 20a1 1 0 11-2 0 1 1 0 012 0zM57 24a1 1 0 11-2 0 1 1 0 012 0zM56 29a1 1 0 100-2 1 1 0 000 2z"
        fill="#002033"
        fillOpacity={0.35}
      />
    </svg>
  );
};

export default ContextMenuImage;
