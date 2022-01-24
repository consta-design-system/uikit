import React, { useEffect, useRef, useState } from 'react';

import { Tooltip, TooltipProps as TooltipComponentProps } from '../../components/Tooltip/Tooltip';
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

export type WithTooltipProps<Props> = Omit<Props, 'tooltipProps'> & { tooltipProps?: TooltipProps };

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
        if (ref.current.closeFunction) {
          ref.current.closeFunction();
        }
      }
    }
    closeFunctions.splice(0);
    closeFunctions.push(currentRef);
  }
}

export function withTooltip(hocProps?: TooltipProps) {
  return function<
    COMPONENT_TYPE extends
      | React.ComponentType<React.PropsWithRef<ComponentProps>>
      | ((props: ComponentProps) => React.ReactElement | null),
    COMPONENT_PROPS extends ComponentProps
  >(Component: COMPONENT_TYPE) {
    return (React.forwardRef<HTMLElement, WithTooltipProps<COMPONENT_PROPS>>((props, ref) => {
      const { tooltipProps: tooltipPropsFromComponent = {}, ...componentProps } = props;
      const tooltipProps: TooltipProps = { ...hocProps, ...tooltipPropsFromComponent };
      const {
        mode = 'mouseover',
        content,
        closeOnClickOutside = true,
        appearTimeout = appearTimeoutDefault,
        exitTimeout = exitTimeoutDefault,
        style,
        ...otherTooltipProps
      } = tooltipProps;

      const [visible, setVisible] = useState<boolean>(false);
      const componentRef = useRef<HTMLElement | null>(null);
      const tooltipRef = useRef<HTMLDivElement | null>(null);
      const clearRef = useRef<ClearTooltip>({});

      const clearTimer = () => {
        if (clearRef.current.timer) {
          clearTimeout(clearRef.current.timer);
        }
      };

      const setExitTimer = () => {
        if (mode === 'mouseover' && visible) {
          clearRef.current.timer = setTimeout(() => setVisible(false), exitTimeout);
        }
      };

      const setAppearTimer = () => {
        if (mode === 'mouseover' && !visible) {
          clearRef.current.timer = setTimeout(() => setVisible(true), appearTimeout);
        }
      };

      useEffect(() => {
        // очищаем ссылку в clearTooltips при размонтировании компонента
        return () => clearTooltips(clearRef, true);
      }, []);

      useEffect(() => {
        if (visible) {
          clearRef.current.closeFunction = () => setVisible(false);
          clearTooltips(clearRef);
        }
      }, [visible]);

      const onClick = (e: React.MouseEvent) => {
        if (mode === 'click') {
          setVisible(!visible);
        }
        if (props.onClick) {
          props?.onClick(e);
        }
      };

      const onClickOutside = () => {
        if (mode === 'click' && closeOnClickOutside) {
          setVisible(false);
        }
      };

      const onMouseEnter = (e: React.MouseEvent) => {
        if (mode === 'mouseover') {
          clearTimer();
          setAppearTimer();
        }

        if (props.onMouseEnter) {
          props.onMouseEnter(e);
        }
      };

      const onMouseLeave = (e: React.MouseEvent) => {
        clearTimer();
        setExitTimer();
        if (props.onMouseLeave) {
          props.onMouseLeave(e);
        }
      };

      const tooltipOnMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        clearTimer();
        if (otherTooltipProps.onMouseEnter) {
          otherTooltipProps.onMouseEnter(e);
        }
      };

      const tooltipOnMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        clearTimer();
        setExitTimer();
        if (otherTooltipProps.onMouseLeave) {
          otherTooltipProps.onMouseLeave(e);
        }
      };

      const Anchor = Component as React.ComponentType<COMPONENT_PROPS>;

      return (
        <>
          <Anchor
            {...(componentProps as COMPONENT_PROPS)}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={useForkRef([componentRef, ref])}
            style={style}
          />
          {visible && (
            <Tooltip
              {...otherTooltipProps}
              ref={tooltipRef}
              anchorRef={componentRef}
              onClickOutside={onClickOutside}
              onMouseEnter={tooltipOnMouseEnter}
              onMouseLeave={tooltipOnMouseLeave}
              style={typeof style?.zIndex === 'number' ? { zIndex: style.zIndex + 1 } : undefined}
            >
              {content}
            </Tooltip>
          )}
        </>
      );
      // привел к типам, так как прокинутый компонент может иметь джененрики и они потеряются за хоком
    }) as unknown) as COMPONENT_TYPE | React.ComponentType<WithTooltipProps<COMPONENT_PROPS>>;
  };
}
