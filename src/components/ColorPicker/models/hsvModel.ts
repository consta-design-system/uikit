import { ColorModel, HsvColor } from '../types';
import { equalColorObjects } from '../utils/compare';
import { hsvaToHsvRound } from '../utils/convert';

export const hsvModel: ColorModel<HsvColor> = {
  defaultColor: { h: 0, s: 0, v: 0 },
  toHsva: ({ h, s, v }) => ({ h, s, v, a: 1 }),
  fromHsva: hsvaToHsvRound,
  equal: equalColorObjects,
};
