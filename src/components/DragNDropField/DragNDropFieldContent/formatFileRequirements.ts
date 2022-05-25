import { isNotNil } from '../../../utils/type-guards';
import { DragNDropFieldProps } from '../DragNDropField';
import { formatFileSize } from '../formatFileSize';
import { defaultLocale, Locale } from '../locale';

export const formatFileRequirements = (
  accept: DragNDropFieldProps['accept'],
  maxSize: DragNDropFieldProps['maxSize'],
  locale: Required<Locale> = defaultLocale,
): string | undefined => {
  if (accept?.length) {
    const formattedAccept = Array.isArray(accept) ? accept.join(', ') : accept;
    return [
      `${locale['fit-files']} ${formattedAccept}`,
      maxSize ? `${locale.before} ${formatFileSize(maxSize)}` : null,
    ]
      .filter(isNotNil)
      .join(', ');
  }

  if (maxSize) {
    return `${locale.max} ${formatFileSize(maxSize)}`;
  }

  return undefined;
};
