import * as React from 'react';

const TabsImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <path fill="#0078D2" d="M67 56h65v4H67z" />
      <path
        fill="#004269"
        fillOpacity={0.28}
        d="M17 58h50v2H17zM132 58h50v2h-50z"
      />
      <rect x={21} y={25} width={41} height={22} rx={4} fill="#DEE4E8" />
      <rect x={137} y={25} width={41} height={22} rx={4} fill="#DEE4E8" />
      <rect
        x={72}
        y={25}
        width={54}
        height={22}
        rx={4}
        fill="#002033"
        fillOpacity={0.35}
      />
      <path
        d="M0 78h200v38a4 4 0 01-4 4H4a4 4 0 01-4-4V78z"
        fill="#004269"
        fillOpacity={0.07}
      />
    </svg>
  );
};

export default TabsImage;
