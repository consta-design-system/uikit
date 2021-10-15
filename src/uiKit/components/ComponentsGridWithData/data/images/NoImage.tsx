import * as React from 'react';

function NoImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path fill="#ECF1F4" d="M0 0h200v120H0z" />
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#ECF1F4"
      />
      <path
        d="M4 1h192v-2H4v2zm195 3v112h2V4h-2zm-3 115H4v2h192v-2zM1 116V4h-2v112h2zm3 3a3 3 0 01-3-3h-2a5 5 0 005 5v-2zm195-3a3 3 0 01-3 3v2a5 5 0 005-5h-2zM196 1a3 3 0 013 3h2a5 5 0 00-5-5v2zM4-1a5 5 0 00-5 5h2a3 3 0 013-3v-2z"
        fill="#004166"
        fillOpacity={0.2}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M106.667 60a6.667 6.667 0 11-13.334 0 6.667 6.667 0 0113.334 0zm-1.905 0a4.762 4.762 0 01-7.388 3.973l6.599-6.6c.499.754.789 1.657.789 2.627zm-8.735 2.626l6.599-6.599a4.762 4.762 0 00-6.599 6.599z"
        fill="#002033"
        fillOpacity={0.3}
      />
    </svg>
  );
}

export default NoImage;
