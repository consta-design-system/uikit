import { isDefined, isNotNil, isString } from '../../utils/type-guards';
import { formatFileSize } from './formatFileSize';
import { FileSizes } from './types';

type LocaleError =
  | string
  | ((props: { file: File; sizes: FileSizes }) => string);
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
  'from'?: string;
  'gigabyte'?: string;
  'megabyte'?: string;
  'kilobyte'?: string;
  'byte'?: string;
  'call-to-action'?: LocaleLabel;
  'action-button'?: LocaleLabel;
};

export const defaultLocale: Required<Locale> = {
  'file-invalid-type': (props) =>
    [
      `${props.file.name}: формат файла не подходит`,
      props.file.type && `(${props.file.type})`,
    ]
      .filter(isNotNil)
      .join(' '),
  'file-too-large': (props) =>
    `${props.file.name}: файл слишком большой (максимум ${formatFileSize(
      props.sizes.maxSize ?? 0,
      defaultLocale,
    )})`,
  'file-too-small': (props) =>
    `${props.file.name}: файл слишком маленький (минимум ${formatFileSize(
      props.sizes.minSize ?? 0,
      defaultLocale,
    )})`,
  'too-many-files': 'Вы перетащили несколько файлов. Выберите один, пожалуйста',
  'general-error': 'не получилось добавить файл',
  'fit-files': 'Подходят файлы',
  'file': 'файл',
  'files': 'файлы',
  'before': 'до',
  'from': 'от',
  'gigabyte': 'Гб',
  'megabyte': 'Мб',
  'kilobyte': 'Кб',
  'byte': 'байт',
  'call-to-action': (props) =>
    `Перетащите ${props.fileText} сюда или загрузите по кнопке`,
  'action-button': (props) => `Выбрать ${props.fileText}`,
};

export const getText = <PROPS>(
  textOrFn: string | ((props: PROPS) => string),
  props: PROPS,
) => {
  return isString(textOrFn) ? textOrFn : textOrFn(props);
};

export const withdefaultLocale = (locale?: Locale): Required<Locale> =>
  isDefined(locale)
    ? {
        ...defaultLocale,
        ...locale,
      }
    : defaultLocale;
