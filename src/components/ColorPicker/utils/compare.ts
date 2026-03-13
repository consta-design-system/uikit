import { ObjectColor } from '../types';
import { hexToRgba } from './convert';

export const equalColorObjects = (
  first: ObjectColor,
  second: ObjectColor,
): boolean => {
  if (first === second) return true;

  for (const prop in first) {
    if (
      (first as unknown as Record<string, number>)[prop] !==
      (second as unknown as Record<string, number>)[prop]
    )
      return false;
  }

  return true;
};

export const equalColorString = (first: string, second: string): boolean => {
  return first.replace(/\s/g, '') === second.replace(/\s/g, '');
};

export const equalHex = (first: string, second: string): boolean => {
  if (first.toLowerCase() === second.toLowerCase()) return true;

  return equalColorObjects(hexToRgba(first), hexToRgba(second));
};
