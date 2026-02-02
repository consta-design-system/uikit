import { classnames } from '@bem-react/classnames';
import React, { forwardRef } from 'react';

import { cnMixFlex } from '##/mixs/MixFlex';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { ColorMarker } from '../ColorMarker';
import { ColorModel } from '../types';
import { hsvaToHsvaString } from '../utils/convert';

export type ColorPaletteProps<T> = PropsWithHTMLAttributesAndRef<
  {
    model: ColorModel<T>;
    items: T[];
    value?: T;
    onChange?: (value: T, event: React.MouseEvent<HTMLButtonElement>) => void;
    size?: 'xs' | 's' | 'm' | 'l';
    form?: 'default' | 'brick' | 'round';
  },
  HTMLDivElement
>;

export type ColorPaletteComponent = <T>(
  props: ColorPaletteProps<T>,
) => React.ReactElement;

const ColorPaletteRender = <T,>(
  {
    model,
    items,
    value,
    onChange,
    size = 'm',
    form,
    className,
    ...otherProps
  }: ColorPaletteProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  return (
    <div
      {...otherProps}
      className={classnames(
        className,
        cnMixFlex({ flex: 'flex', gap: 'xs', wrap: 'wrap' }),
      )}
      ref={ref}
    >
      {items.map((item) => {
        const itemHsvaString = hsvaToHsvaString(model.toHsva(item));
        const active = value
          ? hsvaToHsvaString(model.toHsva(value)) === itemHsvaString
          : false;

        return (
          <ColorMarker
            as="button"
            key={itemHsvaString}
            model={model}
            value={item}
            active={active}
            onClick={(event) => onChange?.(item, event)}
            size={size}
            form={form}
          />
        );
      })}
    </div>
  );
};

export const ColorPalette = forwardRef(
  ColorPaletteRender,
) as ColorPaletteComponent;
