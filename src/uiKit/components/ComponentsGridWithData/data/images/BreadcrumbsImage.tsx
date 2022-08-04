import * as React from 'react';

const BreadcrumbsImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <g clipPath="url(#SvgBreadcrumbsImage__clip0_2:3124)">
        <path
          d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
          fill="#fff"
        />
        <rect
          width={20}
          height={12}
          rx={2}
          transform="matrix(1 0 0 -1 49 52)"
          fill="#002033"
          fillOpacity={0.35}
        />
        <rect
          width={20}
          height={12}
          rx={2}
          transform="matrix(1 0 0 -1 13 52)"
          fill="#002033"
          fillOpacity={0.35}
        />
        <rect
          width={20}
          height={12}
          rx={2}
          transform="matrix(1 0 0 -1 85 52)"
          fill="#0078D2"
        />
        <rect
          width={220}
          height={53}
          rx={2}
          transform="matrix(1 0 0 -1 13 19)"
          fill="#004269"
          fillOpacity={0.07}
        />
        <rect
          width={215}
          height={16}
          rx={2}
          transform="matrix(1 0 0 -1 13 82)"
          fill="#004269"
          fillOpacity={0.07}
        />
        <rect
          width={215}
          height={15}
          rx={2}
          transform="matrix(1 0 0 -1 13 108)"
          fill="#004269"
          fillOpacity={0.07}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M79.975 46L76 49.975l-.707-.707L78.56 46l-3.268-3.268.707-.707L79.975 46zM43.975 46L40 49.975l-.707-.707L42.56 46l-3.268-3.268.707-.707L43.975 46z"
          fill="#002033"
          fillOpacity={0.3}
        />
      </g>
      <defs>
        <clipPath id="SvgBreadcrumbsImage__clip0_2:3124">
          <path fill="#fff" d="M0 0h200v120H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BreadcrumbsImage;
