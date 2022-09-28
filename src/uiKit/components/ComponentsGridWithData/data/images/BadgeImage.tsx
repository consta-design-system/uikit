import * as React from 'react';

const BadgeImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <rect
        x={33.5}
        y={34.5}
        width={61}
        height={22}
        rx={3.5}
        fill="#0078D2"
        stroke="#0078D2"
      />
      <path
        d="M59 44h2v6h-2v-6zM62 48.953c0 .63.346 1.047 1 1.047h3.639c.694 0 .988-.551 1.111-.833l1.083-2.5c.167-.417.167-.834.167-.765V45s-.167-1-1-1h-2.75l.39-2.71c.06-.29.016-.634-.14-.79l-.667-.5-2.553 3.803c-.29.364-.28.52-.28.937v4.213z"
        fill="#fff"
      />
      <rect
        x={33.5}
        y={64.5}
        width={61}
        height={22}
        rx={3.5}
        stroke="#0078D2"
      />
      <path
        d="M59 74h2v6h-2v-6zM62 78.953c0 .63.346 1.047 1 1.047h3.639c.694 0 .988-.551 1.111-.833l1.083-2.5c.167-.417.167-.834.167-.765V75s-.167-1-1-1h-2.75l.39-2.71c.06-.29.016-.634-.14-.79l-.667-.5-2.553 3.803c-.29.364-.28.52-.28.937v4.213z"
        fill="#0078D2"
      />
      <rect x={105} y={34} width={62} height={23} rx={4} fill="#F38B00" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M136.843 40.475a1 1 0 00-1.703 0l-4.99 8.095a1 1 0 00.852 1.524h9.979a1 1 0 00.851-1.524l-4.989-8.095zm-1.352 2.62a.5.5 0 011 0v3a.5.5 0 11-1 0v-3zm1 5a.5.5 0 11-.999 0 .5.5 0 01.999 0z"
        fill="#fff"
      />
      <rect
        x={105.5}
        y={64.5}
        width={61}
        height={22}
        rx={3.5}
        stroke="#F38B00"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M136.851 70.38a1 1 0 00-1.702 0l-4.99 8.095A1 1 0 00131.01 80h9.98a1 1 0 00.851-1.525l-4.99-8.094zM135.5 73a.5.5 0 011 0v3a.5.5 0 01-1 0v-3zm1 5a.5.5 0 11-1 0 .5.5 0 011 0z"
        fill="#EB6D00"
      />
    </svg>
  );
};

export default BadgeImage;
