import * as React from 'react';

const CheckboxImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <rect
        x={34.5}
        y={34.5}
        width={15}
        height={15}
        rx={3.5}
        stroke="#004269"
        strokeOpacity={0.28}
      />
      <rect
        x={34.5}
        y={70.5}
        width={15}
        height={15}
        rx={3.5}
        stroke="#004269"
        strokeOpacity={0.28}
      />
      <rect
        x={72}
        y={34}
        width={16}
        height={16}
        rx={4}
        fill="#004269"
        fillOpacity={0.07}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76.228 40.928L75.2 42.154l4.29 3.6 6.17-7.354-1.225-1.029-5.142 6.129-3.065-2.572z"
        fill="#002033"
        fillOpacity={0.26}
      />
      <rect
        x={110}
        y={34}
        width={16}
        height={16}
        rx={4}
        fill="#004269"
        fillOpacity={0.07}
      />
      <rect
        x={110.5}
        y={34.5}
        width={15}
        height={15}
        rx={3.5}
        stroke="#004269"
        strokeOpacity={0.28}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M114.228 40.928l-1.028 1.226 4.29 3.6 6.171-7.354-1.226-1.029-5.142 6.129-3.065-2.572z"
        fill="#00395C"
        fillOpacity={0.8}
      />
      <rect x={148} y={34} width={16} height={16} rx={4} fill="#0078D2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M152.028 41.128L151 42.354l4.29 3.6 6.171-7.354-1.226-1.029-5.142 6.129-3.065-2.572z"
        fill="#fff"
      />
      <rect x={148} y={70} width={16} height={16} rx={4} fill="#0078D2" />
      <path d="M152.5 77h7v2h-7v-2z" fill="#fff" />
      <rect
        x={110}
        y={70}
        width={16}
        height={16}
        rx={4}
        fill="#004269"
        fillOpacity={0.07}
      />
      <rect
        x={110.5}
        y={70.5}
        width={15}
        height={15}
        rx={3.5}
        stroke="#004269"
        strokeOpacity={0.28}
      />
      <path d="M114.5 77h7v2h-7v-2z" fill="#00395C" fillOpacity={0.8} />
      <path d="M115 77.5h6v1h-6v-1z" stroke="#004269" strokeOpacity={0.28} />
      <rect
        x={72}
        y={70}
        width={16}
        height={16}
        rx={4}
        fill="#004269"
        fillOpacity={0.07}
      />
      <path d="M76.5 77h7v2h-7v-2z" fill="#002033" fillOpacity={0.26} />
    </svg>
  );
};

export default CheckboxImage;
