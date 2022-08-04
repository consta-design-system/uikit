import * as React from 'react';

const ChoiceGroupImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <rect x={26} y={48} width={148} height={24} rx={2} fill="#fff" />
      <rect
        x={26.5}
        y={48.5}
        width={147}
        height={23}
        rx={1.5}
        stroke="#004166"
        strokeOpacity={0.2}
      />
      <rect
        x={26.5}
        y={48.5}
        width={49}
        height={23}
        rx={1.5}
        stroke="#0078D2"
      />
      <path
        stroke="#004166"
        strokeOpacity={0.2}
        strokeWidth={0.5}
        d="M124.25 53.25h.5v13.5h-.5z"
      />
      <path fill="#0078D2" d="M62 58v4H39v-4z" />
      <path fill="#002033" fillOpacity={0.08} d="M111 58v4H88v-4z" />
      <path
        fill="#002033"
        fillOpacity={0.08}
        d="M111 58v4H88v-4zM161 58v4h-23v-4z"
      />
      <path fill="#002033" fillOpacity={0.08} d="M161 58v4h-23v-4z" />
    </svg>
  );
};

export default ChoiceGroupImage;
