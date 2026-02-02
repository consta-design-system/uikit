import './ColorPickerInput.css';

import React from 'react';

import { ColorInputFormat, HsvaColor } from '../types';
import {
  hexToHsva,
  hslaToHsva,
  hsvaToHex,
  hsvaToHsla,
  hsvaToRgba,
  isHex,
  rgbaToHsva,
} from '../utils/convert';
import { round } from '../utils/round';
import { validHex } from '../utils/validate';
import { ColorPickerInputPartPropOnChange } from './types';

export const getCountParts = (format: ColorInputFormat, alpha?: boolean) => {
  let count = 0;
  if (format === 'hex') count = 1;
  else count = 3;

  if (alpha) count++;

  return count;
};

export const maxMap: Record<string, number> = {
  h: 359,
  s: 100,
  v: 100,
  a: 100,
  r: 255,
  g: 255,
  b: 255,
  l: 100,
};
const toHsvaMap: Record<string, (hsva: HsvaColor) => Record<string, number>> = {
  hsv: (hsva: HsvaColor) => hsva,
  rgb: hsvaToRgba,
  hsl: hsvaToHsla,
};

export const getPartName = (format: ColorInputFormat, index: number) => {
  if (format === 'hex' && index === 0) {
    return 'hex';
  }
  if (index === format.length || (format === 'hex' && index === 1)) {
    return 'a';
  }
  return format[index];
};

export const getValue = (
  value: HsvaColor,
  partName: string,
  format: ColorInputFormat,
) => {
  if (partName === 'hex') {
    return hsvaToHex({ ...value, a: 1 }).slice(1);
  }
  if (partName === 'a') {
    return round(value.a * 100).toString();
  }

  return round(toHsvaMap[format](value)[partName]).toString();
};

export const leftSideMap: Record<string, string> = {
  hex: '#',
};

export const rightSideMap: Record<string, string> = {
  a: '%',
};

const fixA = (part: string | null) => {
  if (!part) {
    return 0;
  }
  let value = parseInt(part, 10);
  if (value > 100) {
    value = 100;
  }
  if (value < 0) {
    value = 0;
  }
  return value / 100;
};

const fixH = (part: string | null) => {
  if (!part) {
    return 0;
  }
  let value = parseInt(part, 10);
  if (value > 360) {
    value = 360;
  }
  if (value < 0) {
    value = 0;
  }
  return value;
};

const fixSVL = (part: string | null) => {
  if (!part) {
    return 0;
  }
  let value = parseInt(part, 10);
  if (value > 100) {
    value = 100;
  }
  if (value < 0) {
    value = 0;
  }
  return value;
};

export const fixRGB = (part: string | null) => {
  if (!part) {
    return 0;
  }
  let value = parseInt(part, 10);
  if (value > 255) {
    value = 255;
  }
  if (value < 0) {
    value = 0;
  }
  return value;
};

export const getOnBlur = (
  partName: string,
  format: ColorInputFormat,
  valueRef: React.MutableRefObject<HsvaColor>,
  onChange: ColorPickerInputPartPropOnChange,
  onBlur?: React.FocusEventHandler<HTMLInputElement>,
): React.FocusEventHandler<HTMLInputElement> | undefined => {
  if (format && partName === 'hex') {
    return (e) => {
      onBlur?.(e);
      const value = valueRef.current;
      const partValue = isHex(e.target.value)
        ? e.target.value.slice(1, 7)
        : e.target.value.slice(0, 6);
      const valid = validHex(partValue);

      if (!partValue || (partValue && !valid)) {
        e.target.value = hsvaToHex(valueRef.current).substring(1).slice(0, 6);
      }
      if (partValue && valid) {
        const hsva = hexToHsva(partValue);
        onChange({ ...hsva, a: value.a }, { e });
        e.target.value = hsvaToHex(hsva).substring(1);
      }
    };
  }
  if (partName === 'a') {
    return (e) => {
      onBlur?.(e);
      const value = valueRef.current;
      const partValue = e.target.value;

      if (!partValue) {
        e.target.value = round(value.a * 100).toString();
      } else {
        const a = fixA(partValue);
        onChange({ ...value, a }, { e });
        e.target.value = round(a * 100).toString();
      }
    };
  }
  if (format === 'hsv' && partName === 'h') {
    return (e) => {
      onBlur?.(e);
      const value = valueRef.current;
      const partValue = e.target.value;

      if (!partValue) {
        e.target.value = round(value.h).toString();
      } else {
        onChange({ ...value, [partName]: fixH(partValue) }, { e });
        e.target.value = fixH(partValue).toString();
      }
    };
  }
  if (format === 'hsv' && (partName === 's' || partName === 'v')) {
    return (e) => {
      onBlur?.(e);
      const value = valueRef.current;
      const partValue = e.target.value;

      if (!partValue) {
        e.target.value = round(value[partName]).toString();
      } else {
        onChange({ ...value, [partName]: fixSVL(partValue) }, { e });
        e.target.value = fixSVL(partValue).toString();
      }
    };
  }
  if (
    format === 'rgb' &&
    (partName === 'r' || partName === 'g' || partName === 'b')
  ) {
    return (e) => {
      onBlur?.(e);
      const value = valueRef.current;
      const partValue = e.target.value;

      if (!partValue) {
        e.target.value = round(hsvaToRgba(value)[partName]).toString();
      } else {
        onChange?.(
          {
            ...rgbaToHsva({
              ...hsvaToRgba(value),
              [partName]: fixRGB(partValue),
            }),
          },
          { e },
        );
        e.target.value = fixRGB(partValue).toString();
      }
    };
  }
  if (format === 'hsl' && partName === 'h') {
    return (e) => {
      onBlur?.(e);
      const value = valueRef.current;
      const partValue = e.target.value;

      if (!partValue) {
        e.target.value = round(hsvaToHsla(value)[partName]).toString();
      } else {
        onChange(
          hslaToHsva({
            ...hsvaToHsla(value),
            [partName]: fixH(partValue),
          }),
          { e },
        );
        e.target.value = fixH(partValue).toString();
      }
    };
  }
  if (format === 'hsl' && (partName === 's' || partName === 'l')) {
    return (e) => {
      onBlur?.(e);
      const value = valueRef.current;
      const partValue = e.target.value;

      if (!partValue) {
        e.target.value = round(hsvaToHsla(value)[partName]).toString();
      } else {
        onChange(
          hslaToHsva({
            ...hsvaToHsla(value),
            [partName]: fixSVL(partValue),
          }),
          { e },
        );
        e.target.value = fixSVL(partValue).toString();
      }
    };
  }
  return onBlur;
};
