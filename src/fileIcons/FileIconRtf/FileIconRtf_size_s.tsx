import * as React from 'react';
import { SVGProps } from 'react';

const FileIconRtfSizeS = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 28" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width={24} height={28} rx={2} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.35 3a.374.374 0 0 0-.26.09.268.268 0 0 0-.09.21V4h1v1h-1v3h1v1h-3V8h1V5h-1V4h1v-.9c0-.34.097-.607.29-.8.193-.2.443-.3.75-.3h1.46v1h-1.15Zm-5.3 6c-.34 0-.6-.11-.78-.33-.18-.22-.27-.51-.27-.87V5h-1V4h1V3h1v1h2v1h-2v2.6c0 .147.037.25.11.31.073.06.187.09.34.09H14v1h-1.95ZM6 5.01V8H5v1h3V8H7V5.62a.708.708 0 0 1 .17-.41c.107-.14.267-.21.48-.21H9V4H7c-.313 0-.78.32-1 .5V4H5v1.01h1Z"
      fill="#fff"
    />
    <g opacity={0.5} fill="#fff">
      <path d="M5 14h14v-1H5v1ZM5 17h14v-1H5v1ZM19 20H5v-1h14v1ZM5 23h7v-1H5v1Z" />
    </g>
  </svg>
);
export default FileIconRtfSizeS;
