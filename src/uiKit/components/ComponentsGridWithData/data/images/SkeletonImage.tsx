import * as React from 'react';

const SkeletonImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <circle cx={38} cy={36} r={16} fill="#DEE4E8" />
      <path
        fill="#DEE4E8"
        d="M66 22h56v12H66zM66 38h112v12H66zM22 64h156v35H22z"
      />
    </svg>
  );
};

export default SkeletonImage;
