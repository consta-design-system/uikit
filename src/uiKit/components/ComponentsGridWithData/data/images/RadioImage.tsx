import * as React from 'react';

const RadioImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <rect
        x={164.5}
        y={52.5}
        width={15}
        height={15}
        rx={7.5}
        transform="rotate(90 164.5 52.5)"
        stroke="#0078D2"
      />
      <rect
        x={160}
        y={57}
        width={6}
        height={6}
        rx={3}
        transform="rotate(90 160 57)"
        fill="#0078D2"
      />
      <rect
        x={127}
        y={52}
        width={16}
        height={16}
        rx={8}
        transform="rotate(90 127 52)"
        fill="#004269"
        fillOpacity={0.07}
      />
      <rect
        x={126.5}
        y={52.5}
        width={15}
        height={15}
        rx={7.5}
        transform="rotate(90 126.5 52.5)"
        stroke="#004269"
        strokeOpacity={0.28}
      />
      <rect
        x={122}
        y={57}
        width={6}
        height={6}
        rx={3}
        transform="rotate(90 122 57)"
        fill="#00395C"
        fillOpacity={0.8}
      />
      <rect
        x={88}
        y={52}
        width={16}
        height={16}
        rx={8}
        transform="rotate(90 88 52)"
        fill="#004269"
        fillOpacity={0.07}
      />
      <rect
        x={49.5}
        y={52.5}
        width={15}
        height={15}
        rx={7.5}
        transform="rotate(90 49.5 52.5)"
        stroke="#004269"
        strokeOpacity={0.28}
      />
    </svg>
  );
};

export default RadioImage;
