import './Badge.css';

import React from 'react';
import { classnames } from '@bem-react/classnames';
import { cn } from '../../utils/bem';
import * as wp from '../../utils/whitepaper/whitepaper';
import { IIcon } from '../Icon';

export type BadgeProps = {
  size?: 's' | 'm' | 'l';
  view?: 'filled' | 'stroked';
  status?: 'success' | 'error' | 'warning' | 'normal' | 'system';
  form?: 'default' | 'round';
  minified?: boolean;
  icon?: React.FC<IIcon>;
  innerRef?: () => void;
  label?: string;
  className?: string;
  as?: React.ElementType;
};

declare type excludeHTMLAttributes =
  | 'size'
  | 'view'
  | 'status'
  | 'form'
  | 'minified'
  | 'icon'
  | 'innerRef'
  | 'label'
  | 'className';

export type IBadge<T> = BadgeProps &
  (Omit<React.HTMLAttributes<Element>, excludeHTMLAttributes> | Omit<T, excludeHTMLAttributes>);

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
    ...customProps
  } = props;

  const Component = as;
  const _className =
    status != 'system' && view == 'filled'
      ? classnames(className, wp.theme({ color: 'gpn-dark' }))
      : classnames(className, wp.theme({ color: 'gpn-default' }));
  const Icon = icon;
  const withIcon = !!icon;

  if (minified) {
    return (
      <Component
        className={cnBadge({ size, status, minified }, [_className])}
        title={label}
        ref={innerRef}
        {...customProps}
      />
    );
  }

  return (
    <Component
      className={cnBadge({ size, view, status, form, withIcon }, [_className])}
      ref={innerRef}
      {...customProps}
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
