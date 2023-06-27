import React, { forwardRef, useContext, useEffect, useRef } from 'react';

import { Tooltip } from '##/components/Tooltip';
import { useFlag } from '##/hooks/useFlag';
import { useForkRef } from '##/hooks/useForkRef';

import { TooltipPropsContext } from './context';
import {
  appearTimeoutDefault,
  exitTimeoutDefault,
  WithTooltipComponentProps,
  WithTooltipProps,
} from './types';

type ClearTooltip = {
  closeFunction?: () => void;
  timer?: ReturnType<typeof setTimeout>;
};

type ClearTooltipRef = React.MutableRefObject<ClearTooltip>;

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

export const withTooltip = <COMPONENT_TYPE,>(
  Component: COMPONENT_TYPE,
  hocProps?: WithTooltipProps,
) =>
  forwardRef<HTMLElement, WithTooltipComponentProps>((props, ref) => {
    const contextProps = useContext(TooltipPropsContext);

    const {
      onClick: onClickProp,
      onMouseEnter: onMouseEnterProp,
      onMouseLeave: onMouseLeaveProp,
      ...otherProps
    } = props;

    const {
      mode = 'mouseover',
      content,
      closeOnClickOutside = true,
      appearTimeout = appearTimeoutDefault,
      exitTimeout = exitTimeoutDefault,
      ...otherTooltipProps
    } = { ...(hocProps ?? {}), ...contextProps };

    const [visible, setVisible] = useFlag();
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

    // Сделано так, потому что при любом экстенде типов жалуется на обязательные пропсы
    const Anchor = Component as unknown as React.ComponentType<
      WithTooltipComponentProps & {
        ref?: React.Ref<HTMLElement>;
        style?: React.CSSProperties;
      }
    >;

    return (
      <>
        <Anchor
          {...otherProps} // Разворачиваются свойства компонента
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
  }) as unknown as COMPONENT_TYPE;
