import { createStand } from '##/stand/standConfig';

export default createStand({
  title: 'Informer',
  id: 'Informer',
  group: 'components',
  description:
    'Сообщение для пользователя. Встраивается в содержимое страницы.',
  version: '1.0.0',
  status: 'stable',
  sandbox: 'informer-hlkt18',
  alias: ['сообщение', 'оповещение', 'информация'],
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=9601%3A151',
  order: 10,
});
