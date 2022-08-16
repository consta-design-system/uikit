import { createStand } from '##/stand/standConfig';

import image from './Popover.image.svg';

export default createStand({
  title: 'Popover',
  id: 'Popover',
  group: 'components',
  image,
  description: 'Поповер. Позиционирование элементов по координатам или якорю.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  order: 10,
});
