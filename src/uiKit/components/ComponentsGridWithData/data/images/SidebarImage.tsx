import * as React from 'react';

const SidebarImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <path
        fill="#002033"
        fillOpacity={0.08}
        d="M23 32h109v28H23zM23 73h109v11H23zM23 91h109v11H23z"
      />
      <path fill="#004269" fillOpacity={0.07} d="M1 1h198v18H1z" />
      <path fill="#A6B1B8" d="M132 19h67v100h-67z" />
    </svg>
  );
};

export default SidebarImage;
