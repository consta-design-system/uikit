import './FieldControlLayout.css';

import React, { forwardRef } from 'react';

import { getElementSize } from '##/hooks/useComponentSize';
import { useFlag } from '##/hooks/useFlag';
import { useRefs } from '##/hooks/useRefs';
import { useResizeObserved } from '##/hooks/useResizeObserved';
import { cn } from '##/utils/bem';

import {
  getBgColor,
  getBorderColor,
  getBorderRadius,
  getBorderStyle,
  getPadding,
  getSlots,
} from './helpers';
import { FieldControlLayoutProps } from './types';

const cnFieldControlLayout = cn('FieldControlLayout');

const renderContentSlot = (node: React.ReactNode, index: number) => (
  <div key={index} className={cnFieldControlLayout('Slot')}>
    {node}
  </div>
);

export const FieldControlLayout = forwardRef<
  HTMLDivElement,
  FieldControlLayoutProps
>((props, ref) => {
  const {
    className,
    size = 'm',
    form = 'default',
    disabled = false,
    view = 'default',
    status,
    leftSide,
    rightSide,
    children,
    style,
    focused,
    ...otherProps
  } = props;
  const leftSlots = getSlots(leftSide);
  const rightSlots = getSlots(rightSide);

  const [hovered, setHovered] = useFlag();

  const slotsRefs = useRefs<HTMLDivElement>(2, [
    !leftSlots.length,
    !rightSlots.length,
  ]);

  const slotSizes = useResizeObserved(slotsRefs, getElementSize);

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cnFieldControlLayout({ disabled }, [className])}
      style={{
        ...style,
        ['--field-control-layout-border-color' as string]: getBorderColor(
          focused,
          hovered,
          status,
          disabled,
        ),
        ['--field-control-layout-height' as string]: `var(--control-height-${size})`,
        ['--field-control-layout-space' as string]: `calc(var(--control-space-${size}) * 0.5)`,
        ['--field-control-layout-text-size' as string]: `var(--control-text-size-${size})`,
        ['--field-control-layout-border-radius' as string]: getBorderRadius(
          form,
          view,
        ),
        ['--field-control-layout-border-style' as string]: getBorderStyle(
          form,
          view,
        ),
        ['--field-control-layout-padding' as string]: getPadding(form, view),
        ['--field-control-layout-bg-color' as string]: getBgColor(
          view,
          disabled,
        ),
        ['--field-control-layout-left-slots-width' as string]: `${slotSizes[0].width}px`,
        ['--field-control-layout-right-slots-width' as string]: `${slotSizes[1].width}px`,
      }}
      onMouseEnter={setHovered.on}
      onMouseLeave={setHovered.off}
    >
      <div className={cnFieldControlLayout('Container')}>
        {!!leftSlots.length && (
          <div
            ref={slotsRefs[0]}
            className={cnFieldControlLayout('Slots', { position: 'left' })}
          >
            {leftSlots.map(renderContentSlot)}
          </div>
        )}
        <div className={cnFieldControlLayout('Сhildren')}>{children}</div>
        {!!rightSlots.length && (
          <div
            ref={slotsRefs[1]}
            className={cnFieldControlLayout('Slots', { position: 'right' })}
          >
            {rightSlots.map(renderContentSlot)}
          </div>
        )}
      </div>
    </div>
  );
});
