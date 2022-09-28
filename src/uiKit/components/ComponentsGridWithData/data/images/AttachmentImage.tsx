import * as React from 'react';

const AttachmentImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <path
        d="M53.667 35.5H23.333C22.045 35.5 21 36.575 21 37.9v43.2c0 1.326 1.045 2.4 2.333 2.4h30.334c1.288 0 2.333-1.075 2.333-2.4V37.9c0-1.325-1.045-2.4-2.333-2.4z"
        fill="#0078D2"
      />
      <circle cx={39} cy={59.5} r={8} fill="#0078D2" />
      <mask id="SvgAttachmentImage__path-4-inside-1_1730_8734" fill="#fff">
        <path d="M39 53.5a6 6 0 11-5.706 4.146l1.883.612A4.019 4.019 0 1039 55.48V53.5z" />
      </mask>
      <path
        d="M39 53.5a6 6 0 11-5.706 4.146l1.883.612A4.019 4.019 0 1039 55.48V53.5z"
        stroke="#fff"
        strokeWidth={2}
        mask="url(#SvgAttachmentImage__path-4-inside-1_1730_8734)"
      />
      <path fill="#002033" fillOpacity={0.3} d="M64 44h115v12H64z" />
      <path fill="#DEE4E8" d="M64 64h115v3.5H64zM64 71.5h56V75H64z" />
    </svg>
  );
};

export default AttachmentImage;
