import * as React from 'react';

const TagImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <rect x={37} y={48} width={59} height={24} rx={4} fill="#DEE4E8" />
      <rect x={104} y={48} width={59} height={24} rx={4} fill="#0078D2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M79.125 56L78 57.125l3.375 3.375L78 63.875 79.125 65l3.375-3.375L85.875 65 87 63.875 83.625 60.5 87 57.125 85.875 56 82.5 59.375 79.125 56z"
        fill="#002033"
        fillOpacity={0.3}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M146.125 56L145 57.125l3.375 3.375L145 63.875 146.125 65l3.375-3.375L152.875 65 154 63.875l-3.375-3.375L154 57.125 152.875 56l-3.375 3.375L146.125 56z"
        fill="#fff"
      />
    </svg>
  );
};

export default TagImage;
