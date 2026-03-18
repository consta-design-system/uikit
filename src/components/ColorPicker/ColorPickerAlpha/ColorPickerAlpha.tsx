import './ColorPickerAlpha.css';

import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { ColorPickerInteractive } from '../ColorPickerInteractive';
import { ColorPickerPoint } from '../ColorPickerPoint';
import { HsvaColor } from '../types';
import { clamp } from '../utils/clamp';
import { hsvaToHslaString } from '../utils/convert';

export const cnColorPickerAlpha = cn('ColorPickerAlpha');
export type ColorPickerAlphaProps = PropsWithHTMLAttributesAndRef<
  {
    hsva: HsvaColor;
    onChange: (value: { a: number }) => void;
  },
  HTMLDivElement
>;

export const ColorPickerAlpha = forwardRef<
  HTMLDivElement,
  ColorPickerAlphaProps
>(({ className, hsva, onChange, style, ...otherProps }, ref) => {
  return (
    <div
      {...otherProps}
      ref={ref}
      className={cnColorPickerAlpha(null, className)}
      style={{
        ...style,
        ['--color-picker-alpha-gradient' as string]: `linear-gradient(90deg, ${hsvaToHslaString(
          {
            ...hsva,
            a: 0,
          },
        )}, ${hsvaToHslaString({ ...hsva, a: 1 })})`,
      }}
    >
      <ColorPickerInteractive
        onMove={(interaction) => {
          onChange({ a: interaction.left });
        }}
        onKey={(offset) => {
          onChange({ a: clamp(hsva.a + offset.left) });
        }}
      >
        <ColorPickerPoint
          style={{
            left: `${hsva.a * 100}%`,
            top: '50%',
          }}
          color="transparent"
        />
      </ColorPickerInteractive>
    </div>
  );
});
