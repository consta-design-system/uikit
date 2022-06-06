import { isNotNil } from '../../../utils/type-guards';
import { DragNDropFieldProps } from '../DragNDropField';
import { formatFileSize } from '../formatFileSize';
import { defaultLocale, Locale } from '../locale';

export const formatFileRequirements = (
  accept: DragNDropFieldProps['accept'],
  maxSize: DragNDropFieldProps['maxSize'],
  minSize: DragNDropFieldProps['minSize'],
  locale: Required<Locale> = defaultLocale,
): string | undefined => {
  if (accept?.length) {
    const formattedAccept = Array.isArray(accept) ? accept.join(', ') : accept;
    return [
      `${locale['fit-files']} ${formattedAccept}`,
      minSize ? `${locale.before} ${formatFileSize(minSize, locale)}` : null,
      maxSize ? `${locale.before} ${formatFileSize(maxSize, locale)}` : null,
    ]
      .filter(isNotNil)
      .join(', ');
  }

  if (maxSize) {
    return `${locale.max} ${formatFileSize(maxSize, locale)}`;
  }

  if (minSize) {
    return `${locale.min} ${formatFileSize(minSize, locale)}`;
  }

  return undefined;
};
