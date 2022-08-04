import * as React from 'react';

const DateTimeImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path fill="#ECF1F4" d="M0 0h200v120H0z" />
      <path
        d="M0 4a4 4 0 014-4h192a4 4 0 014 4v112a4 4 0 01-4 4H4a4 4 0 01-4-4V4z"
        fill="#ECF1F4"
      />
      <rect x={25} y={9} width={149} height={103} rx={4} fill="#fff" />
      <circle cx={69.5} cy={77.5} r={7.5} fill="#0078D2" />
      <circle cx={39.5} cy={77.5} r={2.5} fill="#002033" fillOpacity={0.3} />
      <circle cx={99.5} cy={77.5} r={2.5} fill="#002033" fillOpacity={0.3} />
      <circle cx={129.5} cy={77.5} r={2.5} fill="#002033" fillOpacity={0.3} />
      <circle cx={159.5} cy={77.5} r={2.5} fill="#002033" fillOpacity={0.3} />
      <circle cx={99.5} cy={48.5} r={2.5} fill="#002033" fillOpacity={0.3} />
      <circle cx={99.5} cy={99.5} r={2.5} fill="#002033" fillOpacity={0.3} />
      <circle cx={129.5} cy={48.5} r={2.5} fill="#002033" fillOpacity={0.3} />
      <circle cx={159.5} cy={48.5} r={2.5} fill="#002033" fillOpacity={0.3} />
      <circle cx={129.5} cy={99.5} r={2.5} fill="#002033" fillOpacity={0.3} />
      <circle cx={159.5} cy={99.5} r={2.5} fill="#002033" fillOpacity={0.3} />
      <circle cx={69.5} cy={48.5} r={2.5} fill="#002033" fillOpacity={0.3} />
      <circle cx={69.5} cy={99.5} r={2.5} fill="#002033" fillOpacity={0.3} />
      <circle cx={39.5} cy={48.5} r={2.5} fill="#002033" fillOpacity={0.3} />
      <circle cx={39.5} cy={99.5} r={2.5} fill="#002033" fillOpacity={0.3} />
      <rect
        x={62}
        y={19}
        width={75}
        height={12}
        rx={3}
        fill="#002033"
        fillOpacity={0.35}
      />
      <rect
        x={37}
        y={19}
        width={11}
        height={12}
        rx={3}
        fill="#002033"
        fillOpacity={0.35}
      />
      <rect
        x={151}
        y={19}
        width={11}
        height={12}
        rx={3}
        fill="#002033"
        fillOpacity={0.35}
      />
    </svg>
  );
};

export default DateTimeImage;
