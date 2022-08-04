import * as React from 'react';

const CardImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#ECF1F4"
      />
      <rect x={104} y={24} width={57} height={30} rx={4} fill="#fff" />
      <rect x={35} y={24} width={57} height={72} rx={4} fill="#fff" />
      <rect x={104} y={66} width={57} height={30} rx={4} fill="#fff" />
      <circle cx={118} cy={81} r={5} fill="#DEE4E8" />
      <path fill="#002033" fillOpacity={0.35} d="M127 78h26v6h-26z" />
      <path fill="#002033" fillOpacity={0.3} d="M44 30h40v6H44z" />
      <path
        fill="#002033"
        fillOpacity={0.08}
        d="M44 45h40v3H44zM44 63h40v3H44zM44 54h40v3H44zM44 72h40v3H44z"
      />
      <rect
        x={66}
        y={83}
        width={18}
        height={7}
        rx={2}
        fill="#002033"
        fillOpacity={0.08}
      />
      <rect
        x={44}
        y={83}
        width={18}
        height={7}
        rx={2}
        fill="#002033"
        fillOpacity={0.08}
      />
      <path
        d="M156 46c-3.584 0-6.361-11.17-10.602-11.023-4.588.16-6.663 7.742-9.894 7.742-4.493 0-7.169-12.7-11.409-12.719-4.241-.019-5.604 15.484-9.39 15.484-1.868 0-3.585-4.83-5.705-4.83"
        stroke="#DEE4E8"
      />
      <path
        d="M109 47c3.584 0 6.361-11.17 10.602-11.023 4.588.16 6.663 7.742 9.894 7.742 4.493 0 7.169-12.7 11.409-12.719 4.241-.019 5.604 15.484 9.39 15.484 1.868 0 3.585-4.83 5.705-4.83"
        stroke="#002033"
        strokeOpacity={0.35}
      />
    </svg>
  );
};

export default CardImage;
