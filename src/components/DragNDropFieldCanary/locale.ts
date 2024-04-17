import { isDefined, isNotNil, isString } from '##/utils/type-guards';

import { formatFileSize } from './formatFileSize';
import { DragNDropFieldPropLocale } from './types';

export const defaultLocale: Required<DragNDropFieldPropLocale> = {
  'file-invalid-type': (props) =>
    [
      `${props.file.name}: формат файла не подходит`,
      props.file.type && `(${props.file.type})`,
    ]
      .filter(isNotNil)
      .join(' '),
  'file-too-large': (props) =>
    `${props.file.name}: файл слишком большой ${
      props.sizes &&
      props.sizes.maxSize &&
      `(максимум ${formatFileSize(props.sizes.maxSize, defaultLocale)})`
    }`,
  'file-too-small': (props) =>
    `${props.file.name}: файл слишком маленький ${
      props.sizes &&
      props.sizes.minSize &&
      `(минимум ${formatFileSize(props.sizes.minSize, defaultLocale)})`
    }`,
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
  'drag-active-message': 'Перетащите файлы сюда',
};

export const getText = <PROPS>(
  textOrFn: string | ((props: PROPS) => string),
  props?: PROPS,
) => {
  return isString(textOrFn) ? textOrFn : props && textOrFn(props);
};

export const withDefaultLocale = (
  locale?: DragNDropFieldPropLocale,
): Required<DragNDropFieldPropLocale> =>
  isDefined(locale)
    ? {
        ...defaultLocale,
        ...locale,
      }
    : defaultLocale;
