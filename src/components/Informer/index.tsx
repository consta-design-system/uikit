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
  children?: React.ReactNode;
  className?: string;
};

const Informer: React.FC<CommonProps> = props => {
  const { view, status, withIcon, children, className } = props;
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
          <svg
            className="icon icon_size_s icon_view_primary icon_name_user"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 14H4V6.09091H2V14ZM15 7.28C15 6.58 14.4273 6 13.7273 6H9.71182L10.3164 2.54636L10.3355 2.34273C10.3355 2.08182 10.2273 1.84 10.0555 1.66818L9.38091 1L5.37 5.74C5.13455 5.96909 5 6.29 5 6.64V12.72C5 13.42 5.57 14 6.27 14H11.8182C12.3464 14 12.7982 13.6782 12.9891 13.22L14.9109 9.01C14.9682 8.86364 15 8.71545 15 8.55V7.33H14.9936L15 7.28Z" />
          </svg>
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
