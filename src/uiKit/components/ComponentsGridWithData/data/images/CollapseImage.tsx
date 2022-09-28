import * as React from 'react';

const CollapseImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.98 40l5.978 5.943L39.895 47l-4.916-4.886L30.064 47 29 45.943 34.98 40z"
        fill="#0078D2"
      />
      <path fill="#0078D2" d="M57.4 40H172v7H57.4z" />
      <path fill="#0078D2" d="M57.401 40H172v7H57.401zM58 51h114v30H58z" />
      <path fill="#DEE4E8" d="M58 51h114v30H58z" />
    </svg>
  );
};

export default CollapseImage;
