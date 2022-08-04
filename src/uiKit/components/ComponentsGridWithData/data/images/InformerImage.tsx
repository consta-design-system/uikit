import * as React from 'react';

const InformerImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <g clipPath="url(#SvgInformerImage__clip0_1889_15805)">
        <path
          d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
          fill="#fff"
        />
        <path fill="#002033" fillOpacity={0.08} d="M24 29h150v12H24z" />
        <path fill="#004269" fillOpacity={0.07} d="M-11-4h217v23H-11z" />
        <path fill="#F38B00" d="M115 51h59v14h-59z" />
        <rect
          x={24.5}
          y={51.5}
          width={80}
          height={74}
          rx={3.5}
          stroke="#004166"
          strokeOpacity={0.2}
        />
        <path
          fill="#002033"
          fillOpacity={0.08}
          d="M34 60h62v6H34zM34 108h62v6H34zM34 70h62v34H34z"
        />
      </g>
      <defs>
        <clipPath id="SvgInformerImage__clip0_1889_15805">
          <rect width={200} height={120} rx={3} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default InformerImage;
