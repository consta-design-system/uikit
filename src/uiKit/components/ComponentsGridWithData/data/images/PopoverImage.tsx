import * as React from 'react';

const PopoverImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <rect
        x={20}
        y={56}
        width={44}
        height={20}
        rx={2.769}
        fill="#002033"
        fillOpacity={0.08}
      />
      <rect
        x={78}
        y={43}
        width={44}
        height={20}
        rx={2.769}
        fill="#002033"
        fillOpacity={0.08}
      />
      <rect
        x={135}
        y={56}
        width={44}
        height={20}
        rx={2.769}
        fill="#002033"
        fillOpacity={0.08}
      />
      <rect
        width={8}
        height={8}
        rx={4}
        transform="matrix(1 0 0 -1 20 51)"
        fill="#0078D2"
      />
      <rect
        width={8}
        height={8}
        rx={4}
        transform="matrix(1 0 0 -1 96 76)"
        fill="#0078D2"
      />
      <rect
        width={8}
        height={8}
        rx={4}
        transform="matrix(1 0 0 -1 171 51)"
        fill="#0078D2"
      />
    </svg>
  );
};

export default PopoverImage;
