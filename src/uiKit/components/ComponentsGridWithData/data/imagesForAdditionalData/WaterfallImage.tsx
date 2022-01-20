import * as React from 'react';

function WaterfallImage(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M34 95V68h20v27H34Z" fill="#DEE4E8" />
      <path d="M71 68V51h20v17H71ZM108 51V37h20v14h-20Z" fill="#0078D2" />
      <path d="M145 95V37h20v58h-20Z" fill="#DEE4E8" />
    </svg>
  );
}

export default WaterfallImage;
