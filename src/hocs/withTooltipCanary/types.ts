import { TooltipProps } from '##/components/Tooltip';

export const withTooltipPropMode = ['mouseover', 'click'] as const;
export const withTooltipPropModeDefault = withTooltipPropMode[0];
type WithTooltipPropMode = typeof withTooltipPropMode[number];

export const appearTimeoutDefault = 400;
export const exitTimeoutDefault = 200;

export type WithTooltipComponentProps = {
  onClick?: (() => void) | React.EventHandler<React.MouseEvent>;
  onMouseEnter?: (() => void) | React.MouseEventHandler;
  onMouseLeave?: (() => void) | React.MouseEventHandler;
};

export type WithTooltipProps = Omit<TooltipProps, 'children' | 'ref'> & {
  content?: React.ReactNode;
  mode?: WithTooltipPropMode;
  closeOnClickOutside?: boolean;
  appearTimeout?: number;
  exitTimeout?: number;
};
