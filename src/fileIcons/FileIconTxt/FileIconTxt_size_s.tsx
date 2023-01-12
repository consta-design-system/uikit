import * as React from 'react';
import { SVGProps } from 'react';

const FileIconTxtSizeS = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 21 28" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M19.6 0H1.4A1.4 1.4 0 0 0 0 1.4v25.2A1.4 1.4 0 0 0 1.4 28h18.2a1.4 1.4 0 0 0 1.4-1.4V1.4A1.4 1.4 0 0 0 19.6 0Z" />
    <g opacity={0.5} fill="#fff">
      <path d="M3 14h15v-1H3v1ZM3 17h15v-1H3v1ZM18 20H3v-1h15v1ZM3 23h8v-1H3v1Z" />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.55 9c-.34 0-.6-.11-.78-.33-.18-.22-.27-.51-.27-.87V5h-1V4h1V3h1v1h1v1h-1v2.6c0 .147.037.25.11.31.073.06.187.09.34.09h.55v1h-.95ZM9.5 9h-1V7h1V6h-1V4h1v1.5l1 .5 1-.5V4h1v2h-1v1h1v2h-1V7.5l-1-.5-1 .5V9Zm5.27-.33c.18.22.44.33.78.33h.95V8h-.55c-.153 0-.267-.03-.34-.09-.073-.06-.11-.163-.11-.31V5h1V4h-1V3h-1v1h-1v1h1v2.8c0 .36.09.65.27.87Z"
      fill="#fff"
    />
  </svg>
);
export default FileIconTxtSizeS;
