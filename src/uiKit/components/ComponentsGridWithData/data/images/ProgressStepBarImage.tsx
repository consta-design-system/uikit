import * as React from 'react';

const ProgressStepBarImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <path fill="#002033" fillOpacity={0.08} d="M64 22h101v7H64z" />
      <path fill="#22C38E" d="M43 22v41h-2V22z" />
      <path fill="#F38B00" d="M43 56v41h-2V56z" />
      <path
        fill="#002033"
        fillOpacity={0.08}
        d="M64 56h101v7H64zM64 90h101v7H64z"
      />
      <circle cx={42} cy={26} r={7} fill="#22C38E" />
      <circle cx={42} cy={60} r={7} fill="#F38B00" />
      <circle cx={42} cy={94} r={7} fill="#EB5757" />
    </svg>
  );
};

export default ProgressStepBarImage;
