import { ColorModel, RgbaColor } from '../types';
import { equalColorObjects } from '../utils/compare';
import { hsvaToRgba, rgbaToHsvaRound } from '../utils/convert';

export const rgbaModel: ColorModel<RgbaColor> = {
  defaultColor: { r: 0, g: 0, b: 0, a: 1 },
  toHsva: rgbaToHsvaRound,
  fromHsva: hsvaToRgba,
  equal: equalColorObjects,
};
