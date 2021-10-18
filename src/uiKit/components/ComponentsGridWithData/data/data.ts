import React from 'react';

import BreadcrumbsImage from './images/BreadcrumbsImage';
import ButtonImage from './images/ButtonImage';
import CardImage from './images/CardImage';
import CheckboxGroupImage from './images/CheckboxGroupImage';
import CheckboxImage from './images/CheckboxImage';
import DateTimeCanaryImage from './images/DateTimeCanaryImage';
import RadioGroupImage from './images/RadioGroupImage';
import { DataItem } from './types';

export const data: DataItem[] = [
  {
    name: 'Attachment',
    url: '/?path=/docs/components-attachment--playground',
    description: 'Показывает загрузку файла или уже загруженные файл.',
  },
  {
    name: 'Avatar',
    url: '/?path=/docs/components-avatar--playground',
    description: 'Аватарка. Изображение пользователя.',
  },
  {
    name: 'Badge',
    url: '/?path=/docs/components-badge--playground',
    description: 'Бейджик. Показывает статус процесса.',
  },
  {
    name: 'Breadcrumbs',
    url: '/?path=/docs/components-breadcrumbs--playground',
    description: 'Хлебные крошки. Показывают путь к текущей странице.',
  },
  {
    name: 'Button',
    url: '/?path=/docs/components-button--playground',
    description: 'Кнопка. Разные формы, цвета и размеры.',
  },
  {
    name: 'Card',
    url: '/?path=/docs/components-card--playground',
    description: 'Карточка. Контейнер для любого контента.',
  },
  {
    name: 'Checkbox',
    url: '/?path=/docs/components-checkbox--playground',
    description: 'Чекбокс. Можно сделать выбор и подтвердить.',
  },
  {
    name: 'CheckboxGroup',
    url: '/?path=/docs/components-checkboxgroup--playground',
    description: 'Группа чекбоксов. Можно выбрать несколько вариантов.',
  },
  {
    name: 'ChoiceGroup',
    url: '/?path=/docs/components-choicegroup--playground',
    description: 'Группа кнопок. Можно выбрать один или несколько вариантов.',
  },
  {
    name: 'Collapse',
    url: '/?path=/docs/components-collapse--playground',
    description: 'Скрытый блок. Раскрывается по нажатию на заголовок.',
  },
  {
    name: 'CollapseGroup',
    url: '/?path=/docs/components-collapsegroup--playground',
    description: 'Группа скрытых блоков. Раскрывается по нажатию на заголовок.',
  },
  {
    name: 'Combobox',
    url: '/?path=/docs/components-combobox--playground',
    description: 'Выпадающий список с поиском. Можно выбрать один или несколько вариантов.',
  },
  {
    name: 'ContextMenu',
    url: '/?path=/docs/components-contextmenu--playground',
    description: 'Контекстное меню. Дополнительные действия на странице.',
  },
  {
    name: 'DatePickerCanary',
    url: '/?path=/docs/components-datepickercanary--playground',
    description: 'Поле, в котором можно выбрать дату или период.',
  },
  {
    name: 'DateTimeCanary',
    url: '/?path=/docs/components-datetimecanary--playground',
    description: 'Календарь. Можно выбрать дату или период.',
  },
  {
    name: 'DragNDropField',
    url: '/?path=/docs/components-dragndropfield--playground',
    description: 'Можно перетащить файлы, чтобы загрузить или отправить.',
  },
  {
    name: 'File',
    url: '/?path=/docs/components-file--playground',
    description: 'Иконка для файла с расширением.',
  },
  {
    name: 'Grid',
    url: '/?path=/docs/components-grid--playground',
    description: 'Модульная сетка. Отвечает за расположение содержимого на странице.',
  },
  {
    name: 'FileField',
    url: '/?path=/docs/components-filefield--playground',
    description: 'Можно выбрать файлы, чтобы загрузить или отправить.',
  },
  {
    name: 'Header',
    url: '/?path=/docs/components-header--playground',
    description: 'Шапка. Блок с меню, поиском и аватаркой.',
  },
  {
    name: 'Informer',
    url: '/?path=/docs/components-informer--playground',
    description: 'Сообщение для пользователя. Встраивается в содержимое страницы.',
  },
  {
    name: 'LayoutCanary',
    url: '/?path=/docs/components-layoutcanary--playground',
    description: 'Лэйаут. Блоки, из которых можно построить каркас страницы.',
  },
  {
    name: 'Loader',
    url: '/?path=/docs/components-loader--playground',
    description: 'Прелоадер. Показывает, что информация загружается.',
  },
  {
    name: 'Modal',
    url: '/?path=/docs/components-modal--playground',
    description: 'Всплывающее окно. Показывает контент поверх основной страницы.',
  },
  {
    name: 'Pagination',
    url: '/?path=/docs/components-pagination--playground',
    description: 'Пагинация. Можно выбрать страницу.',
  },
  {
    name: 'Popover',
    url: '/?path=/docs/components-popover--playground',
    description: 'Поповер. Позиционирование элементов по координатам или якорю.',
  },
  {
    name: 'ProgressSpin',
    url: '/?path=/docs/components-progressspin--playground',
    description: 'Индикатор. Показывает течение процесса',
  },
  {
    name: 'Radio',
    url: '/?path=/docs/components-radio--playground',
    description: 'Радиокнопка. Можно выбрать один вариант.',
  },
  {
    name: 'RadioGroup',
    url: '/?path=/docs/components-radiogroup--playground',
    description: 'Группа радиокнопок. Можно выбрать один вариант.',
  },
  {
    name: 'Responses',
    url: '/?path=/docs/components-responses--playground',
    description:
      'Заглушки с сообщениями об ошибках и важных статусах (404, 503, не найдены данные и похожие).',
  },
  {
    name: 'Select',
    url: '/?path=/docs/components-select--playground',
    description: 'Выпадающий список. Можно выбрать один вариант.',
  },
  {
    name: 'Sidebar',
    url: '/?path=/docs/components-sidebar--playground',
    description: 'Всплывающее окно. Прилипает к краю экрана.',
  },
  {
    name: 'Skeleton',
    url: '/?path=/docs/components-skeleton--playground',
    description:
      'Заглушка для элементов интерфейса. Можно показать на месте элемента, который ещё не загрузился.',
  },
  {
    name: 'SnackBar',
    url: '/?path=/docs/components-snackbar--playground',
    description: 'Мгновенные сообщения для пользователя. Перекрывает содержимое.',
  },
  {
    name: 'Steps',
    url: '/?path=/docs/components-steps--playground',
    description: 'Вкладки по шагам. Показывает контент в определённой последовательности.',
  },
  {
    name: 'Switch',
    url: '/?path=/docs/components-switch--playground',
    description: 'Переключатель. Два положения',
  },
  {
    name: 'SwitchGroup',
    url: '/?path=/docs/components-switchgroup--playground',
    description: 'Группа переключателей. Можно выбрать несколько вариантов.',
  },
  {
    name: 'Table',
    url: '/?path=/docs/components-table--playground',
    description: 'Таблица. Выводит данные с фильтрами и сортировкой.',
  },
  {
    name: 'Tabs',
    url: '/?path=/docs/components-tabs--playground',
    description: 'Табы. Переключает вкладки на странице.',
  },
  {
    name: 'Tag',
    url: '/?path=/docs/components-tag--playground',
    description: 'Тег. Объединяет группы объектов',
  },
  {
    name: 'Text',
    url: '/?path=/docs/components-text--playground',
    description: 'Текст. Любые текстовые элементы на странице и стили для них.',
  },
  {
    name: 'TextField',
    url: '/?path=/docs/components-textfield--playground',
    description: 'Поле ввода. Одна или несколько строк.',
  },
  {
    name: 'Theme',
    url: '/?path=/docs/components-theme--playground',
    description: 'Тема. Набор правил в CSS, который определяет, как выглядит проект.',
  },
  {
    name: 'ThemeToggler',
    url: '/?path=/docs/components-themetoggler--playground',
    description: 'Переключатель тем.',
  },
  {
    name: 'Timer',
    url: '/?path=/docs/components-timer--playground',
    description: 'Таймер. Отсчитывает время до окончания процесса.',
  },
  {
    name: 'Tooltip',
    url: '/?path=/docs/components-tooltip--playground',
    description: 'Тултип. Всплывающее окно возле элемента или точки.',
  },
  {
    name: 'User',
    url: '/?path=/docs/components-user--playground',
    description: 'Выпадающий список для выбора пользователей.',
  },
  {
    name: 'UserSelect',
    url: '/?path=/docs/components-userselect--playground',
    description: 'Информация о пользователе',
  },
];

export const imageMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Breadcrumbs: BreadcrumbsImage,
  Button: ButtonImage,
  Card: CardImage,
  Checkbox: CheckboxImage,
  CheckboxGroup: CheckboxGroupImage,
  DateTimeCanary: DateTimeCanaryImage,
  RadioGroup: RadioGroupImage,
};
