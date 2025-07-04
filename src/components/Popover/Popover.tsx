import './Popover.css';

import React, { forwardRef, useEffect, useLayoutEffect, useMemo } from 'react';

import {
  PortalWithTheme,
  PortalWithThemeConsumer,
} from '##/components/PortalWithTheme';
import { useTheme } from '##/components/Theme/Theme';
import { ClickOutsideHandler } from '##/hooks/useClickOutside';
import { useComponentSize } from '##/hooks/useComponentSize';
import { useForkRef } from '##/hooks/useForkRef';
import { cn } from '##/utils/bem';
import { isRenderProp } from '##/utils/isRenderProp';
import { isNumber, isString } from '##/utils/type-guards';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

import {
  getComputedPositionAndDirection,
  getPointPosition,
  getRenderPosition,
} from './helpers';
import { usePopoverReposition } from './usePopoverReposition';

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

export type PopoverProps = PropsWithJsxAttributes<
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
    viewportRef?: React.RefObject<HTMLElement>;
    container?: Element;
  } & PositioningProps
>;

export type Props = PopoverProps; // удалить при мажоре

const getOffset = (
  ref: React.RefObject<HTMLDivElement>,
  propOffset: PopoverPropOffset,
) => {
  if (isNumber(propOffset)) {
    return propOffset;
  }

  if (isString(propOffset) && ref.current) {
    const cssVar = getComputedStyle(ref.current).getPropertyValue(
      `--space-${propOffset}`,
    );

    if (cssVar && /px$/.test(cssVar)) {
      return Number(cssVar.slice(0, cssVar.length - 2));
    }

    if (cssVar && /rem$/.test(cssVar)) {
      const fontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      const rem = Number(cssVar.slice(0, cssVar.length - 3));

      return fontSize * rem;
    }

    if (cssVar && /em$/.test(cssVar)) {
      const fontSize = parseFloat(getComputedStyle(ref.current).fontSize);
      const em = Number(cssVar.slice(0, cssVar.length - 2));

      return fontSize * em;
    }

    return 0;
  }

  return 0;
};

const cnPopover = cn('Popover');

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (props, componentRef) => {
    const {
      children,
      direction: passedDirection = 'upCenter',
      offset: propOffset = 0,
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
      viewportRef,
      container = window.document.body,
      ...otherProps
    } = props;

    const viewportElement = viewportRef?.current || document.documentElement;

    const ref = React.useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const [anchorClientRect, setAnchorClientRect] = React.useState<
      DOMRect | undefined
    >();
    const { width, height } = useComponentSize(ref);
    const anchorSize = useComponentSize(anchorRef || { current: null });
    const previousDirectionRef = React.useRef<Direction | null>(null);
    const [bannedDirections, setBannedDirections] = React.useState<
      readonly Direction[]
    >([]);

    const resetBannedDirections = () => {
      setBannedDirections((state) => (state.length ? [] : state));
      previousDirectionRef.current = null;
    };

    const updateAnchorClientRect = () =>
      setAnchorClientRect(anchorRef?.current?.getBoundingClientRect());

    const offset = useMemo(
      () => getOffset(ref, propOffset),
      [propOffset, Boolean(ref.current)],
    );

    const { position, direction } = getComputedPositionAndDirection({
      contentSize: { width, height },
      viewportSize: {
        // Размер вьюпорта без скроллбаров
        width: viewportElement.clientWidth,
        height: viewportElement.clientHeight,
      },
      arrowOffset,
      offset,
      direction: passedDirection,
      possibleDirections,
      bannedDirections,
      position: getPointPosition(
        viewportElement,
        anchorClientRect
          ? { x: anchorClientRect.left, y: anchorClientRect.top }
          : passedPosition,
        !!viewportRef?.current,
      ),
      anchorSize,
      spareDirection,
    });

    useEffect(() => onSetDirection?.(direction), [direction]);

    useEffect(updateAnchorClientRect, [anchorSize]);

    usePopoverReposition({
      isActive: true,
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

    useLayoutEffect(() => {
      if (previousDirectionRef.current !== direction) {
        if (
          previousDirectionRef.current &&
          !bannedDirections.includes(previousDirectionRef.current) &&
          !bannedDirections.includes(direction) &&
          direction !== spareDirection
        ) {
          setBannedDirections((state) =>
            previousDirectionRef.current
              ? [...state, previousDirectionRef.current]
              : state,
          );
        }
        previousDirectionRef.current = direction;
      }
    }, [direction]);

    // Сбрасываем при любом изменении пропсов, чтобы заново начать перебор направлений
    // Главное не сбрасывать при изменении размеров поповера, т.к. именно оно может вызвать бесконечный перебор

    useLayoutEffect(resetBannedDirections, [props]);

    const renderPosition = getRenderPosition(
      viewportElement,
      position,
      !!viewportRef?.current,
      width,
      height,
    );

    const notVisible = !renderPosition || !height || !width;

    return (
      <PortalWithTheme
        {...otherProps}
        preset={theme}
        className={cnPopover({ direction, notVisible }, [className])}
        container={container}
        ref={useForkRef([ref, componentRef])}
        style={{
          ...style,
          ...(notVisible
            ? {}
            : {
                ['--popover-left' as string]: `${renderPosition.x}px`,
                ['--popover-top' as string]: `${renderPosition.y}px`,
                [`--popover-width` as string]: equalAnchorWidth
                  ? `${anchorSize.width}px`
                  : undefined,
                [`--popover-pointer-events` as string]: isInteractive
                  ? undefined
                  : 'none',
                [`--popover-visibility` as string]: position
                  ? undefined
                  : 'hidden',
              }),
        }}
      >
        <PortalWithThemeConsumer
          onClickOutside={onClickOutside}
          ignoreClicksInsideRefs={[ref, anchorRef || { current: null }]}
        >
          {isRenderProp(children) ? children(direction) : children}
        </PortalWithThemeConsumer>
      </PortalWithTheme>
    );
  },
);
