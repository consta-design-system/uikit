export type RgbColor = {
  r: number;
  g: number;
  b: number;
};

export type RgbaColor = RgbColor & {
  a: number;
};

export type HslColor = {
  h: number;
  s: number;
  l: number;
};

export type HslaColor = HslColor & {
  a: number;
};

export type HsvColor = {
  h: number;
  s: number;
  v: number;
};

export type HsvaColor = HsvColor & {
  a: number;
};

export type ObjectColor =
  | RgbColor
  | HslColor
  | HsvColor
  | RgbaColor
  | HslaColor
  | HsvaColor;

export type AnyColor = string | ObjectColor;

export type ColorInputFormat = 'rgb' | 'hsl' | 'hsv' | 'hex';

export type ColorModel<T> = {
  defaultColor: T;
  toHsva: (color: T) => HsvaColor;
  fromHsva: (hsva: HsvaColor) => T;
  equal: (first: T, second: T) => boolean;
};
