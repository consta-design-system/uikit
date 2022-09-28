import * as React from 'react';

const ProgressLineImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <rect width={200} height={120} rx={4} fill="#ECF1F4" />
      <g clipPath="url(#SvgProgressLineImage__clip0_2423_26092)">
        <rect x={16} y={23} width={168} height={118} rx={4} fill="#fff" />
        <rect
          x={16.5}
          y={23.5}
          width={167}
          height={117}
          rx={3.5}
          stroke="#004166"
          strokeOpacity={0.2}
        />
        <path fill="#DEE4E8" d="M17 39h166v2H17z" />
        <path fill="#0078D2" d="M30.834 39h138.333v2H30.834z" />
        <rect
          x={60.5}
          y={58.5}
          width={80}
          height={74}
          rx={3.5}
          stroke="#002033"
          strokeOpacity={0.08}
        />
        <path
          fill="#002033"
          fillOpacity={0.08}
          d="M70 67h62v6H70zM70 105h62v6H70zM70 115h62v6H70zM70 77h62v24H70z"
        />
        <circle cx={24} cy={31} r={2} fill="#DEE4E8" />
        <circle cx={30} cy={31} r={2} fill="#DEE4E8" />
        <circle cx={36} cy={31} r={2} fill="#DEE4E8" />
      </g>
      <defs>
        <clipPath id="SvgProgressLineImage__clip0_2423_26092">
          <path fill="#fff" d="M0 0h200v119H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ProgressLineImage;
