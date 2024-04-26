import { ErrorCode, FileError, FileRejection } from 'react-dropzone';

import { isNotNil, isString } from '##/utils/type-guards';

import { withDefaultLocale } from './locale';
import { DragNDropFieldPropLocale, FileSizes } from './types';

const NO_MESSAGE = 'no-message';

const getErrorMessage = (
  error: FileRejection['errors'][number],
  file: File | undefined,
  locale: DragNDropFieldPropLocale,
  sizes?: FileSizes,
): string => {
  const { code } = error as FileError;

  const message = (Object.values(ErrorCode) as string[]).includes(code)
    ? locale[code as ErrorCode]
    : locale['general-error'];

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
  locale?: DragNDropFieldPropLocale,
  sizes?: FileSizes,
): string[] => {
  const errorsList: string[] = [];
  let tooManyFilesErrorsCount = 0;

  const localeWithDefault = withDefaultLocale(locale);

  for (const rejection of fileRejections) {
    for (const error of rejection.errors) {
      if (error.code === 'too-many-files') {
        tooManyFilesErrorsCount++;
      } else {
        errorsList.push(
          getErrorMessage(error, rejection.file, localeWithDefault, sizes),
        );
      }
    }
  }

  if (tooManyFilesErrorsCount) {
    errorsList.unshift(
      getErrorMessage(
        { code: 'too-many-files', message: '' },
        undefined,
        localeWithDefault,
        sizes,
      ),
    );
  }
  if (isNotNil(errorsList.find((text) => text === NO_MESSAGE))) {
    const list = errorsList.filter((text) => text !== NO_MESSAGE);

    list.unshift(localeWithDefault['general-error']);
    return list;
  }

  return errorsList;
};
