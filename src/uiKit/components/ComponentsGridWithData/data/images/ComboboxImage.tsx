import * as React from 'react';

const ComboboxImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <rect
        x={46}
        y={14}
        width={108}
        height={20}
        rx={4}
        fill="#002033"
        fillOpacity={0.08}
      />
      <path d="M137 22l4.5 5 4.5-5h-9z" fill="#002033" fillOpacity={0.35} />
      <rect x={46} y={34} width={108} height={72} rx={4} fill="#fff" />
      <path
        fill="#002033"
        fillOpacity={0.35}
        d="M58 67h63v5H58zM58 87h63v5H58zM58 47h63v5H58z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M138.818 51.996l-3.145-2.864-.673.74 3.915 3.564 6.12-7.293-.766-.643-5.451 6.496zM138.818 91.996l-3.145-2.864-.673.74 3.915 3.564 6.12-7.293-.766-.643-5.451 6.496z"
        fill="#0078D2"
      />
      <rect
        x={46.5}
        y={34.5}
        width={107}
        height={71}
        rx={3.5}
        stroke="#004166"
        strokeOpacity={0.2}
      />
    </svg>
  );
};

export default ComboboxImage;
