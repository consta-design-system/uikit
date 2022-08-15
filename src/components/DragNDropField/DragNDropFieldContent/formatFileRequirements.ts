import { isNotNil } from '../../../utils/type-guards';
import { DragNDropFieldProps } from '../DragNDropField';
import { formatFileSize } from '../formatFileSize';
import { defaultLocale, Locale } from '../locale';

const formatAccept = (
  strs: string[] | string | undefined,
): string | undefined => {
  return Array.isArray(strs) ? strs.join(', ') : strs;
};

const formatSize = (
  prefix: string,
  size: number | undefined,
  locale: Required<Locale>,
) => (size ? `${prefix} ${formatFileSize(size, locale)}` : undefined);

export const formatFileRequirements = (
  accept: DragNDropFieldProps['accept'],
  maxSize: DragNDropFieldProps['maxSize'],
  minSize: DragNDropFieldProps['minSize'],
  locale: Required<Locale> = defaultLocale,
): string => {
  return [
    locale['fit-files'],
    formatAccept(accept),
    formatSize(locale.from, minSize, locale),
    formatSize(locale.before, maxSize, locale),
  ]
    .filter(isNotNil)
    .join(' ');
};
