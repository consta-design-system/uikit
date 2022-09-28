import * as React from 'react';

const RadioGroupImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <rect
        x={43.5}
        y={22.5}
        width={15}
        height={15}
        rx={7.5}
        stroke="#0078D2"
      />
      <rect x={48} y={27} width={6} height={6} rx={3} fill="#0078D2" />
      <rect
        x={69}
        y={26}
        width={89}
        height={7}
        rx={3.5}
        fill="#002033"
        fillOpacity={0.35}
      />
      <rect
        x={69}
        y={56}
        width={89}
        height={7}
        rx={3.5}
        fill="#002033"
        fillOpacity={0.35}
      />
      <rect
        x={69}
        y={86}
        width={89}
        height={7}
        rx={3.5}
        fill="#002033"
        fillOpacity={0.35}
      />
      <rect
        x={43}
        y={52}
        width={16}
        height={16}
        rx={8}
        fill="#004269"
        fillOpacity={0.07}
      />
      <rect
        x={43.5}
        y={82.5}
        width={15}
        height={15}
        rx={7.5}
        stroke="#004269"
        strokeOpacity={0.28}
      />
    </svg>
  );
};

export default RadioGroupImage;
