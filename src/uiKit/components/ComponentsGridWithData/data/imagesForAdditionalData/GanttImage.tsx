import * as React from 'react';

const GanttImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 0 1 4-4h192a4 4 0 0 1 4 4v112a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
        fill="#fff"
      />
      <path
        d="M47 18v88M82 18v88M117 18v88M152 18v88"
        stroke="#002033"
        strokeOpacity={0.08}
        strokeWidth={2}
        strokeDasharray="4 4"
      />
      <path
        d="M47 30a2 2 0 0 1 2-2h31a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H49a2 2 0 0 1-2-2v-8Z"
        fill="#DEE4E8"
      />
      <path fill="#DEE4E8" d="M47 28h35v12H47z" />
      <path
        d="M47 30a2 2 0 0 1 2-2h14v12H49a2 2 0 0 1-2-2v-8Z"
        fill="#0078D2"
      />
      <path fill="#0078D2" d="M47 28h16v12H47z" />
      <path
        d="M117 86a2 2 0 0 1 2-2h31a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-31a2 2 0 0 1-2-2v-8Z"
        fill="#DEE4E8"
      />
      <path fill="#DEE4E8" d="M117 84h35v12h-35z" />
      <path
        d="M117 86a2 2 0 0 1 2-2h19v12h-19a2 2 0 0 1-2-2v-8Z"
        fill="#F38B00"
      />
      <path fill="#F38B00" d="M117 84h21v12h-21z" />
      <path
        d="M82 58a2 2 0 0 1 2-2h31a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H84a2 2 0 0 1-2-2v-8Z"
        fill="#DEE4E8"
      />
      <path fill="#DEE4E8" d="M82 56h35v12H82z" />
      <path
        d="M82 58a2 2 0 0 1 2-2h11v12H84a2 2 0 0 1-2-2v-8Z"
        fill="#0078D2"
      />
      <path fill="#0078D2" d="M82 56h13v12H82z" />
      <path
        d="M117 62h6v14h-12v14h6M82 34h6v14.18H75V62h7"
        stroke="#002033"
        strokeOpacity={0.3}
        strokeWidth={2}
      />
    </svg>
  );
};

export default GanttImage;
