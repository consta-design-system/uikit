import * as React from 'react';

const RcTreeAdapterImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 0 1 4-4h192a4 4 0 0 1 4 4v112a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
        fill="#ECF1F4"
      />
      <path
        d="M25 14a4 4 0 0 1 4-4h143a4 4 0 0 1 4 4v92a4 4 0 0 1-4 4H29a4 4 0 0 1-4-4V14Z"
        fill="#fff"
      />
      <path fill="#fff" d="M25 10h151v100H25z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m43.979 52.5-5.98-5.943 1.064-1.057 4.916 4.886 4.915-4.886 1.064 1.057-5.98 5.943Z"
        fill="#002033"
        fillOpacity={0.3}
      />
      <path fill="#002033" fillOpacity={0.35} d="M61.958 45.5H161v7H61.958z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M61.98 74.5 56 68.557l1.064-1.057 4.915 4.886 4.916-4.886 1.063 1.057L61.98 74.5Z"
        fill="#002033"
        fillOpacity={0.3}
      />
      <path
        fill="#002033"
        fillOpacity={0.35}
        d="M79.958 67.5H161v7H79.958zM94 89.5h67v7H94z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m45 27-5.943 5.98L38 31.915 42.886 27 38 22.085l1.057-1.064L45 27.001Z"
        fill="#002033"
        fillOpacity={0.3}
      />
      <path fill="#002033" fillOpacity={0.35} d="M62 23.5h99v7H62z" />
    </svg>
  );
};

export default RcTreeAdapterImage;
