import * as React from 'react';

function Xs(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" {...props}>
      <path
        d="M6.005 3.66L9.98 7.633l-.707.707-3.268-3.268-3.268 3.268-.707-.707 3.975-3.975z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default Xs;
