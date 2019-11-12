import React from 'react';
import bem from '../../../utils/bem';

import './styles.css';

const b = bem('color-preview');

type Props = {
  color: string;
  opacity?: boolean;
  description?: string;
  rgba?: boolean;
  className?: string;
};

const ColorPreview: React.FC<Props> = ({
  color,
  opacity,
  description,
  className,
  rgba,
  ...restProps
}) => {
  return (
    <div {...restProps} className={b({}, 'pt-icon-plus', className || '')}>
      <div
        className={b(
          'circle',
          { opacity },
          'pt-icon-plus__icon pt-icon-plus__icon_vertical-align_top pt-icon-plus__icon_indent-r_m decorator decorator_indent-b_l',
        )}
        style={!rgba ? { color: `var(${color})` } : { color: `rgba(var(${color}), 0.5)` }}
      ></div>
      <div className="pt-icon-plus__block">
        <h3
          className={b(
            'name',
            {},
            'text text_size_m text_view_primary text_font_mono decorator decorator_indent-b_xs',
          )}
        >
          {color}
        </h3>
        <p className={b('description', {}, 'text text_size_s text_view_primary')}>{description}</p>
      </div>
    </div>
  );
};

export default ColorPreview;
