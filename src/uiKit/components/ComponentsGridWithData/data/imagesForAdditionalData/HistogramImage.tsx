import * as React from 'react';

function HistogramImage(props: React.SVGProps<SVGSVGElement>) {
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
      <path
        d="M34 95V49h31v46H34ZM67 95V35h31v60H67ZM100 95V52h31v43h-31ZM133 95V71h31v24h-31Z"
        fill="#DEE4E8"
      />
      <path
        d="M34 95V81h31v14H34ZM67 95V71h31v24H67ZM100 95V63h31v32h-31ZM133 95V82h31v13h-31Z"
        fill="#0078D2"
      />
    </svg>
  );
}

export default HistogramImage;
