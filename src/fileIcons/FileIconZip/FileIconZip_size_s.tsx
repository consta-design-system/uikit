import * as React from 'react';
import { SVGProps } from 'react';

const FileIconZipSizeS = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 28" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width={24} height={28} rx={2} />
    <path
      opacity={0.6}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 12H5v13h14V12h-5v1h4v11H6V12Zm1 0h3v1h2v1h-2v1h2v1h-2v2h1v4H8v-4h1v-1H7v-1h2v-1H7v-1h2v-1H7v-1Zm3 7H9v2h1v-2Z"
      fill="#fff"
    />
    <path
      d="M13 2v1h-1V2h1ZM10 5V4h3v4h1v1h-4V8h2V5h-2ZM9 9H5V8l2.5-3H5V4h4v1L6.68 8H9v1Z"
      fill="#fff"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.8 4v.24c.207-.16.473-.24.8-.24h.7c.587 0 1.017.127 1.29.38.273.247.41.653.41 1.22v1.8c0 .56-.14.967-.42 1.22-.273.253-.7.38-1.28.38h-1.29v2H15V4h.8Zm.85 1c-.22 0-.383.06-.49.18a.53.53 0 0 0-.16.37L16.01 8h1.24c.247 0 .433-.057.56-.17.127-.113.19-.273.19-.48v-1.7c0-.207-.063-.367-.19-.48-.127-.113-.313-.17-.56-.17h-.6Z"
      fill="#fff"
    />
  </svg>
);
export default FileIconZipSizeS;
