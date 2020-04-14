import * as React from 'react';

function S(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path d="M14 11c0 .552-.447 1-.999 1H4.167L2 14V3.996A.997.997 0 013 3h10a1 1 0 011 1v7z" />
    </svg>
  );
}

export default S;
