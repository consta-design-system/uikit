import React from 'react';
import bem from '../../utils/bem';

const b = bem('file');

type CommonProps = {
  size: 's' | 'm';
  className?: string;
};

const File: React.FC<CommonProps> = props => {
  const { size, children, className } = props;
  let width, height;

  if (size === 'm') {
    width = 30;
    height = 40;
  } else if (size === 's') {
    width = 21;
    height = 28;
  }

  return (
    <svg
      className={b({ size }, className)}
      width={width}
      height={height}
      fill={`none`}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export default File;
