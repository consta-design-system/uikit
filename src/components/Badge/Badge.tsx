import './Badge.css';

import React from 'react';
import { classnames } from '@bem-react/classnames';

import { IconProps } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { ComponentWithAs, forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import * as wp from '../../utils/whitepaper/whitepaper';
import { useTheme } from '../Theme/Theme';

type Props = {
  size?: 's' | 'm' | 'l';
  view?: 'filled' | 'stroked';
  status?: 'success' | 'error' | 'warning' | 'normal' | 'system';
  form?: 'default' | 'round';
  minified?: boolean;
  icon?: React.FC<IconProps>;
  label?: string;
};

export const cnBadge = cn('Badge');

export const Badge: ComponentWithAs<Props> = forwardRefWithAs<Props>((props, ref) => {
  const {
    size = 'm',
    view = 'filled',
    status = 'normal',
    form = 'default',
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
        <div className={wp.ptIconPlus({ 'vertical-align': 'center' })}>
          <div className={cnBadge('Icon', [wp.ptIconPlus('icon', { 'indent-r': '2xs' })])}>
            <Icon size="xs" />
          </div>
          <span className={wp.ptIconPlus('block')}>{label}</span>
        </div>
      ) : (
        label
      )}
    </Tag>
  );
});
