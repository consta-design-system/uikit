import './Collapse.css';

import React, { useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { IconPropSize } from '../../icons/Icon/Icon';
import { IconArrowDown } from '../../icons/IconArrowDown/IconArrowDown';
import { cn } from '../../utils/bem';
import { getByMap } from '../../utils/getByMap';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { Text } from '../Text/Text';
import { CollapseIcon } from './CollapseIcon/CollapseIcon';
import {
  CollapseComponent,
  collapsePropCloseDirectionIconDefault,
  collapsePropDirectionIconDefault,
  collapsePropIconPositionDefault,
  CollapseProps,
  CollapsePropSize,
  collapsePropSizeDefault,
  collapsePropViewDefault,
} from './types';

export const COMPONENT_NAME = 'Collapse' as const;

export const cnCollapse = cn('Collapse');

export const sizeIconMap: Record<CollapsePropSize, IconPropSize> = {
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

export const Collapse: CollapseComponent = React.forwardRef<
  HTMLDivElement,
  CollapseProps
>((props, ref) => {
  const collapseRef = useRef<HTMLDivElement>(null);

  const {
    label,
    size = collapsePropSizeDefault,
    view = collapsePropViewDefault,
    className,
    isOpen,
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
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, props, collapseRef);

  return (
    <div
      ref={useForkRef([ref, collapseRef])}
      className={cnCollapse({ size, view, horizontalSpace }, [className])}
      style={style}
    >
      <div
        className={cnCollapse('Label', {
          hoverEffect,
          iconPosition,
        })}
        {...otherProps}
      >
        <CollapseIcon
          className={cnCollapse('Icon', { position: iconPosition })}
          size={getByMap(sizeIconMap, size)}
          icon={icon}
          closeIcon={closeIcon}
          isOpen={isOpen}
          direction={directionIcon}
          closeDirection={closeDirectionIcon}
        />
        <Text className={cnCollapse('LabelText')} view={view} size={size}>
          {label}
        </Text>
        {iconPosition === 'left' && renderSide(rightSide)}
      </div>
      <div className={cnCollapse('Body', { isOpen, divider })}>
        <div className={cnCollapse('Content')}>{children}</div>
      </div>
    </div>
  );
});

export * from './types';
