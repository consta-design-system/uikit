import * as React from 'react';

function S(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path d="M0 8a4 4 0 014-4h3v2H4a2 2 0 100 4h3v2H4a4 4 0 01-4-4zm9-2V4h3a4 4 0 010 8H9v-2h3a2 2 0 100-4H9z" />
      <path d="M11 7H5v2h6V7z" />
    </svg>
  );
}

export default S;
