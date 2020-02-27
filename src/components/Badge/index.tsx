import React from 'react';
import bem from '../../utils/bem';

import './styles.css';

const b = bem('badge1');

type BadgeProps = {
  wpSize: 's' | 'm';
  view: 'filled' | 'stroked';
  status: 'success' | 'error' | 'warning' | 'normal' | 'system';
  form?: 'default' | 'round';
  withIcon?: boolean;
  minified?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

const Badge: React.FC<BadgeProps> = props => {
  const {
    wpSize,
    view = 'filled',
    status,
    form = 'default',
    withIcon,
    icon,
    children,
    className,
    minified,
  } = props;
  let _className = className;

  if (status != 'system' && view == 'filled') _className += ' theme theme_color_gpn-dark';
  else _className += ' theme theme_color_gpn-default';

  if (minified) {
    return (
      <div
        className={b(
          {
            size: wpSize,
            view: 'filled',
            status,
            form: 'round',
            'with-icon': false,
            minified,
          },
          _className,
        )}
        title={`${children}`}
      ></div>
    );
  } else if (!minified && withIcon) {
    return (
      <div
        className={b(
          {
            size: wpSize,
            view,
            status,
            form,
            'with-icon': withIcon,
            minified: false,
          },
          _className,
        )}
      >
        <div className="pt-icon-plus pt-icon-plus_vertical-align_center">
          <div className={b('icon', {}, 'pt-icon-plus__icon pt-icon-plus__icon_indent-r_2xs')}>
            {icon}
          </div>
          <span className="pt-icon-plus__block">{children}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={b(
        {
          size: wpSize,
          view,
          status,
          form,
          'with-icon': withIcon,
          minified: false,
        },
        _className,
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
