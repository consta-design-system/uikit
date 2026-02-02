import './ColorMarker.css';

import React, { forwardRef } from 'react';

import { cnMixFocus } from '##/mixs/MixFocus';
import { cn } from '##/utils/bem';
import { AsTags } from '##/utils/types/AsTags';
import { PropsWithAsAttributes } from '##/utils/types/PropsWithAsAttributes';

import { ColorModel } from '../types';
import { hsvaToHslaString, hsvaToHslString } from '../utils/convert';

const cnColorMarker = cn('ColorMarker');

export type ColorMarkerProps<
  T,
  As extends AsTags = 'div',
> = PropsWithAsAttributes<
  {
    model: ColorModel<T>;
    value: T | undefined | null;
    active?: boolean;
    size?: 'xs' | 's' | 'm' | 'l';
    as?: As;
    form?: 'default' | 'brick' | 'round';
  },
  As
>;

export type ColorMarkerComponent = <T, As extends AsTags = 'div'>(
  props: ColorMarkerProps<T, As>,
) => React.ReactElement;

const ColorMarkerRender = <T,>(
  {
    model,
    value,
    active,
    size = 'm',
    className,
    style,
    as = 'div',
    form = 'default',
    ...otherProps
  }: ColorMarkerProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const hsva = value ? model.toHsva(value) : undefined;
  const color = hsva ? hsvaToHslString(hsva) : undefined;
  const colorWithAlpha = hsva ? hsvaToHslaString(hsva) : undefined;

  const Tag = as;

  return (
    <Tag
      {...otherProps}
      ref={ref}
      className={cnColorMarker(
        { size, active, form, withoutColor: !value, as },
        [active ? undefined : cnMixFocus(), className],
      )}
      style={{
        ...style,
        ['--color-picker-marker-color' as string]: color,
        ['--color-picker-marker-color-with-alpha' as string]: colorWithAlpha,
      }}
    />
  );
};

export const ColorMarker = forwardRef(
  ColorMarkerRender,
) as ColorMarkerComponent;
