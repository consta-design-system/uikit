import * as React from 'react';

function GaugeImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <g clipPath="url(#a)">
        <path
          d="M0 4a4 4 0 0 1 4-4h192a4 4 0 0 1 4 4v112a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
          fill="#fff"
        />
        <path
          d="M155 85.5a55.502 55.502 0 0 0-76.739-51.275A55.498 55.498 0 0 0 44 85.5h11.1a44.4 44.4 0 1 1 88.8 0H155Z"
          fill="#DEE4E8"
        />
        <path
          d="M121.402 34.504A55.5 55.5 0 0 0 44 85.5h11.1a44.4 44.4 0 0 1 61.922-40.797l4.38-10.199ZM108.742 60.93l-5.247 21.202c-.697 2.817-3.809 4.28-6.424 3.021a4.573 4.573 0 0 1-1.64-6.906l13.311-17.317Z"
          fill="#0078D2"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h200v120H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default GaugeImage;
