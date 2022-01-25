import * as React from 'react';

function LineImage(props: React.SVGProps<SVGSVGElement>) {
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
        d="M178 87c-11.973 0-21.248-43.286-35.414-42.714-15.328.618-22.259 30-33.052 30-15.009 0-23.946-49.214-38.112-49.286-14.165-.072-18.718 60-31.366 60C33.816 85 28.083 66.286 21 66.286"
        stroke="#002033"
        strokeOpacity={0.3}
        strokeWidth={2}
      />
      <path
        d="M21 91c11.973 0 21.248-43.286 35.413-42.714 15.329.618 22.26 30 33.053 30 15.009 0 23.946-49.214 38.112-49.286 14.165-.072 18.718 60 31.366 60 6.24 0 11.973-18.714 19.056-18.714"
        stroke="#0078D2"
        strokeWidth={2}
      />
    </svg>
  );
}

export default LineImage;
