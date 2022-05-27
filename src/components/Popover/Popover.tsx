import './Popover.css';

import React, { forwardRef, useEffect, useLayoutEffect } from 'react';

import { ClickOutsideHandler, useClickOutside } from '../../hooks/useClickOutside/useClickOutside';
import { useComponentSize } from '../../hooks/useComponentSize/useComponentSize';
import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cn } from '../../utils/bem';
import { PropsWithJsxAttributes } from '../../utils/types/PropsWithJsxAttributes';
import { PortalWithTheme, usePortalContext } from '../PortalWithTheme/PortalWithTheme';
import { useTheme } from '../Theme/Theme';

import { getComputedPositionAndDirection } from './helpers';
import { usePopoverReposition } from './usePopoverReposition';

export { usePopoverReposition };

/**
 * Стороны упорядочены по приоритету:
 * Используется первая сторона, в которую смог вписаться поповер.
 */
export const directionsStartCenter = [
  'downCenter',
  'upCenter',

  'downRight',
  'downLeft',
  'upRight',
  'upLeft',

  'leftUp',
  'leftCenter',
  'leftDown',

  'rightUp',
  'rightCenter',
  'rightDown',
] as const;

export const directionsStartEdge = [
  'downStartLeft',
  'upStartLeft',

  'downStartRight',
  'upStartRight',

  'leftStartUp',
  'leftStartDown',

  'rightStartUp',
  'rightStartDown',
] as const;

export const popoverPropOffset = [
  '3xs',
  '2xs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
] as const;
export type PopoverPropOffset = typeof popoverPropOffset[number] | number;

export const directions = [...directionsStartCenter, ...directionsStartEdge];

export type Direction = typeof directions[number];

export type Position = { x: number; y: number } | undefined;

export type PositioningProps =
  | {
      anchorRef: React.RefObject<HTMLElement>;
      equalAnchorWidth?: boolean;
      position?: never;
    }
  | {
      anchorRef?: never;
      equalAnchorWidth?: never;
      position: Position;
    };

type ChildrenRenderProp = (direction: Direction) => React.ReactNode;

export type Props = PropsWithJsxAttributes<
  {
    direction?: Direction;
    spareDirection?: Direction;
    offset?: PopoverPropOffset;
    arrowOffset?: number;
    possibleDirections?: readonly Direction[];
    isInteractive?: boolean;
    children: React.ReactNode | ChildrenRenderProp;
    onClickOutside?: ClickOutsideHandler;
    onSetDirection?: (direction: Direction) => void;
  } & PositioningProps
>;

const isRenderProp = (
  children: React.ReactNode | ChildrenRenderProp,
): children is ChildrenRenderProp => typeof children === 'function';

/**
 * Подписчик на PortalWithThemeProvider
 * получает рефы всех вложенных порталов в модалку
 * для дальнейшего исключения их из useClickOutside
 */
const ContextConsumer: React.FC<{
  onClickOutside?: (event: MouseEvent) => void;
  ignoreClicksInsideRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
}> = ({ onClickOutside, children, ignoreClicksInsideRefs }) => {
  const { refs } = usePortalContext();

  useClickOutside({
    isActive: !!onClickOutside,
    ignoreClicksInsideRefs: [...(ignoreClicksInsideRefs || []), ...(refs || [])],
    handler: (event: MouseEvent) => onClickOutside?.(event),
  });

  return <>{children}</>;
};

const cnPopover = cn('Popover');

export const Popover = forwardRef<HTMLDivElement, Props>((props, componentRef) => {
  const {
    children,
    direction: passedDirection = 'upCenter',
    offset = 0,
    arrowOffset,
    possibleDirections = directions,
    isInteractive = true,
    onClickOutside,
    spareDirection = 'downStartLeft',
    style,
    className,
    position: passedPosition,
    anchorRef,
    equalAnchorWidth,
    onSetDirection,
    ...otherProps
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [anchorClientRect, setAnchorClientRect] = React.useState<DOMRect | undefined>();
  const { width, height } = useComponentSize(ref);
  const anchorSize = useComponentSize(anchorRef || { current: null });
  const previousDirectionRef = React.useRef<Direction | null>(null);
  const [bannedDirections, setBannedDirections] = React.useState<readonly Direction[]>([]);

  const resetBannedDirections = () => {
    setBannedDirections((state) => (state.length ? [] : state));
    previousDirectionRef.current = null;
  };

  const updateAnchorClientRect = () =>
    setAnchorClientRect(anchorRef?.current?.getBoundingClientRect());

  const { position, direction } = getComputedPositionAndDirection({
    contentSize: { width, height },
    viewportSize: {
      // Размер вьюпорта без скроллбаров
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    },
    arrowOffset,
    direction: passedDirection,
    possibleDirections,
    bannedDirections,
    position: anchorClientRect
      ? { x: anchorClientRect.left, y: anchorClientRect.top }
      : passedPosition,
    anchorSize,
    spareDirection,
  });

  const content = isRenderProp(children) ? children(direction) : children;

  useLayoutEffect(() => onSetDirection?.(direction), [direction]);

  useLayoutEffect(resetBannedDirections, [props]);

  useEffect(updateAnchorClientRect, [anchorSize]);

  usePopoverReposition({
    scrollAnchorRef: anchorRef || { current: null },
    onRequestReposition: () => {
      resetBannedDirections();
      updateAnchorClientRect();
    },
  });

  /**
   * Может возникнуть ситуация, когда перерасчет поповера всегда будет выдавать 2 направления
   * и бесконечно зацикливать себя. Для избежания таких кейсов мы запоминаем стороны,
   * которые не подошли, чтобы не возвращаться к ним и предотвратить бесконечный ререндер.
   * См. PopoverBannedPositionsStory
   */
  if (previousDirectionRef.current !== direction) {
    if (previousDirectionRef.current && !bannedDirections.includes(previousDirectionRef.current)) {
      setBannedDirections((state) =>
        previousDirectionRef.current ? [...state, previousDirectionRef.current] : state,
      );
    }
    previousDirectionRef.current = direction;
  }

  // Сбрасываем при любом изменении пропсов, чтобы заново начать перебор направлений
  // Главное не сбрасывать при изменении размеров поповера, т.к. именно оно может вызвать бесконечный перебор

  return (
    <PortalWithTheme
      {...otherProps}
      preset={theme}
      className={cnPopover({ direction }, [className])}
      container={window.document.body}
      ref={useForkRef<HTMLDivElement>([ref, componentRef])}
      style={{
        ...style,
        ['--popover-top' as string]: `${(position?.y || 0) + window.scrollY}px`,
        ['--popover-left' as string]: `${(position?.x || 0) + window.scrollX}px`,
        [`--popover-width` as string]: equalAnchorWidth ? `${anchorSize.width}px` : undefined,
        [`--popover-pointer-events` as string]: isInteractive ? undefined : 'none',
        [`--popover-visibility` as string]: position ? undefined : 'hidden',
        [`--popover-offset` as string]:
          typeof offset === 'string' ? `var(--space-${offset})` : `${offset}px`,
      }}
    >
      <ContextConsumer
        onClickOutside={onClickOutside}
        ignoreClicksInsideRefs={[ref, anchorRef || { current: null }]}
      >
        {content}
      </ContextConsumer>
    </PortalWithTheme>
  );
});
