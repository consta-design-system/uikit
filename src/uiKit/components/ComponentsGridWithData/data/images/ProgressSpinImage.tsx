import * as React from 'react';

const ProgressSpinImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path fill="#002033" fillOpacity={0.08} d="M0 0h200v120H0z" />
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#fff"
      />
      <mask id="SvgProgressSpinImage__path-2-inside-1_1885_15895" fill="#fff">
        <path d="M100 41a19 19 0 11-18.07 13.129l4.862 1.58A13.888 13.888 0 10100 46.111V41z" />
      </mask>
      <path
        d="M100 41a19 19 0 11-18.07 13.129l4.862 1.58A13.888 13.888 0 10100 46.111V41z"
        stroke="#0078D2"
        strokeWidth={8}
        mask="url(#SvgProgressSpinImage__path-2-inside-1_1885_15895)"
      />
      <mask id="SvgProgressSpinImage__path-3-inside-2_1885_15895" fill="#fff">
        <path d="M119 60c0 10.493-8.507 19-19 19s-19-8.507-19-19 8.507-19 19-19 19 8.507 19 19zm-32.888 0c0 7.67 6.218 13.888 13.888 13.888S113.888 67.67 113.888 60 107.67 46.112 100 46.112 86.112 52.33 86.112 60z" />
      </mask>
      <path
        d="M119 60c0 10.493-8.507 19-19 19s-19-8.507-19-19 8.507-19 19-19 19 8.507 19 19zm-32.888 0c0 7.67 6.218 13.888 13.888 13.888S113.888 67.67 113.888 60 107.67 46.112 100 46.112 86.112 52.33 86.112 60z"
        stroke="#002033"
        strokeOpacity={0.05}
        strokeWidth={8}
        mask="url(#SvgProgressSpinImage__path-3-inside-2_1885_15895)"
      />
    </svg>
  );
};

export default ProgressSpinImage;
