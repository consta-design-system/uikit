import React from 'react';
import bem from '../../utils/bem';

const b = bem('icon');

type CommonProps = {
  view: 'alert' | 'brand' | 'ghost' | 'link' | 'primary' | 'secondary' | 'success' | 'warning';
  size: 'xs' | 's' | 'm';
  className?: string;
};

const Icon: React.FC<CommonProps> = props => {
  const { view, size, children, className } = props;
  let width;

  if (size === 'xs') width = 11;
  else if (size === 's') width = 16;
  else if (size === 'm') width = 24;

  return (
    <svg
      className={b(
        {
          view,
          size,
        },
        className,
      )}
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export default Icon;
