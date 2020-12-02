import './Tooltip.css';

import React from 'react';
import { classnames } from '@bem-react/classnames';

import { ClickOutsideHandler } from '../../hooks/useClickOutside/useClickOutside';
import { cn } from '../../utils/bem';
import { Direction, Popover, PositioningProps } from '../Popover/Popover';
import { useTheme } from '../Theme/Theme';

const ARROW_SIZE = 6;
const ARROW_OFFSET = 8;

const cnTooltip = cn('Tooltip');

export const sizes = ['s', 'm', 'l'] as const;

type Size = typeof sizes[number];

export const tooltipPropStatus = ['normal', 'alert', 'success', 'warning'] as const;
export type TooltipPropStatus = typeof tooltipPropStatus[number];

type Props = {
  size: Size;
  status?: TooltipPropStatus;
  direction?: Direction;
  spareDirection?: Direction;
  possibleDirections?: readonly Direction[];
  isInteractive?: boolean;
  children: React.ReactNode;
  onClickOutside?: ClickOutsideHandler;
  className?: string;
} & PositioningProps;

export const Tooltip = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, size, status, ...rest } = props;
  const { themeClassNames } = useTheme();

  const className = status
    ? classnames(props.className, themeClassNames.color.accent)
    : classnames(props.className, themeClassNames.color.invert);

  return (
    <Popover arrowOffset={ARROW_OFFSET + ARROW_SIZE} offset={ARROW_SIZE + 4} {...rest}>
      {(direction) => (
        <div
          ref={ref}
          className={cnTooltip({ status }, [className])}
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
