import { FileError, FileRejection } from 'react-dropzone';

const ERROR_CODES: Record<FileError['code'], string> = {
  'file-invalid-type': 'неправильный формат файла',
  'file-too-large': 'файл слишком большой',
  'file-too-small': 'файл слишком маленький',
  'too-many-files': 'слишком много файлов',
};

const GENERAL_ERROR = 'не удалось добавить файл';

export const getErrorsList = (fileRejections: FileRejection[]): string[] => {
  return fileRejections.flatMap((rejection) =>
    rejection.errors.map(
      (error) => `${rejection.file.name}: ${ERROR_CODES[error.code] ?? GENERAL_ERROR}`,
    ),
  );
};
