import * as React from 'react';

function AreaImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z" fill="#fff" />
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
        d="M142.586 48.433c14.166-.576 23.441 43.04 35.414 43.04V95H21V63.143C28.083 63.143 33.816 82 40.056 82c12.648 0 17.2-53.073 31.366-53 14.166.073 23.103 49.662 38.112 49.662 10.793 0 17.724-29.606 33.052-30.229Z"
        fill="#DEE4E8"
      />
      <path
        d="M56.413 70.305C42.248 70 32.974 93.13 21 93.13V95h157V82.061c-7.083 0-12.816 10-19.056 10-12.648 0-17.201-32.1-31.366-32.061-14.166.038-23.103 26.336-38.112 26.336-10.792 0-17.724-15.7-33.052-16.03Z"
        fill="#0078D2"
      />
    </svg>
  );
}

export default AreaImage;
