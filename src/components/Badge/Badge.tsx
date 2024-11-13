import './Badge.css';

import { classnames } from '@bem-react/classnames';
import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { useTheme } from '##/components/Theme';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import { cnBadge } from './cn';
import { guardStatus } from './guardStatus';
import {
  getBgColor,
  getBorderColor,
  getDegreeMixing,
  getHorisontalPadding,
  getMinifiedBorderSize,
  getSize,
  getTextColor,
  getTextSize,
} from './maps';
import {
  badgePropFormDefault,
  BadgeProps,
  badgePropSizeDefault,
  badgePropStatusDefault,
  badgePropViewDefault,
} from './types';

const renderIcon = (Icon: IconComponent | undefined) =>
  Icon ? <Icon size="xs" className={cnBadge('Icon')} /> : null;

export const Badge = forwardRefWithAs<BadgeProps>((props, ref) => {
  const {
    size = badgePropSizeDefault,
    view = badgePropViewDefault,
    status: statusProp = badgePropStatusDefault,
    form = badgePropFormDefault,
    icon,
    iconLeft,
    iconRight: IconRight,
    minified = false,
    label,
    as = 'div',
    title,
    style,
    ...otherProps
  } = props;

  const status = guardStatus(statusProp);
  const Tag = as as string;
  const { themeClassNames } = useTheme();

  const className =
    status !== 'system' && status !== 'disabled' && view === 'filled'
      ? classnames(props.className, themeClassNames.color.accent)
      : props.className;
  const IconLeft = iconLeft ?? icon;
  const counter =
    [icon, iconLeft, IconRight, label].filter(Boolean).length === 1 &&
    (label?.length || 0) <= 1;

  return (
    <Tag
      {...otherProps}
      className={cnBadge(
        {
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
      style={{
        ...style,
        '--badge-bg-color': getBgColor(status),
        '--badge-border-color': getBorderColor(status, view),
        '--badge-horisontal-padding': getHorisontalPadding(
          size,
          form,
          minified,
        ),
        '--badge-minified-border-size': getMinifiedBorderSize(size, minified),
        '--badge-size': getSize(size, minified),
        '--badge-text-color': getTextColor(status, view),
        '--badge-text-size': getTextSize(size),
        '--badge-degree-mixing': getDegreeMixing(status, view),
      }}
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
