import React, { useRef } from 'react';

import { Alpha } from './Alpha';
import { useColorManipulation } from './hooks/useColorManipulation';
import { useStyleSheet } from './hooks/useStyleSheet';
import { Hue } from './Hue';
import { Saturation } from './Saturation';
import { AnyColor, ColorModel, ColorPickerBaseProps } from './types';
import { formatClassName } from './utils/format';

interface Props<T extends AnyColor> extends Partial<ColorPickerBaseProps<T>> {
  colorModel: ColorModel<T>;
}

export const AlphaColorPicker = <T extends AnyColor>({
  className,
  colorModel,
  color = colorModel.defaultColor,
  onChange,
  ...rest
}: Props<T>): JSX.Element => {
  const nodeRef = useRef<HTMLDivElement>(null);
  useStyleSheet(nodeRef);

  const [hsva, updateHsva] = useColorManipulation<T>(
    colorModel,
    color,
    onChange,
  );

  const nodeClassName = formatClassName(['react-colorful', className]);

  return (
    <div {...rest} ref={nodeRef} className={nodeClassName}>
      <Saturation hsva={hsva} onChange={updateHsva} />
      <Hue hue={hsva.h} onChange={updateHsva} />
      <Alpha
        hsva={hsva}
        onChange={updateHsva}
        className="react-colorful__last-control"
      />
    </div>
  );
};
