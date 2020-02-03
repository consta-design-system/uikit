import React from 'react';
import bem from '../../utils/bem';

import './styles.css';
import '../../themes/theme_color_gpn-default.css';
import '../../themes/theme_color_gpn-dark.css';

const b = bem('informer');

type CommonProps = {
  view: 'filled' | 'bordered';
  status: 'system' | 'alert' | 'warning' | 'success';
  withIcon?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

const Informer: React.FC<CommonProps> = props => {
  const { view, status, withIcon, icon, children, className } = props;
  let _className = className;

  if (status != 'system' && view == 'filled') _className += ' theme theme_color_gpn-dark';
  else if (view == 'filled') _className += ' theme theme_color_gpn-default';

  if (withIcon) {
    _className += ' pt-icon-plus';

    return (
      <div
        className={b(
          {
            view,
            status,
            withIcon,
          },
          _className,
        )}
      >
        <div className={b('icon', {}, 'pt-icon-plus__icon pt-icon-plus__icon_indent-r_s')}>
          {icon}
        </div>
        <div className="pt-icon-plus__block">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={b(
        {
          view,
          status,
          withIcon,
        },
        _className,
      )}
    >
      {children}
    </div>
  );
};

export default Informer;
