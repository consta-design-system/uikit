import * as React from 'react';

const ThemeImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path fill="#ECF1F4" d="M0 0h200v120H0z" />
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#ECF1F4"
      />
      <path fill="#fff" d="M75 24h50v73H75z" />
      <rect x={83} y={35} width={35} height={23} rx={4} fill="#ECF1F4" />
      <path fill="#002033" d="M83 69h35v4H83z" />
      <path fill="#002033" fillOpacity={0.3} d="M83 78h35v8H83z" />
      <path opacity={0.75} fill="#22272B" d="M25 24h50v73H25z" />
      <rect x={33} y={35} width={35} height={23} rx={4} fill="#161A1D" />
      <path fill="#FAFAFA" d="M33 69h35v4H33z" />
      <path fill="#fff" fillOpacity={0.6} d="M33 78h35v8H33z" />
      <path opacity={0.75} fill="#002033" d="M125 24h50v73h-50z" />
      <rect x={133} y={35} width={35} height={23} rx={4} fill="#002D47" />
      <path fill="#EEF8FB" d="M133 69h35v4h-35z" />
      <path fill="#F6FBFD" fillOpacity={0.3} d="M133 78h35v8h-35z" />
    </svg>
  );
};

export default ThemeImage;
