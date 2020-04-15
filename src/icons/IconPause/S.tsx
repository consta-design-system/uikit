import * as React from 'react';

function S(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path d="M7 2H3v12h4V2zm6 0H9v12h4V2z" />
    </svg>
  );
}

export default S;
