import './SliderLine.css';

import React, { useEffect, useState } from 'react';

import { cn } from '../../../utils/bem';
import { SliderLineProps } from '../helper';

const cnSliderLine = cn('SliderLine');

export const SliderLine = (props: SliderLineProps) => {
  const { hovered, onHover, lines, disabled, view = 'default', ...otherProps } = props;

  const [isLineHovered, setIsLineHovered] = useState<boolean>(false);

  useEffect(() => {
    setIsLineHovered(!!hovered);
  }, [hovered]);

  const handleHover = (active: boolean) => {
    if (!disabled && active) {
      setIsLineHovered(true);
      onHover?.(true);
    }
  };

  const handleBlur = (active: boolean) => {
    if (!disabled && active) {
      setIsLineHovered(false);
      onHover?.(false);
    }
  };

  return (
    <div className={cnSliderLine({ view })} {...otherProps}>
      {lines &&
        lines.map((line) => (
          <div
            onMouseEnter={() => handleHover(line.active)}
            onMouseLeave={() => handleBlur(line.active)}
            className={cnSliderLine('Line', {
              active: line.active,
              hovered: line.active && isLineHovered,
              disabled,
            })}
            style={{
              ['--slider-line-size' as string]: `${line.width}%`,
            }}
          />
        ))}
    </div>
  );
};
