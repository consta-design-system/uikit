import * as React from 'react';

const SwitchGroupImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <rect
        x={32.5}
        y={15.5}
        width={33}
        height={17.546}
        rx={8.773}
        stroke="#004269"
        strokeOpacity={0.28}
      />
      <circle
        cx={41.273}
        cy={24.273}
        r={7.727}
        fill="#004269"
        fillOpacity={0.28}
      />
      <rect
        x={32.5}
        y={87.5}
        width={33}
        height={17.546}
        rx={8.773}
        stroke="#004269"
        strokeOpacity={0.28}
      />
      <circle
        cx={41.273}
        cy={96.273}
        r={7.727}
        fill="#004269"
        fillOpacity={0.28}
      />
      <rect
        x={32}
        y={51}
        width={34}
        height={18.546}
        rx={9.273}
        fill="#0078D2"
      />
      <circle cx={56.727} cy={60.273} r={7.727} fill="#fff" />
      <path fill="#002033" fillOpacity={0.35} d="M78 57h70v7H78z" />
      <path fill="#DEE4E8" d="M78 21h90v7H78zM78 93h90v7H78z" />
    </svg>
  );
};

export default SwitchGroupImage;
