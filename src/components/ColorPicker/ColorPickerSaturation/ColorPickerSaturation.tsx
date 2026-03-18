import './ColorPickerSaturation.css';

import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { ColorPickerInteractive } from '../ColorPickerInteractive';
import { ColorPickerPoint } from '../ColorPickerPoint';
import { HsvaColor } from '../types';
import { clamp } from '../utils/clamp';
import { hsvaToHslString } from '../utils/convert';

export type ColorPickerProps = PropsWithHTMLAttributesAndRef<
  {
    hsva: HsvaColor;
    onChange: (value: { s: number; v: number }) => void;
  },
  HTMLDivElement
>;

export const cnSaturation = cn('ColorPickerSaturation');

export const ColorPickerSaturation = forwardRef<
  HTMLDivElement,
  ColorPickerProps
>(({ hsva, onChange, style, className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cnSaturation(null, className)}
      style={{
        ...style,
        backgroundColor: hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 }),
      }}
    >
      <ColorPickerInteractive
        onMove={(interaction) => {
          onChange({
            s: interaction.left * 100,
            v: 100 - interaction.top * 100,
          });
        }}
        onKey={(offset) => {
          onChange({
            s: clamp(hsva.s + offset.left * 100, 0, 100),
            v: clamp(hsva.v - offset.top * 100, 0, 100),
          });
        }}
      >
        <ColorPickerPoint
          className={cnSaturation('Pointer')}
          color={hsvaToHslString(hsva)}
          style={{
            top: `${(1 - hsva.v / 100) * 100}%`,
            left: `${hsva.s}%`,
          }}
        />
      </ColorPickerInteractive>
    </div>
  );
});
