import React from 'react';

import { ComponentsGrid, ComponentsGridProps } from '../ComponentsGrid/ComponentsGrid';

const data: ComponentsGridProps['data'] = [
  {
    name: 'Attach',
    description: 'Показывает загрузку файла или уже загруженные файлы.',
    href: '/?path=/story/components-attach--playground',
  },
  {
    name: 'Avatar',
    description: 'Аватарка. Изображение пользователя',
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
    name: '',
    description: '',
    href: '',
  },
  {
    name: '',
    description: '',
    href: '',
  },
];

// {
/* <div
      className={cnComponentsGrid('Section', [wp.tplGrid({ 'ratio': '1-1-1', 'col-gap': 'full' })])}
    >s
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-calendar--playground">
          Calendar
        </Text>
        <Text size="s">Календарь. Можно выбрать дату или период.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-checkbox--playground">
          Checkbox
        </Text>
        <Text size="s">Чекбокс. Можно сделать выбор и подтвердить.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-checkboxgroup--playground">
          CheckboxGroup
        </Text>
        <Text size="s">Группа чекбоксов. Можно выбрать нескольких вариантов. </Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-choicegroup--playground">
          ChoiceGroup
        </Text>
        <Text size="s">Группа кнопок. Можно выбрать один или несколько вариантов.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-collapse--playground">
          Collapse
        </Text>
        <Text size="s">Скрытый блок. Раскрывается по нажатию на заголовок.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-combobox--playground">
          Combobox
        </Text>
        <Text size="s">Выпадающий список. Можно выбрать один или несколько вариантов. </Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-contextmenu--playground">
          ContextMenu
        </Text>
        <Text size="s">Контекстное меню. Дополнительные действия на странице.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-file--playground">
          File
        </Text>
        <Text size="s">Иконка для файла с раширением.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-filefield--playground">
          FileField
        </Text>
        <Text size="s">Можно выбрать файлы, чтобы загрузить или отправить.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-Grid--playground">
          Grid
        </Text>
        <Text size="s">Модульная сетка. Отвечает за расположение содержимого на странице.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-header--playground">
          Header
        </Text>
        <Text size="s">Шапка проекта из готовых блоков: логотип, меню, кнопки, логин, поиск.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-icons--playground">
          Icons
        </Text>
        <Text size="s">Иконки на любые случаи.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-informer--playground">
          Informer
        </Text>
        <Text size="s">Сообщение для пользователя. Встраивается в содержимое страницы.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-loader--playground">
          Loader
        </Text>
        <Text size="s">Прелоадер. Показывает, что информация загружается.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-modal--playground">
          Modal
        </Text>
        <Text size="s">Всплывающее окно. Показывает контент поверх основного экрана.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-pagination--playground">
          Pagination
        </Text>
        <Text size="s">Пагинация. Можно выбрать страницу.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-popover--playground">
          Popover
        </Text>
        <Text size="s">Поповер. Позиционирование элементов по координатам или якорю.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-progressspin--playground">
          ProgressSpin
        </Text>
        <Text size="s">Показывает течение процесса: загрузку, отправку или что-то похожее.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-radio--playground">
          Radio
        </Text>
        <Text size="s">Радиокнопка. Можно выбрать один вариант.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-radiogroup--playground">
          RadioGroup
        </Text>
        <Text size="s">Группа радиокнопок. Можно выбрать один вариант.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-responces--playground">
          Responces
        </Text>
        <Text size="s">
          Заглушки с сообщениями об ошибках и важных статусах (404, 503, не найдены данные и
          похожие).
        </Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-select--playground">
          Select
        </Text>
        <Text size="s">Выпадающий список. Можно выбрать один вариант.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-sidebar--playground">
          Sidebar
        </Text>
        <Text size="s">Всплывающее окно. Прилипает к краю экрана.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-snackbbar--playground">
          SnackbBar
        </Text>
        <Text size="s">Мгновенные сообщения для пользователя. Перекрывает содержимое.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-steps--playground">
          Steps
        </Text>
        <Text size="s">
          Вкладки по шагам. Показывает контент в определённой последовательности.
        </Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-switch--playground">
          Switch
        </Text>
        <Text size="s">Переключатель. Два положения: включено и выключено.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-switchgroup--playground">
          SwitchGroup
        </Text>
        <Text size="s">Группа переключателей. Можно выбрать несколько вариантов.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-Tabs--playground">
          Tabs
        </Text>
        <Text size="s">Табы. Переключает вкладки на странице.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-table--playground">
          Table
        </Text>
        <Text size="s">Таблица. Выводит данные с фильтрами и сортировкой.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-tag--playground">
          Tag
        </Text>
        <Text size="s">Тег. Объединяет группы объектов: статьи, документы, фотографии.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-text--playground">
          Text
        </Text>
        <Text size="s">Текст — любые текстовые элементы на странице и стили для них. </Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-textfield--playground">
          TextField
        </Text>
        <Text size="s">Поле ввода. Одна или несколько строк.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-theme--playground">
          Theme
        </Text>
        <Text size="s">Тема. Набор правил, который определяет, как выглядит проект.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-themetoggler--playground">
          ThemeToggler
        </Text>
        <Text size="s">Переключатель тем.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-timer--playground">
          Timer
        </Text>
        <Text size="s">Таймер. Отсчитывает время до окончания процесса.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-tooltip--playground">
          Tooltip
        </Text>
        <Text size="s">Тултип. Всплывающее окно возле элемента или точки.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-user--playground">
          User
        </Text>
        <Text size="s">Информация о пользователе: аватарка, имя, статус.</Text>
      </div>
      <div className={cnComponentsGridContainer()}>
        <Text size="l" as="a" view="link" href="?path=/story/components-userselect--playground">
          UserSelect
        </Text>
        <Text size="s">Выпадающий список для выбора пользователей.</Text>
      </div>
    </div> */
// }

export const ComponentsGridWithData = () => {
  return <ComponentsGrid data={data} />;
};
