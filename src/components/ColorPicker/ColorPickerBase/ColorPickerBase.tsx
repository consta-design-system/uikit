import React, { forwardRef } from 'react';

import { cnMixSpace } from '##/mixs/MixSpace';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { ColorPickerAlpha } from '../ColorPickerAlpha';
import { ColorPickerHue } from '../ColorPickerHue';
import { ColorPickerSaturation } from '../ColorPickerSaturation';
import { useColorManipulation } from '../hooks/useColorManipulation';
import { ColorModel } from '../types';

export type ColorPickerBaseProps<T> = PropsWithHTMLAttributesAndRef<
  {
    model: ColorModel<T>;
    value: T;
    onChange: (value: T) => void;
    alpha?: boolean;
  },
  HTMLDivElement
>;

export type ColorPickerBaseComponent = <T>(
  props: ColorPickerBaseProps<T>,
) => React.ReactElement;

export const ColorPickerBaseRender = <T,>(
  {
    model,
    value = model.defaultColor,
    onChange,
    alpha,
    ...rest
  }: ColorPickerBaseProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const [hsva, updateHsva] = useColorManipulation<T>(model, value, onChange);

  return (
    <div {...rest} ref={ref}>
      <ColorPickerSaturation
        className={cnMixSpace({ mB: 'l' })}
        hsva={hsva}
        onChange={updateHsva}
      />
      <ColorPickerHue
        hue={hsva.h}
        onChange={updateHsva}
        className={alpha ? cnMixSpace({ mB: 'xs' }) : undefined}
      />
      {alpha && <ColorPickerAlpha hsva={hsva} onChange={updateHsva} />}
    </div>
  );
};

export const ColorPickerBase = forwardRef(
  ColorPickerBaseRender,
) as ColorPickerBaseComponent;
