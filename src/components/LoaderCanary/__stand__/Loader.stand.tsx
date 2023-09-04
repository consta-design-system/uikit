import { createStand } from '##/stand/standConfig';

export default createStand({
  title: 'Loader',
  id: 'Loader',
  group: 'components',
  description: 'Прелоадер. Показывает, что информация загружается.',
  version: '4.27.0',
  status: 'canary',
  sandbox: 'loader-fiypog',
  alias: ['загрузка', 'загрузщик'],
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=2334%3A37476',
  order: 10,
});
