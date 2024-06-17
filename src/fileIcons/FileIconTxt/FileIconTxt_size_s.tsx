import * as React from 'react';
import { SVGProps } from 'react';

const FileIconTxtSizeS = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 28" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width={24} height={28} rx={2} />
    <g opacity={0.5} fill="#fff">
      <path d="M5 14h14v-1H5v1ZM5 17h14v-1H5v1ZM19 20H5v-1h14v1ZM5 23h7v-1H5v1Z" />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.05 9c-.34 0-.6-.11-.78-.33C7.09 8.45 7 8.16 7 7.8V5H6V4h1V3h1v1h1v1H8v2.6c0 .147.037.25.11.31.073.06.187.09.34.09H9v1h-.95ZM11 9h-1V7h1V6h-1V4h1v1.5l1 .5 1-.5V4h1v2h-1v1h1v2h-1V7.5L12 7l-1 .5V9Zm5.27-.33c.18.22.44.33.78.33H18V8h-.55c-.153 0-.267-.03-.34-.09-.073-.06-.11-.163-.11-.31V5h1V4h-1V3h-1v1h-1v1h1v2.8c0 .36.09.65.27.87Z"
      fill="#fff"
    />
  </svg>
);
export default FileIconTxtSizeS;
