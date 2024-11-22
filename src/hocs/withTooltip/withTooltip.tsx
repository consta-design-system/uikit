import React, { useCallback, useRef } from 'react';

import {
  Tooltip,
  TooltipProps as TooltipComponentProps,
} from '##/components/Tooltip';
import { useDebounce } from '##/hooks/useDebounce';
import { useFlag } from '##/hooks/useFlag';
import { useForkRef } from '##/hooks/useForkRef';
import { useMutableRef } from '##/hooks/useMutableRef';

export const withTooltipPropMode = ['mouseover', 'click'] as const;
export const withTooltipPropModeDefault = withTooltipPropMode[0];
type WithTooltipPropMode = typeof withTooltipPropMode[number];

export const appearTimeoutDefault = 400;
export const exitTimeoutDefault = 200;

type ComponentProps = {
  onClick?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
};

export type TooltipProps = Omit<TooltipComponentProps, 'children' | 'ref'> & {
  tooltipContent?: React.ReactNode;
  /** @deprecated use tooltipContent */
  content?: React.ReactNode;
  mode?: WithTooltipPropMode;
  closeOnClickOutside?: boolean;
  appearTimeout?: number;
  exitTimeout?: number;
};

export type WithTooltipProps<Props> = Omit<Props, 'tooltipProps'> & {
  tooltipProps?: TooltipProps;
};

type HoverState = {
  tooltip: boolean;
  anchor: boolean;
};

export function withTooltip(hocProps?: TooltipProps) {
  return function <COMPONENT_TYPE, COMPONENT_PROPS extends ComponentProps>(
    Component: COMPONENT_TYPE,
  ) {
    return React.forwardRef<HTMLElement, WithTooltipProps<COMPONENT_PROPS>>(
      (props, ref) => {
        const { tooltipProps = {}, ...componentProps } = props;

        const {
          mode = 'mouseover',
          tooltipContent,
          content,
          closeOnClickOutside = true,
          appearTimeout = appearTimeoutDefault,
          exitTimeout = exitTimeoutDefault,
          ...otherTooltipProps
        } = {
          ...hocProps,
          ...tooltipProps,
        };

        const resultContent = tooltipContent ?? content;

        const [visible, setVisible] = useFlag();
        const anchorRef = useRef<HTMLElement>(null);

        const hoverStateRef = useRef<HoverState>({
          tooltip: false,
          anchor: false,
        });

        const mutablePropsRef = useMutableRef([
          componentProps.onMouseEnter,
          componentProps.onMouseLeave,
          otherTooltipProps.onMouseEnter,
          otherTooltipProps.onMouseLeave,
          componentProps.onClick,
          mode,
          closeOnClickOutside,
        ] as const);

        const mouseEnterController = useDebounce(
          useCallback(() => {
            mutablePropsRef.current[5] === 'mouseover' &&
              (hoverStateRef.current.anchor || hoverStateRef.current.tooltip) &&
              setVisible.on();
          }, []),
          appearTimeout,
        );

        const mouseLeaveController = useDebounce(
          useCallback(() => {
            mutablePropsRef.current[5] === 'mouseover' &&
              !hoverStateRef.current.anchor &&
              !hoverStateRef.current.tooltip &&
              setVisible.off();
          }, []),
          exitTimeout,
        );

        const anchorOnMouseEnter: React.MouseEventHandler<HTMLDivElement> =
          useCallback((e) => {
            hoverStateRef.current.anchor = true;
            mouseEnterController();
            mutablePropsRef.current[0]?.(e);
          }, []);

        const anchorOnMouseLeave: React.MouseEventHandler<HTMLDivElement> =
          useCallback((e) => {
            hoverStateRef.current.anchor = false;
            mouseLeaveController();
            mutablePropsRef.current[1]?.(e);
          }, []);

        const tooltipOnMouseEnter: React.MouseEventHandler<HTMLDivElement> =
          useCallback((e) => {
            hoverStateRef.current.tooltip = true;
            mouseEnterController();
            mutablePropsRef.current[2]?.(e);
          }, []);

        const tooltipOnMouseLeave: React.MouseEventHandler<HTMLDivElement> =
          useCallback((e) => {
            hoverStateRef.current.tooltip = false;
            mouseLeaveController();
            mutablePropsRef.current[3]?.(e);
          }, []);

        const tooltipOnClickOutside = useCallback(() => {
          mutablePropsRef.current[5] === 'click' &&
            mutablePropsRef.current[6] &&
            setVisible.off();
        }, [mode, closeOnClickOutside]);

        const anchorOnClick: React.MouseEventHandler = useCallback((e) => {
          mutablePropsRef.current[5] === 'click' && setVisible.toggle();
          mutablePropsRef.current[4]?.(e);
        }, []);

        const Anchor =
          Component as unknown as React.ComponentType<COMPONENT_PROPS>;

        return (
          <>
            <Anchor
              {...(componentProps as COMPONENT_PROPS)}
              onClick={anchorOnClick}
              onMouseEnter={anchorOnMouseEnter}
              onMouseLeave={anchorOnMouseLeave}
              ref={useForkRef([anchorRef, ref])}
            />
            <Tooltip
              {...otherTooltipProps}
              isOpen={visible && !!resultContent}
              className={otherTooltipProps.className}
              anchorRef={anchorRef}
              onClickOutside={tooltipOnClickOutside}
              onMouseEnter={tooltipOnMouseEnter}
              onMouseLeave={tooltipOnMouseLeave}
            >
              {resultContent}
            </Tooltip>
          </>
        );
        // привел к типам, так как прокинутый компонент может иметь дженерики и они потеряются за хоком
      },
    ) as unknown as
      | COMPONENT_TYPE
      | React.ComponentType<{
          tooltipProps?: TooltipProps;
        }>;
  };
}
