import { createStand } from '##/stand/standConfig';

export default createStand({
  title: 'ProgressSpin',
  id: 'ProgressSpin',
  group: 'components',
  description:
    'Индикатор. Показывает течение процесса — загрузку, отправку или что-то похожее.',
  version: '1.0.0',
  status: 'stable',
  /* cspell:disable-next-line */
  sandbox: 'progressspin-08liqj',
  alias: ['индикатор', 'загрузка', 'загрузчик', 'спиннер', 'прогресс'],
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=60000%3A121753',
  order: 10,
});
