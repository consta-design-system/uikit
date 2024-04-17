import { Accept } from 'react-dropzone';

import { isNotNil } from '../../../utils/type-guards';
import {
  DragNDropFieldPropLocale,
  DragNDropFieldProps,
} from '../DragNDropFieldCanary';
import { formatFileSize } from '../formatFileSize';
import { defaultLocale } from '../locale';

const formatAccept = (accept: Accept | undefined): string | undefined => {
  return (
    accept &&
    Object.values(accept)
      .map((values) => values.join(', '))
      .join(', ')
  );
};

const formatSize = (
  prefix: string,
  size: number | undefined,
  locale: Required<DragNDropFieldPropLocale>,
) => (size ? `${prefix} ${formatFileSize(size, locale)}` : undefined);

export const formatFileRequirements = (
  accept: DragNDropFieldProps['accept'],
  maxSize: DragNDropFieldProps['maxSize'],
  minSize: DragNDropFieldProps['minSize'],
  locale: Required<DragNDropFieldPropLocale> = defaultLocale,
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
