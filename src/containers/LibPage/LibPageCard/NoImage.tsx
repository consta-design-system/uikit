import * as React from 'react';

function NoImage(): React.ReactElement {
  return (
    <svg viewBox="0 0 200 120" fill="none">
      <path fill="var(--color-bg-ghost)" d="M0 0h200v120H0z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M106.667 60a6.667 6.667 0 11-13.334 0 6.667 6.667 0 0113.334 0zm-1.905 0a4.762 4.762 0 01-7.388 3.973l6.599-6.6c.499.754.789 1.657.789 2.627zm-8.735 2.626l6.599-6.599a4.762 4.762 0 00-6.599 6.599z"
        fill="var(--color-typo-primary)"
        fillOpacity={0.3}
      />
    </svg>
  );
}

export default NoImage;
