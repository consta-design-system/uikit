import * as React from 'react';

function M(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M10 4H5v16h5V4zM19 4h-5v16h5V4z" />
    </svg>
  );
}

export default M;
