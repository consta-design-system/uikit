import * as React from 'react';

const LoaderImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <rect x={97} y={56} width={8} height={8} rx={4} fill="#0078D2" />
      <rect x={80} y={54} width={12} height={12} rx={6} fill="#0078D2" />
      <rect x={111} y={56} width={8} height={8} rx={4} fill="#0078D2" />
    </svg>
  );
};

export default LoaderImage;
