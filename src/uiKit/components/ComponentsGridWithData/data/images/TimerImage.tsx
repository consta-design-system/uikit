import * as React from 'react';

const TimerImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <g clipPath="url(#SvgTimerImage__clip0_1789_8793)">
        <path
          d="M0 5a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V5z"
          fill="#fff"
        />
        <mask id="SvgTimerImage__path-2-inside-1_1789_8793" fill="#fff">
          <path d="M103.804 73.804a14.699 14.699 0 01-18.48-14.965 14.697 14.697 0 1129.353 1.538l-3.817-.2a10.875 10.875 0 10-8.045 9.935l.989 3.692z" />
        </mask>
        <path
          d="M103.804 73.804a14.699 14.699 0 01-18.48-14.965 14.697 14.697 0 1129.353 1.538l-3.817-.2a10.875 10.875 0 10-8.045 9.935l.989 3.692z"
          stroke="#004269"
          strokeOpacity={0.07}
          strokeWidth={8}
          mask="url(#SvgTimerImage__path-2-inside-1_1789_8793)"
        />
        <mask id="SvgTimerImage__path-3-inside-2_1789_8793" fill="#fff">
          <path d="M100 45a15 15 0 11-14.266 10.365l3.839 1.247A10.964 10.964 0 10100 49.036V45z" />
        </mask>
        <path
          d="M100 45a15 15 0 11-14.266 10.365l3.839 1.247A10.964 10.964 0 10100 49.036V45z"
          stroke="#0078D2"
          strokeWidth={8}
          mask="url(#SvgTimerImage__path-3-inside-2_1789_8793)"
        />
      </g>
      <defs>
        <clipPath id="SvgTimerImage__clip0_1789_8793">
          <path fill="#fff" d="M0 0h200v120H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TimerImage;
