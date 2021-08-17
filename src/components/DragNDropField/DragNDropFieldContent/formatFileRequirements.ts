import { isNotNil } from '../../../utils/type-guards';
import { DragNDropFieldProps } from '../DragNDropField';
import { formatFileSize } from '../formatFileSize';

export const formatFileRequirements = (
  accept: DragNDropFieldProps['accept'],
  maxSize: DragNDropFieldProps['maxSize'],
): string | undefined => {
  if (accept?.length) {
    const formattedAccept = Array.isArray(accept) ? accept.join(', ') : accept;
    return [`Подходят файлы ${formattedAccept}`, maxSize ? `до ${formatFileSize(maxSize)}` : null]
      .filter(isNotNil)
      .join(', ');
  }

  if (maxSize) {
    return `Максимум ${formatFileSize(maxSize)}`;
  }

  return undefined;
};
