import { Direction, PositioningProps } from '##/components/Popover';
import { ClickOutsideHandler } from '##/hooks/useClickOutside';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

export const tooltipPropSizes = ['m', 's', 'l'] as const;
export const tooltipPropSizesDefault = tooltipPropSizes[0];
export type TooltipPropSize = typeof tooltipPropSizes[number];

export const tooltipPropStatus = [
  'normal',
  'alert',
  'success',
  'warning',
] as const;
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
    isOpen?: boolean;
  } & PositioningProps
>;
