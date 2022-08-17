import { createStand } from '##/stand/standConfig';

import image from './Breadcrumbs.image.svg';

export default createStand({
  title: 'Breadcrumbs',
  id: 'Breadcrumbs',
  group: 'components',
  image,
  description: 'Хлебные крошки. Показывают путь к текущей странице.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=7752%3A136131',
  order: 10,
});
