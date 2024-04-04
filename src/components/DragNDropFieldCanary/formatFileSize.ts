import { Locale } from './locale';

const getUnits = (locale: Required<Locale>) => {
  return [
    { value: 1024 * 1024 * 1024, name: locale.gigabyte },
    { value: 1024 * 1024, name: locale.megabyte },
    { value: 1024, name: locale.kilobyte },
    { value: 1, name: locale.byte },
  ];
};

const floorToDecimals = (num: number, decimals: number): number =>
  Math.floor(10 ** decimals * num) / 10 ** decimals;

export const formatFileSize = (
  sizeInBytes: number,
  locale: Required<Locale>,
): string | undefined => {
  const units = getUnits(locale);
  for (const step of units) {
    if (sizeInBytes >= step.value) {
      return `${floorToDecimals(sizeInBytes / step.value, 1)} ${step.name}`;
    }
  }
  return undefined;
};
