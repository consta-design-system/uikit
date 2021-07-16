const UNITS = [
  { value: 1024 * 1024 * 1024, name: 'Гбайт' },
  { value: 1024 * 1024, name: 'Мбайт' },
  { value: 1024, name: 'Кбайт' },
  { value: 1, name: 'байт' },
];

export const formatFileSize = (sizeInBytes: number): string | undefined => {
  for (const step of UNITS) {
    if (sizeInBytes >= step.value) {
      return `${floorToDecimals(sizeInBytes / step.value, 1)} ${step.name}`;
    }
  }
  return undefined;
};

const floorToDecimals = (num: number, decimals: number): number =>
  Math.floor(10 ** decimals * num) / 10 ** decimals;
