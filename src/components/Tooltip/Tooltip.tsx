import './Tooltip.css';

import React, { useState } from 'react';
import { classnames } from '@bem-react/classnames';

import { ClickOutsideHandler } from '../../hooks/useClickOutside/useClickOutside';
import { cn } from '../../utils/bem';
import { PropsWithJsxAttributes } from '../../utils/types/PropsWithJsxAttributes';
import { Direction, Popover, PositioningProps } from '../Popover/Popover';
import { Text } from '../Text/Text';
import { useTheme } from '../Theme/Theme';

const ARROW_SIZE = 6;
const ARROW_OFFSET = 8;

const cnTooltip = cn('Tooltip');

export const tooltipPropSizes = ['m', 's', 'l'] as const;
export const tooltipPropSizesDefault = tooltipPropSizes[0];
export type TooltipPropSize = typeof tooltipPropSizes[number];

export const tooltipPropStatus = ['normal', 'alert', 'success', 'warning'] as const;
export type TooltipPropStatus = typeof tooltipPropStatus[number];

export type TooltipProps = PropsWithJsxAttributes<
  {
    size?: TooltipPropSize;
    status?: TooltipPropStatus;
    direction?: Direction;
    spareDirection?: Direction;
    possibleDirections?: readonly Direction[];
    isInteractive?: boolean;
    children: React.ReactNode;
    onClickOutside?: ClickOutsideHandler;
    className?: string;
    onSetDirection?: (direction: Direction) => void;
  } & PositioningProps
>;

function renderChildren(children: React.ReactNode): React.ReactNode {
  return typeof children === 'string' || typeof children === 'number' ? (
    <Text size="xs">{children}</Text>
  ) : (
    children
  );
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const {
    children,
    size = tooltipPropSizesDefault,
    className: propsClassName,
    status,
    onSetDirection: onSetDirectionProp,
    style,
    ...rest
  } = props;
  const { themeClassNames } = useTheme();
  const [direction, setDirection] = useState<Direction | undefined>(undefined);

  const className = status
    ? classnames(propsClassName, themeClassNames.color.accent)
    : classnames(propsClassName, themeClassNames.color.invert);

  const onSetDirection = (direction: Direction) => {
    onSetDirectionProp && onSetDirectionProp(direction);
    setDirection(direction);
  };

  return (
    <Popover
      {...rest}
      arrowOffset={ARROW_OFFSET + ARROW_SIZE}
      offset={ARROW_SIZE + 4}
      onSetDirection={onSetDirection}
      ref={ref}
      className={cnTooltip({ status }, [className])}
      style={{
        ['--tooltip-arrow-size' as string]: `${ARROW_SIZE}px`,
        ['--tooltip-arrow-offset' as string]: `${ARROW_OFFSET}px`,
        ...style,
      }}
    >
      <div className={cnTooltip('Background')} />
      <div className={cnTooltip('Arrow', { direction })} />
      <div className={cnTooltip('Content', { size })}>{renderChildren(children)}</div>
    </Popover>
  );
});
