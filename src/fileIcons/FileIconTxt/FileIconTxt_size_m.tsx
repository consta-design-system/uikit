import * as React from 'react';
import { SVGProps } from 'react';

const FileIconTxtSizeM = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M28 0H2a2 2 0 0 0-2 2v36a2 2 0 0 0 2 2h26a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z" />
    <path
      opacity={0.6}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 20h16v-1H7v1Zm0 4h16v-1H7v1Zm16 4H7v-1h16v1ZM7 32h5v-1H7v1Z"
      fill="#fff"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.05 12c-.34 0-.6-.11-.78-.33-.18-.22-.27-.51-.27-.87V8H9V7h1V6h1v1h1v1h-1v2.6c0 .147.037.25.11.31.073.06.187.09.34.09H12v1h-.95ZM14 12h-1v-2h1V9h-1V7h1v1.5l1 .5 1-.5V7h1v2h-1v1h1v2h-1v-1.5l-1-.5-1 .5V12Zm5.27-.33c.18.22.44.33.78.33H21v-1h-.55c-.153 0-.267-.03-.34-.09-.073-.06-.11-.163-.11-.31V8h1V7h-1V6h-1v1h-1v1h1v2.8c0 .36.09.65.27.87Z"
      fill="#fff"
    />
  </svg>
);
export default FileIconTxtSizeM;
