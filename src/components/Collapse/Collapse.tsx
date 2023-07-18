import './Collapse.css';

import { IconArrowDown } from '@consta/icons/IconArrowDown';
import React, { useRef } from 'react';

import { useComponentSize } from '##/hooks/useComponentSize';
import { useForkRef } from '##/hooks/useForkRef/useForkRef';
import { cn } from '##/utils/bem';

import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { Text } from '../Text/Text';
import { CollapseIcon } from './CollapseIcon/CollapseIcon';
import {
  CollapseComponent,
  collapsePropCloseDirectionIconDefault,
  collapsePropDirectionIconDefault,
  collapsePropFormDefault,
  collapsePropIconPositionDefault,
  collapsePropIconViewDefault,
  CollapseProps,
  CollapsePropSize,
  collapsePropSizeDefault,
  CollapsePropView,
  collapsePropViewDefault,
} from './types';

export const COMPONENT_NAME = 'Collapse' as const;

export const cnCollapse = cn('Collapse');

export const sizeIconMap: Record<CollapsePropSize, 'xs' | 's'> = {
  '2xs': 'xs',
  'xs': 'xs',
  's': 'xs',
  'm': 's',
  'l': 's',
};

function renderSide(side: React.ReactNode): React.ReactNode {
  const sides = side ? [...(Array.isArray(side) ? side : [side])] : [];

  return sides.map((item, index) => (
    <div className={cnCollapse('Side')} key={index}>
      {item}
    </div>
  ));
}

const getMaxHeight = (height: number, maxHeight?: number | string) => {
  if (maxHeight) {
    return typeof maxHeight === 'string' ? maxHeight : `${maxHeight}px`;
  }
  return `${height}px`;
};

const collapseViewMap: Record<CollapsePropView, 'clear' | 'ghost'> = {
  clear: 'clear',
  ghost: 'ghost',
  primary: 'clear',
  secondary: 'ghost',
};

export const Collapse: CollapseComponent = React.forwardRef<
  HTMLDivElement,
  CollapseProps
>((props, ref) => {
  const collapseRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { height: contentHeight } = useComponentSize(contentRef);

  const {
    label,
    size = collapsePropSizeDefault,
    view: viewProp = collapsePropViewDefault,
    className,
    maxContentHeight,
    isOpen,
    form = collapsePropFormDefault,
    children,
    hoverEffect,
    divider,
    icon = IconArrowDown,
    closeIcon,
    rightSide,
    horizontalSpace,
    iconPosition = collapsePropIconPositionDefault,
    directionIcon = collapsePropDirectionIconDefault,
    closeDirectionIcon = collapsePropCloseDirectionIconDefault,
    style,
    iconView = collapsePropIconViewDefault,
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, props, collapseRef);

  const view = collapseViewMap[viewProp];

  const iconProps = {
    className: cnCollapse('Icon', { position: iconPosition }),
    size: sizeIconMap[size],
    icon,
    closeIcon,
    isOpen,
    direction: directionIcon,
    closeDirection: closeDirectionIcon,
    view: iconView,
  };

  return (
    <div
      ref={useForkRef([ref, collapseRef])}
      className={cnCollapse({ size, view }, [className])}
      style={{
        ...style,
        ['--horizontal-space' as string]: horizontalSpace
          ? `var(--space-${horizontalSpace})`
          : `0px`,
      }}
    >
      <div
        className={cnCollapse('Label', {
          hoverEffect,
          view,
          form,
        })}
        {...otherProps}
      >
        {iconPosition === 'left' && <CollapseIcon {...iconProps} />}
        {typeof label === 'object' ? (
          <div className={cnCollapse('LabelText')}>{label}</div>
        ) : (
          <Text className={cnCollapse('LabelText')} size={size}>
            {label}
          </Text>
        )}
        {renderSide(rightSide)}
        {iconPosition === 'right' && <CollapseIcon {...iconProps} />}
      </div>
      <div
        style={{
          ['--collapse-body-max-height' as string]: getMaxHeight(
            contentHeight,
            maxContentHeight,
          ),
        }}
        className={cnCollapse('Body', { isOpen, divider })}
      >
        <div ref={contentRef} className={cnCollapse('Content')}>
          {children}
        </div>
      </div>
    </div>
  );
});

export * from './types';
