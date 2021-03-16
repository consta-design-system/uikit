import './Collapse.css';

import React from 'react';

import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { IconArrowDown } from '../../icons/IconArrowDown/IconArrowDown';
import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export const collapsePropSize = ['l', 'm', 's', 'xs', '2xs'] as const;
export type CollapsePropSize = typeof collapsePropSize[number];
export const collapsePropSizeDefault: CollapsePropSize = collapsePropSize[0];

export const collapsePropView = ['primary', 'secondary'] as const;
export type CollapsePropView = typeof collapsePropView[number];
export const collapsePropViewDefault: CollapsePropView = collapsePropView[0];

export const collapsePropPadding = [
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
  '3xs',
] as const;
export type CollapsePropPadding = typeof collapsePropPadding[number];
export const collapsePropPaddingDefault: CollapsePropPadding = collapsePropPadding[11];

type Props = PropsWithHTMLAttributesAndRef<
  {
    size?: CollapsePropSize;
    icon?: React.FC<IconProps>;
    view?: CollapsePropView;
    closeIcon?: React.FC<IconProps>;
    withDivider?: boolean;
    label: string;
    children: React.ReactNode;
    horizontalPadding?: CollapsePropPadding;
    withHoverEffect?: boolean;
    isOpen?: boolean;
  } & (
    | {
        iconPosition?: 'left';
        rightSide?: React.ReactNode | React.ReactNode[];
      }
    | {
        iconPosition?: 'right';
        rightSide?: never;
      }
  ),
  HTMLElement
>;

type Collapse = (props: Props) => React.ReactElement | null;

export const cnCollapse = cn('Collapse');

const sizeMap: Record<CollapsePropSize, IconPropSize> = {
  '2xs': 'xs',
  'xs': 'xs',
  's': 'xs',
  'm': 's',
  'l': 's',
};

export const Collapse: Collapse = (props) => {
  const {
    label,
    size = 'm',
    view = 'primary',
    className,
    isOpen,
    children,
    withHoverEffect,
    withDivider,
    icon,
    closeIcon,
    rightSide,
    horizontalPadding = '3xs',
    iconPosition = 'left',
    onClick,
    ...otherProps
  } = props;

  const getIcon = () => {
    const iconSize = getSizeByMap(sizeMap, size);
    if (!closeIcon || !isOpen) {
      const Icon = icon;
      return Icon ? (
        <Icon
          className={cnCollapse('Icon', { isOpen, hasCloseIcon: !!closeIcon })}
          size={iconSize}
        />
      ) : (
        <IconArrowDown
          className={cnCollapse('Icon', { isOpen, hasCloseIcon: !!closeIcon })}
          size={iconSize}
        />
      );
    }
    const CloseIcon = closeIcon;
    return <CloseIcon className={cnCollapse('Icon')} size={iconSize} />;
  };

  return (
    <span
      {...otherProps}
      className={cnCollapse({ size, view, state: !isOpen ? 'collapsed' : 'expanded' }, [className])}
    >
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        className={cnCollapse('Label', {
          withHoverEffect,
          withDivider,
          horizontalPadding,
          iconPositionRight: iconPosition === 'right',
        })}
        role="button"
        onKeyDown={() => onClick}
        onClick={onClick}
      >
        {getIcon()}
        {label}
        {iconPosition === 'left' && <div className={cnCollapse('rightSide')}>{rightSide}</div>}
      </div>
      <div className={cnCollapse('Children')}>{children}</div>
    </span>
  );
};
