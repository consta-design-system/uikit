import './Tooltip.css';

import React from 'react';

import { ClickOutsideHandler } from '../../hooks/useClickOutside/useClickOutside';
import { cn } from '../../utils/bem';
import { Direction, Popover, PositioningProps } from '../Popover/Popover';
import { useTheme } from '../Theme/Theme';

const ARROW_SIZE = 6;
const ARROW_OFFSET = 8;

const cnTooltip = cn('Tooltip');

export const sizes = ['s', 'm', 'l'] as const;

type Size = typeof sizes[number];

type Props = {
  size: Size;
  direction?: Direction;
  spareDirection?: Direction;
  possibleDirections?: readonly Direction[];
  isInteractive?: boolean;
  children: React.ReactNode;
  onClickOutside?: ClickOutsideHandler;
} & PositioningProps;

export const Tooltip = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, size, ...rest } = props;
  const { themeClassNames } = useTheme();

  return (
    <Popover arrowOffset={ARROW_OFFSET + ARROW_SIZE} offset={ARROW_SIZE + 4} {...rest}>
      {(direction) => (
        <div
          ref={ref}
          className={cnTooltip(null, [themeClassNames.color.invert])}
          style={{
            ['--tooltip-arrow-size' as string]: `${ARROW_SIZE}px`,
            ['--tooltip-arrow-offset' as string]: `${ARROW_OFFSET}px`,
          }}
        >
          <div className={cnTooltip('Background')} />
          <div className={cnTooltip('Arrow', { direction })} />
          <div className={cnTooltip('Content', { size })}>{children}</div>
        </div>
      )}
    </Popover>
  );
});
