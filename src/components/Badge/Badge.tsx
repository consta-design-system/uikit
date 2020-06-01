import './Badge.css';

import React from 'react';
import { classnames } from '@bem-react/classnames';
import { cn } from '../../utils/bem';
import * as wp from '../../utils/whitepaper/whitepaper';
import { IIcon } from '../../icons/Icon/Icon';
import { componentIsFunction } from '../../utils/componentIsFunction';
import { useTheme } from '../Theme/Theme';

export type BadgeProps = {
  size?: 's' | 'm' | 'l';
  view?: 'filled' | 'stroked';
  status?: 'success' | 'error' | 'warning' | 'normal' | 'system';
  form?: 'default' | 'round';
  minified?: boolean;
  icon?: React.FC<IIcon>;
  innerRef?: React.Ref<HTMLElement>;
  label?: string;
  className?: string;
  as?: React.ElementType;
};

export type IBadge<T = {}> = BadgeProps &
  (Omit<React.HTMLAttributes<Element>, keyof (BadgeProps & T)> & Omit<T, keyof BadgeProps>);

export const cnBadge = cn('Badge');

// При использовании "as" позаботьтесь об интерфейсе прокинутого компонента.
// При вызове кнопки:
// <Button<T>/>

export function Badge<T>(props: IBadge<T>) {
  const {
    size = 'm',
    view = 'filled',
    status = 'normal',
    form = 'default',
    icon,
    minified,
    className,
    label,
    innerRef,
    as = 'div',
    ...otherProps
  } = props;

  const Component = as;
  const { themeClassNames } = useTheme();

  const _className =
    status != 'system' && view == 'filled'
      ? classnames(className, themeClassNames.color.accent)
      : className;
  const Icon = icon;
  const withIcon = !!icon;

  if (minified) {
    return (
      <Component
        {...otherProps}
        className={cnBadge({ size, status, minified }, [_className])}
        title={label}
        ref={innerRef}
        {...(componentIsFunction(Component) && { innerRef })}
      />
    );
  }

  return (
    <Component
      {...otherProps}
      className={cnBadge({ size, view, status, form, withIcon }, [_className])}
      ref={innerRef}
      {...(componentIsFunction(Component) && { innerRef })}
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
    </Component>
  );
}
