import { ColorModel, RgbColor } from '../types';
import { equalColorObjects } from '../utils/compare';
import { hsvaToRgba, rgbaToHsvaRound, rgbaToRgb } from '../utils/convert';

export const rgbModel: ColorModel<RgbColor> = {
  defaultColor: { r: 0, g: 0, b: 0 },
  toHsva: ({ r, g, b }) => rgbaToHsvaRound({ r, g, b, a: 1 }),
  fromHsva: (hsva) => rgbaToRgb(hsvaToRgba(hsva)),
  equal: equalColorObjects,
};
