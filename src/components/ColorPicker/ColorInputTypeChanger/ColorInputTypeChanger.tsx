import './ColorInputTypeChanger.css';

import React, { forwardRef, useState } from 'react';

import { Select } from '##/components/SelectCanary';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cn } from '##/utils/bem';

import { ColorPickerInput } from '..';
import { ColorInputFormat } from '../types';
import {
  ColorInputTypeChangerComponent,
  ColorInputTypeChangerProps,
} from './types';

const cnColorInputTypeChanger = cn('ColorInputTypeChanger');

const getFormat = (format: string) => format;

const ColorInputTypeChangerRender = <T,>(
  {
    format: formatProp = ['hex', 'hsl', 'hsv', 'rgb'],
    size,
    className,
    ...otherProps
  }: ColorInputTypeChangerProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const formats = typeof formatProp === 'string' ? [formatProp] : formatProp;
  const [format, setFormat] = useState<ColorInputFormat | null>(formats[0]);
  const value = format || formats[0];
  return (
    <div
      className={cnColorInputTypeChanger(null, [
        cnMixFlex({ flex: 'flex', gap: 'xs' }),
        className,
      ])}
    >
      {formats.length > 1 && (
        <Select
          className={cnColorInputTypeChanger('Select')}
          value={value}
          onChange={setFormat}
          items={formats}
          getItemLabel={getFormat}
          getItemKey={getFormat}
          size={size}
        />
      )}
      <ColorPickerInput
        {...otherProps}
        className={cnColorInputTypeChanger('Input')}
        ref={ref}
        format={value}
        size={size}
      />
    </div>
  );
};

export const ColorInputTypeChanger = forwardRef(
  ColorInputTypeChangerRender,
) as ColorInputTypeChangerComponent;
