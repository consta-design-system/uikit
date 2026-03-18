import { ColorModel } from '../types';
import { equalHex } from '../utils/compare';
import { hexToHsva, hsvaToHex } from '../utils/convert';

export const hexAlphaModel: ColorModel<string> = {
  defaultColor: '000',
  toHsva: hexToHsva,
  fromHsva: hsvaToHex,
  equal: equalHex,
};
