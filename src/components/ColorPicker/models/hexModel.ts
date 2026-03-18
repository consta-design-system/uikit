import { ColorModel } from '../types';
import { equalHex } from '../utils/compare';
import { hexToHsva, hsvaToHex } from '../utils/convert';

export const hexModel: ColorModel<string> = {
  defaultColor: '#000',
  toHsva: hexToHsva,
  fromHsva: ({ h, s, v }) => hsvaToHex({ h, s, v, a: 1 }),
  equal: equalHex,
};
