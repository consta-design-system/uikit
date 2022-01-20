import * as React from 'react';

function SliderImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z" fill="#fff" />
      <rect
        width={158}
        height={2}
        rx={1}
        transform="matrix(1 0 -.01174 .99993 21 80)"
        fill="#004166"
        fillOpacity={0.2}
      />
      <rect
        width={158}
        height={2}
        rx={1}
        transform="matrix(1 0 -.01174 .99993 21.023 41)"
        fill="#004166"
        fillOpacity={0.2}
      />
      <path fill="#0078D2" d="M77.407 80h42.617L120 82H77.384z" />
      <g clipPath="url(#SvgSliderImage__clip0_1910_15933)">
        <path fill="#0078D2" d="M21.047 41h74.686l-.023 2H21.024z" />
      </g>
      <circle cx={74.5} cy={81.5} transform="rotate(-90 74.5 81.5)" fill="#0078D2" r={5.5} />
      <circle cx={122.5} cy={81.5} transform="rotate(-90 122.5 81.5)" fill="#0078D2" r={5.5} />
      <circle cx={97.5} cy={42.5} transform="rotate(-90 97.5 42.5)" fill="#0078D2" r={5.5} />
      <defs>
        <clipPath id="SvgSliderImage__clip0_1910_15933">
          <path
            d="M21.035 42c.007-.552.46-1 1.012-1h72.686c.552 0 .995.448.988 1-.007.552-.46 1-1.012 1H22.023a.986.986 0 01-.988-1z"
            fill="#fff"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SliderImage;
