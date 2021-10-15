import * as React from 'react';

function Attachment(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z" fill="#fff" />
      <path
        d="M4 1h192v-2H4v2zm195 3v112h2V4h-2zm-3 115H4v2h192v-2zM1 116V4h-2v112h2zm3 3a3 3 0 01-3-3h-2a5 5 0 005 5v-2zm195-3a3 3 0 01-3 3v2a5 5 0 005-5h-2zM196 1a3 3 0 013 3h2a5 5 0 00-5-5v2zM4-1a5 5 0 00-5 5h2a3 3 0 013-3v-2z"
        fill="#004166"
        fillOpacity={0.2}
      />
      <rect x={43} y={22} width={16} height={16} rx={4} fill="#0078D2" />
      <rect x={43} y={52} width={16} height={16} rx={4} fill="#004269" fillOpacity={0.07} />
      <rect
        x={43.5}
        y={82.5}
        width={15}
        height={15}
        rx={3.5}
        stroke="#004269"
        strokeOpacity={0.28}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49.606 32.794L46.46 29.93l-.674.74 3.916 3.564 6.12-7.293-.767-.643-5.45 6.496z"
        fill="#fff"
      />
      <rect x={69} y={26} width={89} height={7} rx={3.5} fill="#002033" fillOpacity={0.35} />
      <rect x={69} y={56} width={89} height={7} rx={3.5} fill="#002033" fillOpacity={0.35} />
      <rect x={69} y={86} width={89} height={7} rx={3.5} fill="#002033" fillOpacity={0.35} />
    </svg>
  );
}

export default Attachment;
