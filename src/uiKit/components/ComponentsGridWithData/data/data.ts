import React from 'react';

import BreadcrumbsImage from './images/BreadcrumbsImage';
import ButtonImage from './images/ButtonImage';
import CardImage from './images/CardImage';
import CheckboxGroupImage from './images/CheckboxGroupImage';
import CheckboxImage from './images/CheckboxImage';
import DateTimeImage from './images/DateTimeImage';
import RadioGroupImage from './images/RadioGroupImage';
import RadioImage from './images/RadioImage';
import SwitchGroupImage from './images/SwitchGroupImage';
import SwitchImage from './images/SwitchImage';
import UserImage from './images/UserImage';
import { Data } from './types';

export const data: Data = [
  {
    items: [
      {
        name: 'Avatar',
        componentName: 'Avatar',
        url: '/?path=/docs/components-avatar--playground',
        description: 'Аватарка. Изображение пользователя.',
      },
      {
        name: 'Badge',
        componentName: 'Badge',
        url: '/?path=/docs/components-badge--playground',
        description: 'Бейджик. Показывает статус процесса.',
      },
      {
        name: 'Attachment',
        componentName: 'Attachment',
        url: '/?path=/docs/components-attachment--playground',
        description: 'Показывает загрузку файла или уже загруженные файл.',
      },
      {
        name: 'Breadcrumbs',
        componentName: 'Breadcrumbs',
        url: '/?path=/docs/components-breadcrumbs--playground',
        description: 'Хлебные крошки. Показывают путь к текущей странице.',
      },
      {
        name: 'Button',
        componentName: 'Button',
        url: '/?path=/docs/components-button--playground',
        description: 'Кнопка. Разные формы, цвета и размеры.',
      },
      {
        name: 'Card',
        componentName: 'Card',
        url: '/?path=/docs/components-card--playground',
        description: 'Карточка. Контейнер для любого контента.',
      },
      {
        name: 'Checkbox',
        componentName: 'Checkbox',
        url: '/?path=/docs/components-checkbox--playground',
        description: 'Чекбокс. Можно сделать выбор и подтвердить.',
      },
      {
        name: 'CheckboxGroup',
        componentName: 'CheckboxGroup',
        url: '/?path=/docs/components-checkboxgroup--playground',
        description: 'Группа чекбоксов. Можно выбрать несколько вариантов.',
      },
      {
        name: 'ChoiceGroup',
        componentName: 'ChoiceGroup',
        url: '/?path=/docs/components-choicegroup--playground',
        description: 'Группа кнопок. Можно выбрать один или несколько вариантов.',
      },
      {
        name: 'Collapse',
        componentName: 'Collapse',
        url: '/?path=/docs/components-collapse--playground',
        description: 'Скрытый блок. Раскрывается по нажатию на заголовок.',
      },
      {
        name: 'CollapseGroup',
        componentName: 'CollapseGroup',
        url: '/?path=/docs/components-collapsegroup--playground',
        description: 'Группа скрытых блоков. Раскрывается по нажатию на заголовок.',
      },
      {
        name: 'Combobox',
        componentName: 'Combobox',
        url: '/?path=/docs/components-combobox--playground',
        description: 'Выпадающий список с поиском. Можно выбрать один или несколько вариантов.',
      },
      {
        name: 'ContextMenu',
        componentName: 'ContextMenu',
        url: '/?path=/docs/components-contextmenu--playground',
        description: 'Контекстное меню. Дополнительные действия на странице.',
      },
      {
        name: 'DatePicker(Canary)',
        componentName: 'DatePicker',
        url: '/?path=/docs/components-datepicker--playground',
        description: 'Поле, в котором можно выбрать дату или период.',
      },
      {
        name: 'DateTime(Canary)',
        componentName: 'DateTime',
        url: '/?path=/docs/components-datetime--playground',
        description: 'Календарь. Можно выбрать дату или период.',
      },
      {
        name: 'DragNDropField',
        componentName: 'DragNDropField',
        url: '/?path=/docs/components-dragndropfield--playground',
        description: 'Можно перетащить файлы, чтобы загрузить или отправить.',
      },
      {
        name: 'File',
        componentName: 'File',
        url: '/?path=/docs/components-file--playground',
        description: 'Иконка для файла с расширением.',
      },
      {
        name: 'FileField',
        componentName: 'FileField',
        url: '/?path=/docs/components-filefield--playground',
        description: 'Можно выбрать файлы, чтобы загрузить или отправить.',
      },
      {
        name: 'Grid',
        componentName: 'Grid',
        url: '/?path=/docs/components-grid--playground',
        description: 'Модульная сетка. Отвечает за расположение содержимого на странице.',
      },
      {
        name: 'Header',
        componentName: 'Header',
        url: '/?path=/docs/components-header--playground',
        description: 'Шапка. Блок с меню, поиском и аватаркой.',
      },
      {
        name: 'Informer',
        componentName: 'Informer',
        url: '/?path=/docs/components-informer--playground',
        description: 'Сообщение для пользователя. Встраивается в содержимое страницы.',
      },
      {
        name: 'Layout(Canary)',
        componentName: 'Layout',
        url: '/?path=/docs/components-layout--playground',
        description: 'Лэйаут. Блоки, из которых можно построить каркас страницы.',
      },
      {
        name: 'Loader',
        componentName: 'Loader',
        url: '/?path=/docs/components-loader--playground',
        description: 'Прелоадер. Показывает, что информация загружается.',
      },
      {
        name: 'Modal',
        componentName: 'Modal',
        url: '/?path=/docs/components-modal--playground',
        description: 'Всплывающее окно. Показывает контент поверх основной страницы.',
      },
      {
        name: 'Pagination',
        componentName: 'Pagination',
        url: '/?path=/docs/components-pagination--playground',
        description: 'Пагинация. Можно выбрать страницу.',
      },
      {
        name: 'Popover',
        componentName: 'Popover',
        url: '/?path=/docs/components-popover--playground',
        description: 'Поповер. Позиционирование элементов по координатам или якорю.',
      },
      {
        name: 'ProgressSpin',
        componentName: 'ProgressSpin',
        url: '/?path=/docs/components-progressspin--playground',
        description: 'Индикатор. Показывает течение процесса',
      },
      {
        name: 'Radio',
        componentName: 'Radio',
        url: '/?path=/docs/components-radio--playground',
        description: 'Радиокнопка. Можно выбрать один вариант.',
      },
      {
        name: 'RadioGroup',
        componentName: 'RadioGroup',
        url: '/?path=/docs/components-radiogroup--playground',
        description: 'Группа радиокнопок. Можно выбрать один вариант.',
      },
      {
        name: 'Responses',
        componentName: 'Responses',
        url: '/?path=/docs/components-responses--playground',
        description:
          'Заглушки с сообщениями об ошибках и важных статусах (404, 503, не найдены данные и похожие).',
      },
      {
        name: 'Select',
        componentName: 'Select',
        url: '/?path=/docs/components-select--playground',
        description: 'Выпадающий список. Можно выбрать один вариант.',
      },
      {
        name: 'Sidebar',
        componentName: 'Sidebar',
        url: '/?path=/docs/components-sidebar--playground',
        description: 'Всплывающее окно. Прилипает к краю экрана.',
      },
      {
        name: 'Skeleton',
        componentName: 'Skeleton',
        url: '/?path=/docs/components-skeleton--playground',
        description:
          'Заглушка для элементов интерфейса. Можно показать на месте элемента, который ещё не загрузился.',
      },
      {
        name: 'SnackBar',
        componentName: 'SnackBar',
        url: '/?path=/docs/components-snackbar--playground',
        description: 'Мгновенные сообщения для пользователя. Перекрывает содержимое.',
      },
      {
        name: 'Steps',
        componentName: 'Steps',
        url: '/?path=/docs/components-steps--playground',
        description: 'Вкладки по шагам. Показывает контент в определённой последовательности.',
      },
      {
        name: 'Switch',
        componentName: 'Switch',
        url: '/?path=/docs/components-switch--playground',
        description: 'Переключатель. Два положения',
      },
      {
        name: 'SwitchGroup',
        componentName: 'SwitchGroup',
        url: '/?path=/docs/components-switchgroup--playground',
        description: 'Группа переключателей. Можно выбрать несколько вариантов.',
      },
      {
        name: 'Table',
        componentName: 'Table',
        url: '/?path=/docs/components-table--playground',
        description: 'Таблица. Выводит данные с фильтрами и сортировкой.',
      },
      {
        name: 'Tabs',
        componentName: 'Tabs',
        url: '/?path=/docs/components-tabs--playground',
        description: 'Табы. Переключает вкладки на странице.',
      },
      {
        name: 'Tag',
        componentName: 'Tag',
        url: '/?path=/docs/components-tag--playground',
        description: 'Тег. Объединяет группы объектов',
      },
      {
        name: 'Text',
        componentName: 'Text',
        url: '/?path=/docs/components-text--playground',
        description: 'Текст. Любые текстовые элементы на странице и стили для них.',
      },
      {
        name: 'TextField',
        componentName: 'TextField',
        url: '/?path=/docs/components-textfield--playground',
        description: 'Поле ввода. Одна или несколько строк.',
      },
      {
        name: 'Theme',
        componentName: 'Theme',
        url: '/?path=/docs/components-theme--playground',
        description: 'Тема. Набор правил в CSS, который определяет, как выглядит проект.',
      },
      {
        name: 'ThemeToggler',
        componentName: 'ThemeToggler',
        url: '/?path=/docs/components-themetoggler--playground',
        description: 'Переключатель тем.',
      },
      {
        name: 'Timer',
        componentName: 'Timer',
        url: '/?path=/docs/components-timer--playground',
        description: 'Таймер. Отсчитывает время до окончания процесса.',
      },
      {
        name: 'Tooltip',
        componentName: 'Tooltip',
        url: '/?path=/docs/components-tooltip--playground',
        description: 'Тултип. Всплывающее окно возле элемента или точки.',
      },
      {
        name: 'User',
        componentName: 'User',
        url: '/?path=/docs/components-user--playground',
        description: 'Выпадающий список для выбора пользователей.',
      },
      {
        name: 'UserSelect',
        componentName: 'UserSelect',
        url: '/?path=/docs/components-userselect--playground',
        description: 'Информация о пользователе',
      },
    ],
  },
];

export const imageMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Breadcrumbs: BreadcrumbsImage,
  Button: ButtonImage,
  Card: CardImage,
  Checkbox: CheckboxImage,
  CheckboxGroup: CheckboxGroupImage,
  DateTime: DateTimeImage,
  Radio: RadioImage,
  RadioGroup: RadioGroupImage,
  Switch: SwitchImage,
  SwitchGroup: SwitchGroupImage,
  User: UserImage,
};
