import { ColorModel } from '../types';
import { equalColorString } from '../utils/compare';
import { hsvaToRgbaString, rgbaStringToHsva } from '../utils/convert';

export const rgbaStringModel: ColorModel<string> = {
  defaultColor: 'rgba(0, 0, 0, 1)',
  toHsva: rgbaStringToHsva,
  fromHsva: hsvaToRgbaString,
  equal: equalColorString,
};
