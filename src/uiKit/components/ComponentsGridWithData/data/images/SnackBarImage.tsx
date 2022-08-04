import * as React from 'react';

const SnackBarImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <path
        fill="#002033"
        fillOpacity={0.08}
        d="M24 33h151v28H24zM24 71h151v11H24zM24 89h151v11H24z"
      />
      <path fill="#004269" fillOpacity={0.07} d="M1 1h198v18H1z" />
      <path fill="#0078D2" d="M66 95h67v14H66z" />
    </svg>
  );
};

export default SnackBarImage;
