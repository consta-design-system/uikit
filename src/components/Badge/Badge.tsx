import './Badge.css';

import React from 'react';
import { classnames } from '@bem-react/classnames';
import { cn } from '../../utils/bem';
import * as wp from '../../utils/whitepaper/whitepaper';
import { IconProps } from '../Icon';

export const cnBadge = cn('badge1');

export type BadgeProps = {
  size: 's' | 'm';
  view: 'filled' | 'stroked';
  status: 'success' | 'error' | 'warning' | 'normal' | 'system';
  form: 'default' | 'round';
  minified?: boolean;
  icon?: React.FC<IconProps>;
  innerRef?: () => void;
  label?: string;
  className?: string;
};

export const Badge: React.FC<BadgeProps> = (props) => {
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
  } = props;

  const _className =
    status != 'system' && view == 'filled'
      ? classnames(className, wp.theme({ color: 'gpn-dark' }))
      : classnames(className, wp.theme({ color: 'gpn-default' }));
  const Icon = icon;
  const withIcon = !!icon;

  if (minified) {
    return (
      <div
        className={cnBadge({ size, status, minified }, [_className])}
        title={label}
        ref={innerRef}
      />
    );
  }

  return (
    <div className={cnBadge({ size, view, status, form, withIcon }, [_className])} ref={innerRef}>
      {Icon ? (
        <div className={wp.ptIconPlus({ 'vertical-align': 'center' })}>
          <div className={cnBadge('icon', [wp.ptIconPlus('icon', { 'indent-r': '2xs' })])}>
            <Icon size="xs" />
          </div>
          <span className={wp.ptIconPlus('block')}>{label}</span>
        </div>
      ) : (
        label
      )}
    </div>
  );
};
