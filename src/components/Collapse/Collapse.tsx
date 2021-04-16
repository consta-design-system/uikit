import './Collapse.css';

import React from 'react';

import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { IconArrowDown } from '../../icons/IconArrowDown/IconArrowDown';
import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { Text } from '../Text/Text';

import {
  CollapseIcon,
  CollapseIconPropDirection,
  collapseIconPropDirection,
} from './CollapseIcon/CollapseIcon';

export const collapsePropSize = ['m', 'l', 's', 'xs', '2xs'] as const;
export type CollapsePropSize = typeof collapsePropSize[number];
export const collapsePropSizeDefault = collapsePropSize[0];

export const collapsePropView = ['primary', 'secondary'] as const;
export type CollapsePropView = typeof collapsePropView[number];
export const collapsePropViewDefault = collapsePropView[0];

export const collapsePropHorizontalSpace = [
  '3xs',
  '6xl',
  '5xl',
  '4xl',
  '3xl',
  '2xl',
  'xl',
  'l',
  'm',
  's',
  'xs',
  '2xs',
] as const;
export type CollapsePropHorizontalSpace = typeof collapsePropHorizontalSpace[number];

export const collapsePropIconPosition = ['left', 'right'] as const;
export type CollapsePropIconPosition = typeof collapsePropIconPosition[number];
export const collapsePropIconPositionDefault = collapsePropIconPosition[0];

export const collapsePropDirectionIcon = collapseIconPropDirection;
export const collapsePropDirectionIconDefault = collapsePropDirectionIcon[0];
export const collapsePropCloseDirectionIconDefault = collapsePropDirectionIcon[2];

type CollapseProps = PropsWithHTMLAttributesAndRef<
  {
    size?: CollapsePropSize;
    icon?: React.FC<IconProps>;
    view?: CollapsePropView;
    divider?: boolean;
    label: string;
    horizontalSpace?: CollapsePropHorizontalSpace;
    hoverEffect?: boolean;
    isOpen?: boolean;
  } & (
    | {
        closeIcon?: React.FC<IconProps>;
        directionIcon?: never;
        closeDirectionIcon?: never;
      }
    | {
        closeIcon?: never;
        directionIcon?: CollapseIconPropDirection;
        closeDirectionIcon?: CollapseIconPropDirection;
      }
  ) &
    (
      | {
          iconPosition?: 'left';
          rightSide?: React.ReactNode;
        }
      | {
          iconPosition?: 'right';
          rightSide?: never;
        }
    ),
  HTMLDivElement
>;

type Collapse = (props: CollapseProps) => React.ReactElement | null;

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

export const Collapse: Collapse = React.forwardRef<HTMLDivElement, CollapseProps>((props, ref) => {
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
  } = props;

  return (
    <div
      ref={ref}
      className={cnCollapse({ size, view, horizontalSpace }, [className])}
      style={style}
    >
      <div
        className={cnCollapse('Label', {
          hoverEffect,
          divider,
          iconPosition,
        })}
        {...otherProps}
      >
        <CollapseIcon
          className={cnCollapse('Icon', { position: iconPosition })}
          size={getSizeByMap(sizeIconMap, size)}
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
      <div className={cnCollapse('Body', { isOpen })}>
        <div className={cnCollapse('Content')}>{children}</div>
      </div>
    </div>
  );
});
