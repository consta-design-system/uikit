import * as React from 'react';

const FileFieldImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <g clipPath="url(#SvgFileFieldImage__clip0_1889_15888)">
        <path
          d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
          fill="#ECF1F4"
        />
        <path d="M31-5h138v96a4 4 0 01-4 4H35a4 4 0 01-4-4V-5z" fill="#fff" />
        <path
          d="M31.5-4.5h137V91a3.5 3.5 0 01-3.5 3.5H35a3.5 3.5 0 01-3.5-3.5V-4.5z"
          stroke="#004166"
          strokeOpacity={0.2}
        />
        <rect
          x={44.5}
          y={56.5}
          width={109}
          height={22}
          rx={1.5}
          fill="#0078D2"
          stroke="#0078D2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M102.149 63.587a1.654 1.654 0 00-2.34 0l-3.898 3.9a2.757 2.757 0 103.899 3.9l2.744-2.745a.552.552 0 01.78.78l-2.744 2.744a3.86 3.86 0 01-5.46-5.46l3.9-3.898a2.757 2.757 0 113.899 3.899L99.036 70.6a1.654 1.654 0 01-2.34-2.34l3.114-3.113a.552.552 0 01.78.78l-3.114 3.114a.552.552 0 00.78.78l3.893-3.894a1.654 1.654 0 000-2.34z"
          fill="#fff"
        />
        <path
          stroke="#004166"
          strokeOpacity={0.2}
          strokeWidth={2}
          strokeDasharray="4 4"
          d="M45-20h108v60H45z"
        />
      </g>
      <defs>
        <clipPath id="SvgFileFieldImage__clip0_1889_15888">
          <path fill="#fff" d="M0 0h200v120H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FileFieldImage;
