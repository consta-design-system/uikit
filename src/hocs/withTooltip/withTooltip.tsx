import React, { useEffect, useRef } from 'react';

import { useFlag } from '##/hooks/useFlag';

import {
  Tooltip,
  TooltipProps as TooltipComponentProps,
} from '../../components/Tooltip/Tooltip';
import { useForkRef } from '../../hooks/useForkRef/useForkRef';

export const withTooltipPropMode = ['mouseover', 'click'] as const;
export const withTooltipPropModeDefault = withTooltipPropMode[0];
type WithTooltipPropMode = typeof withTooltipPropMode[number];

export const appearTimeoutDefault = 400;
export const exitTimeoutDefault = 200;

type ComponentProps = {
  onClick?: (() => void) | React.EventHandler<React.MouseEvent>;
  onMouseEnter?: (() => void) | React.MouseEventHandler;
  onMouseLeave?: (() => void) | React.MouseEventHandler;
};

export type TooltipProps = Omit<TooltipComponentProps, 'children' | 'ref'> & {
  content?: React.ReactNode;
  mode?: WithTooltipPropMode;
  closeOnClickOutside?: boolean;
  appearTimeout?: number;
  exitTimeout?: number;
};

type ClearTooltip = {
  closeFunction?: () => void;
  timer?: ReturnType<typeof setTimeout>;
};

type ClearTooltipRef = React.MutableRefObject<ClearTooltip>;

export type WithTooltipProps<Props> = Omit<Props, 'tooltipProps'> & {
  tooltipProps?: TooltipProps;
};

const closeFunctions: ClearTooltipRef[] = [];
// функция которая закроет все тултипы на странице кроме текущего с которым взаимодействует пользователь
function clearTooltips(currentRef: ClearTooltipRef, removeCurrent?: boolean) {
  if (removeCurrent) {
    // удаляем только текущую функцию закрытия, нужна если компонент размонтируется
    if (currentRef.current.timer) {
      clearTimeout(currentRef.current.timer);
    }
    const index = closeFunctions.findIndex((ref) => ref === currentRef);
    closeFunctions.splice(index, 1);
  } else {
    // закрываем все тултипы на странице кроме текущего с которым взаимодействует пользователь
    for (const ref of closeFunctions) {
      if (currentRef !== ref) {
        if (ref.current.timer) {
          clearTimeout(ref.current.timer);
        }
        ref.current.closeFunction?.();
      }
    }
    closeFunctions.splice(0);
    closeFunctions.push(currentRef);
  }
}

export function withTooltip(hocProps?: TooltipProps) {
  return function <COMPONENT_TYPE, COMPONENT_PROPS extends ComponentProps>(
    Component: COMPONENT_TYPE,
  ) {
    return React.forwardRef<HTMLElement, WithTooltipProps<COMPONENT_PROPS>>(
      (props, ref) => {
        const {
          tooltipProps: tooltipPropsFromComponent = {},
          onClick: onClickProp,
          onMouseEnter: onMouseEnterProp,
          onMouseLeave: onMouseLeaveProp,
          ...componentProps
        } = props;
        const tooltipProps: TooltipProps = {
          ...hocProps,
          ...tooltipPropsFromComponent,
        };
        const {
          mode = 'mouseover',
          content,
          closeOnClickOutside = true,
          appearTimeout = appearTimeoutDefault,
          exitTimeout = exitTimeoutDefault,
          ...otherTooltipProps
        } = tooltipProps;

        const [visible, setVisible] = useFlag();
        const componentRef = useRef<HTMLElement>(null);
        const tooltipRef = useRef<HTMLDivElement>(null);
        const clearRef = useRef<ClearTooltip>({});

        const clearTimer = () => {
          if (clearRef.current.timer) {
            clearTimeout(clearRef.current.timer);
          }
        };

        const setExitTimer = () => {
          if (mode === 'mouseover' && visible) {
            clearRef.current.timer = setTimeout(setVisible.off, exitTimeout);
          }
        };

        const setAppearTimer = () => {
          if (mode === 'mouseover' && !visible) {
            clearRef.current.timer = setTimeout(setVisible.on, appearTimeout);
          }
        };

        useEffect(() => {
          // очищаем ссылку в clearTooltips при размонтировании компонента
          return () => clearTooltips(clearRef, true);
        }, []);

        useEffect(() => {
          if (visible) {
            clearRef.current.closeFunction = setVisible.off;
            clearTooltips(clearRef);
          }
        }, [visible]);

        const onClick = (e: React.MouseEvent) => {
          if (mode === 'click') {
            setVisible.toggle();
          }
          onClickProp?.(e);
        };

        const onClickOutside = () => {
          if (mode === 'click' && closeOnClickOutside) {
            setVisible.off();
          }
        };

        const onMouseEnter = (e: React.MouseEvent) => {
          if (mode === 'mouseover') {
            clearTimer();
            setAppearTimer();
          }
          onMouseEnterProp?.(e);
        };

        const onMouseLeave = (e: React.MouseEvent) => {
          clearTimer();
          setExitTimer();
          onMouseLeaveProp?.(e);
        };

        const tooltipOnMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
          clearTimer();
          otherTooltipProps.onMouseEnter?.(e);
        };

        const tooltipOnMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
          clearTimer();
          setExitTimer();
          otherTooltipProps.onMouseLeave?.(e);
        };

        const Anchor =
          Component as unknown as React.ComponentType<COMPONENT_PROPS>;

        return (
          <>
            <Anchor
              {...(componentProps as COMPONENT_PROPS)}
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              ref={useForkRef([componentRef, ref])}
            />
            {visible && (
              <Tooltip
                {...otherTooltipProps}
                ref={tooltipRef}
                anchorRef={componentRef}
                onClickOutside={onClickOutside}
                onMouseEnter={tooltipOnMouseEnter}
                onMouseLeave={tooltipOnMouseLeave}
              >
                {content}
              </Tooltip>
            )}
          </>
        );
        // привел к типам, так как прокинутый компонент может иметь джененрики и они потеряются за хоком
      },
    ) as unknown as
      | COMPONENT_TYPE
      | React.ComponentType<WithTooltipProps<COMPONENT_PROPS>>;
  };
}
