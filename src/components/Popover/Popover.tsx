import React from 'react';

import { ClickOutsideHandler, useClickOutside } from '../../hooks/useClickOutside/useClickOutside';
import { useComponentSize } from '../../hooks/useComponentSize/useComponentSize';
import { PropsWithJsxAttributes } from '../../utils/types/PropsWithJsxAttributes';
import { PortalWithTheme } from '../PortalWithTheme/PortalWithTheme';
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
    offset?: number;
    arrowOffset?: number;
    possibleDirections?: readonly Direction[];
    isInteractive?: boolean;
    children: React.ReactNode | ChildrenRenderProp;
    onClickOutside?: ClickOutsideHandler;
  } & PositioningProps
>;

const isRenderProp = (
  children: React.ReactNode | ChildrenRenderProp,
): children is ChildrenRenderProp => typeof children === 'function';

export const Popover: React.FC<Props> = (props) => {
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
    position: passedPosition,
    anchorRef,
    equalAnchorWidth,
    ...otherProps
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [anchorClientRect, setAnchorClientRect] = React.useState<DOMRect | undefined>();
  const { width, height } = useComponentSize(ref);
  const anchorSize = useComponentSize(anchorRef || { current: null });
  const previousDirectionRef = React.useRef<Direction | null>(null);
  const { current: previousDirection } = previousDirectionRef;
  const [bannedDirections, setBannedDirections] = React.useState<readonly Direction[]>([]);

  const resetBannedDirections = () => {
    setBannedDirections((state) => (state.length ? [] : state));
    previousDirectionRef.current = null;
  };

  const updateAnchorClientRect = () =>
    setAnchorClientRect(anchorRef?.current?.getBoundingClientRect());

  React.useLayoutEffect(updateAnchorClientRect, [anchorSize]);

  usePopoverReposition({
    isActive: true,
    scrollAnchorRef: anchorRef || { current: null },
    onRequestReposition: () => {
      resetBannedDirections();
      updateAnchorClientRect();
    },
  });

  useClickOutside({
    isActive: !!onClickOutside,
    ignoreClicksInsideRefs: [ref, anchorRef || { current: null }],
    handler: (event) => onClickOutside && onClickOutside(event),
  });

  const { position, direction } = getComputedPositionAndDirection({
    contentSize: { width, height },
    viewportSize: {
      // Размер вьюпорта без скроллбаров
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    },
    offset,
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

  /**
   * Может возникнуть ситуация, когда перерасчет поповера всегда будет выдавать 2 направления
   * и бесконечно зацикливать себя. Для избежания таких кейсов мы запоминаем стороны,
   * которые не подошли, чтобы не возвращаться к ним и предотвратить бесконечный ререндер.
   * См. PopoverBannedPositionsStory
   */
  if (previousDirection !== direction) {
    if (previousDirection && !bannedDirections.includes(previousDirection)) {
      setBannedDirections([...bannedDirections, previousDirection]);
    }
    previousDirectionRef.current = direction;
  }

  // Сбрасываем при любом изменении пропсов, чтобы заново начать перебор направлений
  // Главное не сбрасывать при изменении размеров поповера, т.к. именно оно может вызвать бесконечный перебор
  React.useLayoutEffect(resetBannedDirections, [props]);

  const content = isRenderProp(children) ? children(direction) : children;

  return (
    <PortalWithTheme
      {...otherProps}
      preset={theme}
      container={window.document.body}
      ref={ref}
      style={{
        ...style,
        ...(equalAnchorWidth && { width: anchorSize.width }),
        pointerEvents: isInteractive ? undefined : 'none',
        position: 'absolute',
        top: (position?.y || 0) + window.scrollY,
        left: (position?.x || 0) + window.scrollX,
        visibility: position ? undefined : 'hidden',
      }}
    >
      {content}
    </PortalWithTheme>
  );
};
