import { createStand } from '##/stand/standConfig';

import image from './Tabs.image.svg';

export default createStand({
  title: 'Tabs',
  id: 'TabsDeprecated',
  group: 'components',
  image,
  description: 'Кнопка. Разные формы, цвета и размеры.',
  version: '4.0.0',
  status: 'deprecated',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=20626%3A3707',
  order: 10,
});
