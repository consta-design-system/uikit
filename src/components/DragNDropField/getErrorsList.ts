import { FileRejection } from 'react-dropzone';

import { isNotNil, isString } from '../../utils/type-guards';
import { DragNDropFieldPropLocale, FileError, FileSizes } from './types';

const defaultFileSizes: FileSizes = {
  maxSize: 1024 * 1024 * 1024,
  minSize: 1,
};

const NO_MESSAGE = 'no-message';

const getErrorMessage = (
  error: FileRejection['errors'][number],
  file: File | undefined,
  sizes: FileSizes,
  locale: DragNDropFieldPropLocale,
): string => {
  const { code } = error as FileError;

  const message = locale[code];

  if (!isNotNil(message)) {
    return file ? `${file.name}: ${locale['general-error']}` : NO_MESSAGE;
  }

  if (file) {
    return isString(message) ? message : message({ file, sizes });
  }

  return isString(message) ? message : NO_MESSAGE;
};

export const getErrorsList = (
  fileRejections: FileRejection[],
  sizes: FileSizes | undefined = defaultFileSizes,
  locale: Required<DragNDropFieldPropLocale>,
): string[] => {
  const errorsList: string[] = [];
  let tooManyFilesErrorsCount = 0;

  for (const rejection of fileRejections) {
    for (const error of rejection.errors) {
      if (error.code === 'too-many-files') {
        tooManyFilesErrorsCount++;
      } else {
        errorsList.push(getErrorMessage(error, rejection.file, sizes, locale));
      }
    }
  }

  if (tooManyFilesErrorsCount) {
    errorsList.unshift(
      getErrorMessage(
        { code: 'too-many-files', message: '' },
        undefined,
        sizes,
        locale,
      ),
    );
  }

  if (isNotNil(errorsList.find((text) => text === NO_MESSAGE))) {
    const list = errorsList.filter((text) => text !== NO_MESSAGE);

    list.unshift(locale['general-error']);
    return list;
  }

  return errorsList;
};
