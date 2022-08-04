import * as React from 'react';

const SwitchImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <rect
        x={44.5}
        y={48.5}
        width={43}
        height={23}
        rx={11.5}
        stroke="#004269"
        strokeOpacity={0.28}
      />
      <circle cx={56} cy={60} r={10} fill="#004269" fillOpacity={0.28} />
      <rect x={112} y={48} width={44} height={24} rx={12} fill="#0078D2" />
      <circle cx={144} cy={60} r={10} fill="#fff" />
    </svg>
  );
};

export default SwitchImage;
