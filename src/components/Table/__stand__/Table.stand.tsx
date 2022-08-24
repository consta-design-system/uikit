import { createStand } from '##/stand/standConfig';

import image from './Table.image.svg';

export default createStand({
  title: 'Table',
  id: 'Table',
  group: 'components',
  image,
  description: 'Таблица. Выводит данные с фильтрами и сортировкой.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=94267%3A176225',
  order: 10,
});
