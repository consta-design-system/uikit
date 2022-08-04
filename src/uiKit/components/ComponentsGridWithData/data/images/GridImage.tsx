import * as React from 'react';

const GridImage = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <path
        fill="#004166"
        fillOpacity={0.2}
        d="M30 18v88h-8V18zM48 18v88h-8V18zM66 18v88h-8V18zM84 18v88h-8V18zM102 18v88h-8V18zM120 18v88h-8V18zM138 18v88h-8V18zM156 18v88h-8V18zM174 18v88h-8V18z"
      />
      <path
        fill="#0078D2"
        d="M174 33v58h-44V33zM120 67v24H22V67zM66 33v24H22V33zM120 33v24H76V33z"
        opacity={0.4}
      />
    </svg>
  );
};

export default GridImage;
