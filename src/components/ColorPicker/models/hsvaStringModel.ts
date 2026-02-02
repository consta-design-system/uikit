import { ColorModel } from '../types';
import { equalColorString } from '../utils/compare';
import { hsvaStringToHsvaRound, hsvaToHsvaString } from '../utils/convert';

export const hsvaStringModel: ColorModel<string> = {
  defaultColor: 'hsva(0, 0%, 0%, 1)',
  toHsva: hsvaStringToHsvaRound,
  fromHsva: hsvaToHsvaString,
  equal: equalColorString,
};
