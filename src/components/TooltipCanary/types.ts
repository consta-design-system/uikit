import { ClickOutsideHandler } from '##/hooks/useClickOutside/useClickOutside';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { Direction, PositioningProps } from '../Popover/Popover';

export const tooltipPropSizes = ['m', 's', 'l'] as const;
export type TooltipPropSize = typeof tooltipPropSizes[number];
export const tooltipPropSizesDefault: TooltipPropSize = tooltipPropSizes[0];

export const tooltipPropStatus = [
  'normal',
  'alert',
  'success',
  'warning',
] as const;
export type TooltipPropStatus = typeof tooltipPropStatus[number];

export type TooltipProps = PropsWithHTMLAttributesAndRef<
  {
    isOpen?: boolean;
    size?: TooltipPropSize;
    status?: TooltipPropStatus;
    direction?: Direction;
    spareDirection?: Direction;
    possibleDirections?: readonly Direction[];
    isInteractive?: boolean;
    children: React.ReactNode;
    onClickOutside?: ClickOutsideHandler;
    className?: string;
    offset?: number;
    onSetDirection?: (direction: Direction) => void;
  } & PositioningProps,
  HTMLDivElement
>;
