const bgColors = [
  {
    color: '--color-bg-default',
    description: 'Базовый (основной) цвет фона',
  },
  {
    color: '--color-bg-secondary',
    description: 'Дополнительный (второстепенный) цвет фона',
  },
  {
    color: '--color-bg-brand',
    description: 'Цвет фона для брендовых блоков',
  },
  {
    color: '--color-bg-link',
    description: 'Цвет фона для ссылочных или CTA блоков',
  },
  {
    color: '--color-bg-ghost',
    description:
      'Полупрозрачный цвет для дополнительного выделения или разделения блоков или секций. Обычно используется поверх основных фонов (default или secondary)',
  },
  {
    color: '--color-bg-stripe',
    description:
      'Цвет для едва заметного разделения, например чтобы разделить строки в таблицах',
  },
  {
    color: '--color-bg-border',
    description: 'Цвет большинства бордеров и тонких разделителей',
  },
  {
    color: '--color-bg-system',
    description:
      'Цвет для фона системных сообщений, состояний, уведомлений, и прочего',
  },
  {
    color: '--color-bg-tone',
    description: 'Тёмный цвет подложки (оверлея) под высплывающими окнами',
  },
  {
    color: '--color-bg-soft',
    description: 'Светлый цвет подложки (оверлея) под высплывающими окнами',
  },
  {
    color: '--color-bg-normal',
    description:
      'Цвет фона для блоков, сообщающих об нормальном (нейтральном) состоянии системы',
  },
  {
    color: '--color-bg-success',
    description:
      'Цвет фона для блоков, сообщающих об успешном действии/статусе',
  },
  {
    color: '--color-bg-caution',
    description:
      'Цвет фона для блоков, сообщающих об осторожном действии/статусе',
  },
  {
    color: '--color-bg-warning',
    description:
      'Цвет фона для блоков, сообщающих об предупреждающем действии/статусе',
  },
  {
    color: '--color-bg-alert',
    description:
      'Цвет фона для блоков, сообщающих об опасном (ошибочном) действии/статусе',
  },
  {
    color: '--color-bg-critical',
    description:
      'Цвет фона для блоков, сообщающих об критичном действии/статусе',
  },
] as const;

const typoColors = [
  {
    color: '--color-typo-primary',
    description: 'Основной текст',
  },
  {
    color: '--color-typo-secondary',
    description: 'Второстепенный текст',
  },
  {
    color: '--color-typo-brand',
    description: 'Брендовый текст',
  },
  {
    color: '--color-typo-ghost',
    description: 'Третьестепенный текст',
  },
  {
    color: '--color-typo-link',
    description: 'Ссылка',
  },
  {
    color: '--color-typo-link-hover',
    description: 'При наведении на ссылку',
  },
  {
    color: '--color-typo-link-minor',
    description: 'Второстепенная ссылка',
  },
  {
    color: '--color-typo-system',
    description: 'Для системных сообщений, состояний, уведомлений',
  },
  {
    color: '--color-typo-normal',
    description:
      'Текст, сообщающий о нормальном (нейтральном) состоянии системы',
  },
  {
    color: '--color-typo-success',
    description: 'Текст об успехе',
  },
  {
    color: '--color-typo-caution',
    description: 'Осторожный текст',
  },
  {
    color: '--color-typo-warning',
    description: 'Предупреждающий текст',
  },
  {
    color: '--color-typo-alert',
    description: 'Текст об ошибке',
  },
  {
    color: '--color-typo-critical',
    description: 'Сообщения критического характера',
  },
] as const;

const scrollbarColors = [
  {
    color: '--color-scroll-bg',
    description: 'Цвет фонового трека',
  },
  {
    color: '--color-scroll-thumb',
    description: 'Цвет ползунка',
  },
  {
    color: '--color-scroll-thumb-hover',
    description: 'Цвет ползунка по наведению',
  },
] as const;

const defaultControls = [
  {
    color: '--color-control-bg-default',
    description: 'Фоновый цвет',
  },
  {
    color: '--color-control-typo-default',
    description: 'Цвет текста',
  },
  {
    color: '--color-control-typo-placeholder',
    description: 'Цвет плейсхолдера',
  },
  {
    color: '--color-control-bg-border-default',
    description: 'Цвет бордеров',
  },
  {
    color: '--color-control-bg-border-default-hover',
    description: 'Цвет бордеров по наведению',
  },
  {
    color: '--color-control-bg-border-focus',
    description: 'Цвет бордеров в состоянии фокуса',
  },
  {
    color: '--color-control-bg-focus',
    description: 'Цвет тени в состонии фокуса',
  },
  {
    color: '--color-control-bg-active',
    description: 'Цвет тени в состонии нажатия',
  },
] as const;

const primaryControls = [
  {
    color: '--color-control-bg-primary',
    description: 'Фоновый цвет',
  },
  {
    color: '--color-control-bg-primary-hover',
    description: 'Фоновый цвет по наведению',
  },
  {
    color: '--color-control-typo-primary',
    description: 'Цвет текста',
  },
  {
    color: '--color-control-typo-primary-hover',
    description: 'Цвет текста по наведению',
  },
] as const;

const secondaryControls = [
  {
    color: '--color-control-bg-secondary',
    description: 'Фоновый цвет',
  },
  {
    color: '--color-control-typo-secondary',
    description: 'Цвет текста',
  },
  {
    color: '--color-control-typo-secondary-hover',
    description: 'Цвет текста по наведению',
  },
  {
    color: '--color-control-bg-border-secondary',
    description: 'Цвет бордеров',
  },
  {
    color: '--color-control-bg-border-secondary-hover',
    description: 'Цвет бордеров по наведению',
  },
] as const;

const ghostControls = [
  {
    color: '--color-control-bg-ghost',
    description: 'Фоновый цвет',
  },
  {
    color: '--color-control-bg-ghost-hover',
    description: 'Фоновый цвет по наведению',
  },
  {
    color: '--color-control-typo-ghost',
    description: 'Цвет текста',
  },
  {
    color: '--color-control-typo-ghost-hover',
    description: 'Цвет текста по наведению',
  },
] as const;

const clearControls = [
  {
    color: '--color-control-bg-clear',
    description: 'Фоновый цвет',
  },
  {
    color: '--color-control-bg-clear-hover',
    description: 'Фоновый цвет по наведению',
  },
  {
    color: '--color-control-typo-clear',
    description: 'Цвет текста',
  },
  {
    color: '--color-control-typo-clear-hover',
    description: 'Цвет текста по наведению',
  },
] as const;

const disableControls = [
  {
    color: '--color-control-bg-disable',
    description: 'Фоновый цвет',
  },
  {
    color: '--color-control-typo-disable',
    description: 'Цвет текста',
  },
  {
    color: '--color-control-bg-border-disable',
    description: 'Цвет бордеров',
  },
] as const;

export {
  bgColors,
  typoColors,
  scrollbarColors,
  defaultControls,
  primaryControls,
  secondaryControls,
  ghostControls,
  clearControls,
  disableControls,
};
