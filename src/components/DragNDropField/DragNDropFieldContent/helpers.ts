import { isNotNil } from '../../../utils/type-guards';
import { DragNDropFieldProps } from '../DragNDropField';

const UNITS = [
  { value: 1024 * 1024 * 1024, name: 'Гбайт' },
  { value: 1024 * 1024, name: 'Мбайт' },
  { value: 1024, name: 'Кбайт' },
  { value: 1, name: 'байт' },
];

export const formatFileRequirements = (
  accept: DragNDropFieldProps['accept'],
  maxSize: DragNDropFieldProps['maxSize'],
): string | undefined => {
  if (accept?.length) {
    const formattedAccept = Array.isArray(accept) ? accept.join(', ') : accept;
    return [
      `Поддерживаемые форматы: ${formattedAccept}`,
      maxSize ? `до ${formatMaxFileSize(maxSize)}` : null,
    ]
      .filter(isNotNil)
      .join(', ');
  }

  if (maxSize) {
    return `Размер файла до ${formatMaxFileSize(maxSize)}`;
  }

  return undefined;
};

export const formatMaxFileSize = (sizeInBytes: number): string | undefined => {
  for (const step of UNITS) {
    if (sizeInBytes >= step.value) {
      return `${floorToDecimals(sizeInBytes / step.value, 1)} ${step.name}`;
    }
  }
  return undefined;
};

const floorToDecimals = (num: number, decimals: number): number =>
  Math.floor(10 ** decimals * num) / 10 ** decimals;
