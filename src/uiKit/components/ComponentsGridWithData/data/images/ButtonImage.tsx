import * as React from 'react';

const ButtonImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <rect x={24} y={29} width={40} height={15} rx={4} fill="#0078D2" />
      <rect x={80} y={29} width={40} height={15} rx={7.5} fill="#0078D2" />
      <path d="M136 29h36a4 4 0 014 4v7a4 4 0 01-4 4h-36V29z" fill="#0078D2" />
      <rect
        x={24.5}
        y={75.5}
        width={39}
        height={14}
        rx={3.5}
        stroke="#004269"
        strokeOpacity={0.28}
      />
      <rect
        x={80.5}
        y={75.5}
        width={39}
        height={14}
        rx={7}
        stroke="#004269"
        strokeOpacity={0.28}
      />
      <path
        d="M136.5 75.5H172a3.5 3.5 0 013.5 3.5v7a3.5 3.5 0 01-3.5 3.5h-35.5v-14z"
        stroke="#004269"
        strokeOpacity={0.28}
      />
      <rect
        x={24}
        y={52}
        width={40}
        height={15}
        rx={4}
        fill="#004269"
        fillOpacity={0.07}
      />
      <rect
        x={80}
        y={52}
        width={40}
        height={15}
        rx={7.5}
        fill="#004269"
        fillOpacity={0.07}
      />
      <path
        d="M136 52h36a4 4 0 014 4v7a4 4 0 01-4 4h-36V52z"
        fill="#004269"
        fillOpacity={0.07}
      />
    </svg>
  );
};

export default ButtonImage;
