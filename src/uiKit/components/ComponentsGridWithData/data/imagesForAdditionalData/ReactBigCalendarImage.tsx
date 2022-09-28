import React from 'react';

const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={200}
    height={120}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="#ECF1F4" d="M0 0h200v120H0z" />
    <rect width={200} height={120} rx={4} fill="#ECF1F4" />
    <rect
      x={166}
      y={108}
      width={131}
      height={95}
      rx={3.505}
      transform="rotate(-180 166 108)"
      fill="#fff"
    />
    <path
      fill="#004166"
      fillOpacity={0.2}
      d="M166 84.095H35v-1h131zM166 34.028H35v-1h131zM166 59H35v-1h131z"
    />
    <path
      fill="#004166"
      fillOpacity={0.2}
      d="M101 108V34h-1v74zM134 108V34h-1v74zM68 108V34h-1v74z"
    />
    <rect x={37} y={36} width={28} height={4} rx={2} fill="#0078D2" />
    <rect x={103} y={61} width={28} height={4} rx={2} fill="#0078D2" />
    <rect x={70} y={69} width={61} height={4} rx={2} fill="#0078D2" />
    <rect x={136} y={86} width={28} height={4} rx={2} fill="#0078D2" />
  </svg>
);

export default SvgComponent;
