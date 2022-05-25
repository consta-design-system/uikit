import { isDefined, isNotNil } from '../../utils/type-guards';

import { formatFileSize } from './formatFileSize';
import { FileSizes } from './types';

type LocaleError = string | ((props: { file: File; sizes: FileSizes }) => string);
type LocaleLabel = string | ((props: { fileText: string }) => string);

export type Locale = {
  'file-invalid-type'?: LocaleError;
  'file-too-large'?: LocaleError;
  'file-too-small'?: LocaleError;
  'too-many-files'?: string;
  'general-error'?: string;
  'fit-files'?: string;
  'file'?: string;
  'files'?: string;
  'before'?: string;
  'gigabyte'?: string;
  'megabyte'?: string;
  'kilobyte'?: string;
  'byte'?: string;
  'max'?: string;
  'call-to-action': LocaleLabel;
};

// { value: 1024 * 1024 * 1024, name: 'Гб' },
// { value: 1024 * 1024, name: 'Мб' },
// { value: 1024, name: 'Кб' },
// { value: 1, name: 'байт' },

export const defaultLocale: Required<Locale> = {
  'file-invalid-type': (props) =>
    ['формат файла не подходит', props.file.type && `(${props.file.type})`]
      .filter(isNotNil)
      .join(' '),
  'file-too-large': (props) =>
    `файл слишком большой (максимум ${formatFileSize(props.sizes.maxSize ?? 0)})`,
  'file-too-small': (props) =>
    `файл слишком маленький (минимум ${formatFileSize(props.sizes.minSize ?? 0)})`,
  'too-many-files': 'Вы перетащили несколько файлов. Выберите один, пожалуйста',
  'general-error': 'не получилось добавить файл',
  'fit-files': 'Подходят файлы',
  'file': 'файл',
  'files': 'файлы',
  'before': 'до',
  'max': 'Максимум',
  'gigabyte': 'Гб',
  'megabyte': 'Мб',
  'kilobyte': 'Кб',
  'byte': 'байт',
  'call-to-action': (props) => `Перетащите ${props.fileText} сюда или загрузите по кнопке`,
};

export const withdefaultLocale = (locale?: Locale): Required<Locale> =>
  isDefined(locale)
    ? {
        ...defaultLocale,
        ...locale,
      }
    : defaultLocale;
