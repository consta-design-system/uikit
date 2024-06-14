import * as React from 'react';
import { SVGProps } from 'react';

const FileIconWavSizeS = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 28" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width={24} height={28} rx={2} />
    <path
      opacity={0.7}
      fillRule="evenodd"
      clipRule="evenodd"
      d="m17 12-8 2v8H7.5a1.5 1.5 0 0 0 0 3H8a2 2 0 0 0 2-2v-5.25l6-1.5V20h-1.5a1.5 1.5 0 0 0 0 3h.5a2 2 0 0 0 2-2v-9Zm-1 2.25-6 1.5v1l6-1.5v-1Z"
      fill="#fff"
    />
    <path
      d="M6 4H5v3l1 2h1l.5-1L8 9h1l1-2V4H9v3H8V5H7v2H6V4ZM16 4h1v3h1V4h1v3l-1 2h-1l-1-2V4Z"
      fill="#fff"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.66 8.92c.107.053.203.08.29.08h.55v-.7c-.18 0-.31-.023-.39-.07A.267.267 0 0 1 15 8V5.6c0-.56-.14-.967-.42-1.22-.273-.253-.7-.38-1.28-.38h-1.8v1h1.75c.247 0 .433.057.56.17.127.113.19.273.19.48V6h-1.54C11.487 6 11 6.517 11 7.55v.1c0 .493.113.843.34 1.05.233.2.603.3 1.11.3h1.34a.73.73 0 0 0 .61-.3c.073.093.16.167.26.22Zm-.74-1.06c-.053.093-.18.14-.38.14H12.5c-.173 0-.3-.04-.38-.12-.071-.071-.111-.18-.119-.326A.583.583 0 0 1 12.6 7H14v.5a.72.72 0 0 1-.08.36Z"
      fill="#fff"
    />
  </svg>
);
export default FileIconWavSizeS;
