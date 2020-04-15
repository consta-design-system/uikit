import * as React from 'react';

function S(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path
        d="M3 2.5C3 1.67 3.674 1 4.501 1H11.5c.826 0 1.5.67 1.5 1.5v12.241l-5-2.917-5 2.917V2.501z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default S;
