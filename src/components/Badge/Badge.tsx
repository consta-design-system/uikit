import './Badge.css';

import React from 'react';
import { classnames } from '@bem-react/classnames';

import { IconProps } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { useTheme } from '../Theme/Theme';

export const badgePropSize = ['m', 's', 'l'] as const;
export type BadgePropSize = typeof badgePropSize[number];
export const badgePropSizeDefault: BadgePropSize = badgePropSize[0];

export const badgePropView = ['filled', 'stroked'] as const;
export type BadgePropView = typeof badgePropView[number];
export const badgePropViewDefault: BadgePropView = badgePropView[0];

export const badgePropStatus = ['normal', 'success', 'error', 'warning', 'system'] as const;
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
  icon?: React.FC<IconProps>;
  label?: string;
  children?: never;
};

export const cnBadge = cn('Badge');

export const Badge = forwardRefWithAs<Props>((props, ref) => {
  const {
    size = badgePropSizeDefault,
    view = badgePropViewDefault,
    status = badgePropStatusDefault,
    form = badgePropFormDefault,
    icon,
    minified,
    label,
    as = 'div',
    ...otherProps
  } = props;

  const Tag = as as string;
  const { themeClassNames } = useTheme();

  const className =
    status !== 'system' && view === 'filled'
      ? classnames(props.className, themeClassNames.color.accent)
      : props.className;
  const Icon = icon;
  const withIcon = !!icon;

  if (minified) {
    return (
      <Tag
        {...otherProps}
        className={cnBadge({ size, status, minified }, [className])}
        title={label}
        ref={ref}
      />
    );
  }

  return (
    <Tag
      {...otherProps}
      className={cnBadge({ size, view, status, form, withIcon }, [className])}
      ref={ref}
    >
      {Icon ? (
        <>
          <Icon size="xs" className={cnBadge('Icon')} />
          {label}
        </>
      ) : (
        label
      )}
    </Tag>
  );
});
