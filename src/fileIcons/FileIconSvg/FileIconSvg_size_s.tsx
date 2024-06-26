import * as React from 'react';
import { SVGProps } from 'react';

const FileIconSvgSizeS = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 28" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width={24} height={28} rx={2} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 7.75c0 .42-.13.733-.39.94-.253.207-.623.31-1.11.31H6V8h1.45c.18 0 .317-.037.41-.11A.423.423 0 0 0 8 7.55v-.1c0-.3-.143-.45-.43-.45H7.2c-.467 0-.667-.1-.9-.3-.227-.207-.3-.53-.3-.97v-.47c0-.447.087-.767.34-.96.253-.2.667-.3 1.16-.3H9v1H7.55c-.167 0-.3.04-.4.12-.1.073-.15.183-.15.33v.11c0 .153.043.267.13.34.093.073.21.1.35.1h.15c.447 0 .787.12 1.02.34.233.213.35.533.35.96v.45ZM10 4h1v3h1V4h1v3l-1 2h-1l-1-2V4Zm6.25 5c.293 0 .543-.067.75-.2V9c0 1-.16 1-1 1h-1.5v1H17a1 1 0 0 0 1-1V4h-2.3c-.58 0-1.01.127-1.29.38-.273.253-.41.66-.41 1.22v1.8c0 .567.137.977.41 1.23.273.247.703.37 1.29.37h.55Zm.59-1.17c-.107.113-.27.17-.49.17h-.6c-.247 0-.433-.057-.56-.17-.127-.113-.19-.273-.19-.48v-1.7c0-.207.063-.367.19-.48.127-.113.313-.17.56-.17H17v2.45c0 .133-.053.26-.16.38Z"
      fill="#fff"
    />
    <path
      opacity={0.6}
      d="M11 14h2v.5h4.134a1 1 0 1 1 0 1h-1.668A6.495 6.495 0 0 1 18.5 21v1h.5v2h-2v-2h.5v-1c0-2.696-1.94-4.94-4.5-5.41V16h-2v-.41A5.502 5.502 0 0 0 6.5 21v1H7v2H5v-2h.5v-1a6.495 6.495 0 0 1 3.034-5.5H6.866a1 1 0 1 1 0-1H11V14Z"
      fill="#fff"
    />
  </svg>
);
export default FileIconSvgSizeS;
