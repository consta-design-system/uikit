import { createStand } from '../../../stand/standConfig';
import image from './ContextMenu.image.svg';

export default createStand({
  title: 'ContextMenu',
  id: 'ContextMenu',
  group: 'components',
  image,
  description: 'Контекстное меню. Дополнительные действия на странице.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=4894%3A74617',
  order: 10,
});
