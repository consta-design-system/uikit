import './ColorPickerHue.css';

import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { ColorPickerInteractive } from '../ColorPickerInteractive';
import { ColorPickerPoint } from '../ColorPickerPoint';
import { clamp } from '../utils/clamp';
import { hsvaToHslString } from '../utils/convert';

export type ColorPickerHueProps = PropsWithHTMLAttributesAndRef<
  {
    className?: string;
    hue: number;
    onChange: (newHue: { h: number }) => void;
  },
  HTMLDivElement
>;

export const cnColorPickerHue = cn('ColorPickerHue');

export const ColorPickerHue = forwardRef<HTMLDivElement, ColorPickerHueProps>(
  ({ className, hue, onChange, ...otherProps }, ref) => {
    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnColorPickerHue(null, className)}
      >
        <ColorPickerInteractive
          onMove={(interaction) => {
            onChange({ h: 360 * interaction.left });
          }}
          onKey={(offset) => {
            onChange({
              h: clamp(hue + offset.left * 360, 0, 360),
            });
          }}
        >
          <ColorPickerPoint
            className={cnColorPickerHue('Pointer')}
            color={hsvaToHslString({ h: hue, s: 100, v: 100, a: 1 })}
            style={{
              left: `${(hue / 360) * 100}%`,
              top: '50%',
            }}
          />
        </ColorPickerInteractive>
      </div>
    );
  },
);
