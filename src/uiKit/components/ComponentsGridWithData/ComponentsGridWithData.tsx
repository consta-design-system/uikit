import React from 'react';

import { ComponentsGrid, ComponentsGridProps } from '../ComponentsGrid/ComponentsGrid';

const data: ComponentsGridProps['data'] = [
  {
    name: 'Attachment',
    description: 'Показывает загрузку файла или уже загруженные файлы.',
    href: '/?path=/story/components-attachment--playground',
  },
  {
    name: 'Avatar',
    description: 'Аватарка. Изображение пользователя.',
    href: '/?path=/story/components-avatar--playground',
  },
  {
    name: 'Badge',
    description: 'Бейджик. Показывает статус процесса.',
    href: '/?path=/story/components-badge--playground',
  },
  {
    name: 'Breadcrumbs',
    description: 'Хлебные крошки. Показывает путь к текущей странице.',
    href: '/?path=/story/components-breadcrumbs--playground',
  },
  {
    name: 'Button',
    description: 'Кнопка. Разные формы, цвета и размеры.',
    href: '/?path=/story/components-button--playground',
  },
  {
    href: '/?path=/story/components-calendar--playground',
    name: 'Calendar',
    description: 'Календарь. Можно выбрать дату или период.',
  },
  {
    href: '/?path=/story/components-checkbox--playground',
    name: 'Checkbox',
    description: 'Чекбокс. Можно сделать выбор и подтвердить.',
  },
  {
    href: '/?path=/story/components-checkboxgroup--playground',
    name: 'CheckboxGroup',
    description: 'Группа чекбоксов. Можно выбрать несколько вариантов. ',
  },
  {
    href: '/?path=/story/components-choicegroup--playground',
    name: 'ChoiceGroup',
    description: 'Группа кнопок. Можно выбрать один или несколько вариантов.',
  },
  {
    href: '/?path=/story/components-collapse--playground',
    name: 'Collapse',
    description: 'Скрытый блок. Раскрывается по нажатию на заголовок.',
  },
  {
    href: '/?path=/story/components-combobox--playground',
    name: 'Combobox',
    description: 'Выпадающий список. Можно выбрать один или несколько вариантов. ',
  },
  {
    href: '/?path=/story/components-contextmenu--playground',
    name: 'ContextMenu',
    description: 'Контекстное меню. Дополнительные действия на странице.',
  },
  {
    href: '/?path=/story/components-file--playground',
    name: 'File',
    description: 'Иконка для файла с раширением.',
  },
  {
    href: '/?path=/story/components-filefield--playground',
    name: 'FileField',
    description: 'Можно выбрать файлы, чтобы загрузить или отправить.',
  },
  {
    href: '/?path=/story/components-Grid--playground',
    name: 'Grid',
    description: 'Модульная сетка. Отвечает за расположение содержимого на странице.',
  },
  {
    href: '/?path=/story/components-header--playground',
    name: 'Header',
    description: 'Шапка проекта из готовых блоков: логотип, меню, кнопки, логин, поиск.',
  },
  {
    href: '/?path=/story/components-icons--playground',
    name: 'Icons',
    description: 'Иконки на любые случаи.',
  },
  {
    href: '/?path=/story/components-informer--playground',
    name: 'Informer',
    description: 'Сообщение для пользователя. Встраивается в содержимое страницы.',
  },
  {
    href: '/?path=/story/components-loader--playground',
    name: 'Loader',
    description: 'Прелоадер. Показывает, что информация загружается.',
  },
  {
    href: '/?path=/story/components-modal--playground',
    name: 'Modal',
    description: 'Всплывающее окно. Показывает контент поверх основного экрана.',
  },
  {
    href: '/?path=/story/components-pagination--playground',
    name: 'Pagination',
    description: 'Пагинация. Можно выбрать страницу.',
  },
  {
    href: '/?path=/story/components-popover--playground',
    name: 'Popover',
    description: 'Поповер. Позиционирование элементов по координатам или якорю.',
  },
  {
    href: '/?path=/story/components-progressspin--playground',
    name: 'ProgressSpin',
    description: 'Показывает течение процесса: загрузку, отправку или что-то похожее.',
  },
  {
    href: '/?path=/story/components-radio--playground',
    name: 'Radio',
    description: 'Радиокнопка. Можно выбрать один вариант.',
  },
  {
    href: '/?path=/story/components-radiogroup--playground',
    name: 'RadioGroup',
    description: 'Группа радиокнопок. Можно выбрать один вариант.',
  },
  {
    href: '/?path=/story/components-responces--playground',
    name: 'Responces',
    description:
      ' Заглушки с сообщениями об ошибках и важных статусах (404, 503, не найдены данные и похожие).',
  },
  {
    href: '/?path=/story/components-select--playground',
    name: 'Select',
    description: 'Выпадающий список. Можно выбрать один вариант.',
  },
  {
    href: '/?path=/story/components-sidebar--playground',
    name: 'Sidebar',
    description: 'Всплывающее окно. Прилипает к краю экрана.',
  },
  {
    href: '/?path=/story/components-snackbbar--playground',
    name: 'SnackbBar',
    description: 'Мгновенные сообщения для пользователя. Перекрывает содержимое.',
  },
  {
    href: '/?path=/story/components-steps--playground',
    name: 'Steps',
    description: ' Вкладки по шагам. Показывает контент в определённой последовательности.',
  },
  {
    href: '/?path=/story/components-switch--playground',
    name: 'Switch',
    description: 'Переключатель. Два положения: включено и выключено.',
  },
  {
    href: '/?path=/story/components-switchgroup--playground',
    name: 'SwitchGroup',
    description: 'Группа переключателей. Можно выбрать несколько вариантов.',
  },
  {
    href: '/?path=/story/components-Tabs--playground',
    name: 'Tabs',
    description: 'Табы. Переключает вкладки на странице.',
  },
  {
    href: '/?path=/story/components-table--playground',
    name: 'Table',
    description: 'Таблица. Выводит данные с фильтрами и сортировкой.',
  },
  {
    href: '/?path=/story/components-tag--playground',
    name: 'Tag',
    description: 'Тег. Объединяет группы объектов: статьи, документы, фотографии.',
  },
  {
    href: '/?path=/story/components-text--playground',
    name: 'Text',
    description: 'Текст — любые текстовые элементы на странице и стили для них. ',
  },
  {
    href: '/?path=/story/components-textfield--playground',
    name: 'TextField',
    description: 'Поле ввода. Одна или несколько строк.',
  },
  {
    href: '/?path=/story/components-theme--playground',
    name: 'Theme',
    description: 'Тема. Набор правил, который определяет, как выглядит проект.',
  },
  {
    href: '/?path=/story/components-themetoggler--playground',
    name: 'ThemeToggler',
    description: 'Переключатель тем.',
  },
  {
    href: '/?path=/story/components-timer--playground',
    name: 'Timer',
    description: 'Таймер. Отсчитывает время до окончания процесса.',
  },
  {
    href: '/?path=/story/components-tooltip--playground',
    name: 'Tooltip',
    description: 'Тултип. Всплывающее окно возле элемента или точки.',
  },
  {
    href: '/?path=/story/components-user--playground',
    name: 'User',
    description: 'Информация о пользователе: аватарка, имя, статус.',
  },
  {
    href: '/?path=/story/components-userselect--playground',
    name: 'UserSelect',
    description: 'Выпадающий список для выбора пользователей.',
  },
];

export const ComponentsGridWithData = () => {
  return <ComponentsGrid data={data} />;
};
