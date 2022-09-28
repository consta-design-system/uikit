import * as React from 'react';

const LayoutImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <path fill="#0078D2" d="M18 15h164v16H18z" opacity={0.5} />
      <path
        fill="#09B37B"
        d="M18 35h46v70H18zM68 35h114v70H68z"
        opacity={0.5}
      />
    </svg>
  );
};

export default LayoutImage;
