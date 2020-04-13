import * as React from 'react';

function S(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path d="M6 1H5v1H1v2h4v1h1V1zM7 2h8v2H7V2zM1 7h9V6h1v4h-1V9H1V7zM6 12h9v2H6v-2zM4 12H1v2h3v1h1v-4H4v1zM15 7h-3v2h3V7z" />
    </svg>
  );
}

export default S;
