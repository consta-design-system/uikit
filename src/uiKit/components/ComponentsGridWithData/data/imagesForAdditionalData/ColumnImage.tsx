import * as React from 'react';

function ColumnImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 0 1 4-4h192a4 4 0 0 1 4 4v112a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
        fill="#fff"
      />
      <path
        d="M21 25h157M21 60h157M21 94h157"
        stroke="#002033"
        strokeOpacity={0.08}
        strokeWidth={2}
        strokeDasharray="4 4"
      />
      <path d="M86 95V40h20v55H86Z" fill="#0078D2" />
      <path d="M41 95V48h20v47H41ZM131 95V72h20v23h-20Z" fill="#DEE4E8" />
    </svg>
  );
}

export default ColumnImage;
