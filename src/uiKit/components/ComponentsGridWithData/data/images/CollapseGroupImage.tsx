import * as React from 'react';

const CollapseGroupImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.979 33l-5.98-5.943L29.065 26l4.915 4.886L38.894 26l1.064 1.057L33.978 33z"
        fill="#002033"
        fillOpacity={0.3}
      />
      <path fill="#002033" fillOpacity={0.35} d="M56.401 26H171v7H56.401z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.98 53l5.978 5.943L38.895 60l-4.916-4.886L29.064 60 28 58.943 33.98 53z"
        fill="#0078D2"
      />
      <path fill="#0078D2" d="M56.4 53H171v7H56.4z" />
      <path fill="#0078D2" d="M56.401 53H171v7H56.401zM57 64h114v30H57z" />
      <path fill="#DEE4E8" d="M57 64h114v30H57z" />
    </svg>
  );
};

export default CollapseGroupImage;
