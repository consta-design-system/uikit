import { ColorModel } from '../types';
import { equalColorString } from '../utils/compare';
import { hsvaToHsvString, hsvStringToHsvaRound } from '../utils/convert';

export const hsvStringModel: ColorModel<string> = {
  defaultColor: 'hsv(0, 0%, 0%)',
  toHsva: hsvStringToHsvaRound,
  fromHsva: hsvaToHsvString,
  equal: equalColorString,
};
