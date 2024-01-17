import './Badge.css';

import { classnames } from '@bem-react/classnames';
import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { useTheme } from '../Theme/Theme';

export const badgePropSize = ['xs', 's', 'm', 'l'] as const;
export type BadgePropSize = typeof badgePropSize[number];
export const badgePropSizeDefault: BadgePropSize = 'm';

export const badgePropView = ['filled', 'stroked'] as const;
export type BadgePropView = typeof badgePropView[number];
export const badgePropViewDefault: BadgePropView = badgePropView[0];

export const badgePropStatus = [
  'normal',
  'success',
  'error',
  'warning',
  'system',
] as const;
export type BadgePropStatus = typeof badgePropStatus[number];
export const badgePropStatusDefault: BadgePropStatus = badgePropStatus[0];

export const badgePropForm = ['default', 'round'] as const;
export type BadgePropForm = typeof badgePropForm[number];
export const badgePropFormDefault: BadgePropForm = badgePropForm[0];

type Props = {
  size?: BadgePropSize;
  view?: BadgePropView;
  status?: BadgePropStatus;
  form?: BadgePropForm;
  minified?: boolean;
  /**
   * @deprecated since version 4.17.2 iconLeft
   */
  icon?: IconComponent;
  iconLeft?: IconComponent;
  iconRight?: IconComponent;
  label?: string;
  children?: never;
};

export const cnBadge = cn('Badge');

const renderIcon = (Icon: IconComponent | undefined) =>
  Icon ? <Icon size="xs" className={cnBadge('Icon')} /> : null;

export const Badge = forwardRefWithAs<Props>((props, ref) => {
  const {
    size = badgePropSizeDefault,
    view = badgePropViewDefault,
    status = badgePropStatusDefault,
    form = badgePropFormDefault,
    icon,
    iconLeft,
    iconRight: IconRight,
    minified,
    label,
    as = 'div',
    title,
    ...otherProps
  } = props;

  const Tag = as as string;
  const { themeClassNames } = useTheme();

  const className =
    status !== 'system' && view === 'filled'
      ? classnames(props.className, themeClassNames.color.accent)
      : props.className;
  const IconLeft = iconLeft ?? icon;
  const counter =
    [icon, iconLeft, IconRight, label].filter((item) => Boolean(item))
      .length === 1 && (label?.length || 0) <= 1;

  return (
    <Tag
      {...otherProps}
      className={cnBadge(
        {
          size,
          status,
          minified,
          ...(!minified && {
            view,
            form,
            counter,
          }),
        },
        [className],
      )}
      ref={ref}
      title={title || (minified && label)}
    >
      {!minified && (
        <>
          {renderIcon(IconLeft)}
          {label}
          {renderIcon(IconRight)}
        </>
      )}
    </Tag>
  );
});
