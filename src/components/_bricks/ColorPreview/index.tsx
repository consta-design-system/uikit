import React from 'react';
import bem from '../../../utils/bem';
import { Text } from '../../Text/Text';

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
          'pt-icon-plus__icon pt-icon-plus__icon_vertical-align_top pt-icon-plus__icon_indent-r_m decorator decorator_indent-b_l'
        )}
        style={!rgba ? { color: `var(${color})` } : { color: `rgba(var(${color}), 0.5)` }}
      ></div>
      <div className="pt-icon-plus__block">
        <Text
          as="h3"
          size="m"
          font="mono"
          view="primary"
          className={b('name', {}, 'decorator decorator_indent-b_xs')}
        >
          {color}
        </Text>
        <Text
          as="p"
          size="s"
          view="primary"
          className={b('description', {}, 'decorator decorator_indent-t_none')}
        >
          {description}
        </Text>
      </div>
    </div>
  );
};

export default ColorPreview;
