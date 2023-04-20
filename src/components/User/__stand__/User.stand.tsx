import { createStand } from '##/stand/standConfig';

export default createStand({
  title: 'User',
  id: 'User',
  group: 'components',
  description:
    'Показывает информацию о человеке: аватарку, имя, должность, статус.',
  version: '1.0.0',
  status: 'stable',
  sandbox: 'user-fqeoxq',
  alias: ['пользователь', 'юзер', 'аватарка', 'картинка', 'изображение'],
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=58%3A39679',
  order: 10,
});
