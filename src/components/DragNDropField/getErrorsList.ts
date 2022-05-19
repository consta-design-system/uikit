import { FileError, FileRejection } from 'react-dropzone';

import { isNotNil } from '../../utils/type-guards';

import { formatFileSize } from './formatFileSize';
import { DragNDropFieldPropErrorMessages } from './types';

type FileSizes = {
  minSize?: number;
  maxSize?: number;
};

const defaultFileSizes: FileSizes = {
  maxSize: 1024 * 1024 * 1024,
  minSize: 1,
};

const ERROR_FORMATTERS: Record<FileError['code'], (file: File, sizes: FileSizes) => string> = {
  'file-invalid-type': ({ type }) =>
    ['формат файла не подходит', type && `(${type})`].filter(isNotNil).join(' '),
  'file-too-large': (file, sizes) =>
    `файл слишком большой (максимум ${formatFileSize(sizes.maxSize ?? 0)})`,
  'file-too-small': (file, sizes) =>
    `файл слишком маленький (минимум ${formatFileSize(sizes.minSize ?? 0)})`,
};

const GENERAL_ERROR = 'не получилось добавить файл';
const TOO_MANY_ERROR = 'Вы перетащили несколько файлов. Выберите один, пожалуйста';

export const getErrorsList = (
  fileRejections: FileRejection[],
  sizes: FileSizes | undefined = defaultFileSizes,
  errorMessages?: DragNDropFieldPropErrorMessages,
): string[] => {
  const errorsList: string[] = [];
  let tooManyFilesErrorsCount = 0;

  for (const rejection of fileRejections) {
    for (const error of rejection.errors) {
      if (error.code === 'too-many-files') {
        tooManyFilesErrorsCount++;
      } else {
        errorsList.push(getErrorMessage(error, rejection.file, sizes, errorMessages));
      }
    }
  }

  if (tooManyFilesErrorsCount) {
    errorsList.unshift(
      getErrorMessage(
        { code: 'too-many-files', message: TOO_MANY_ERROR },
        undefined,
        sizes,
        errorMessages,
      ),
    );
  }

  return errorsList;
};

const getErrorMessage = (
  error: FileRejection['errors'][number],
  file: File | undefined,
  sizes: FileSizes,
  errorMessages?: DragNDropFieldPropErrorMessages,
): string => {
  const { code } = error;
  const message = errorMessages?.[code];
  if (message) {
    return typeof message === 'function' ? message(file, error) : message;
  }
  if (code !== 'too-many-files') {
    if (file) {
      return `${file.name}: ${ERROR_FORMATTERS[error.code]?.(file, sizes) ?? GENERAL_ERROR}`;
    }
    return GENERAL_ERROR;
  }

  return TOO_MANY_ERROR;
};
