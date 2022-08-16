import { createStand } from '##/stand/standConfig';

import image from './Text.image.svg';

export default createStand({
  title: 'Text',
  id: 'Text',
  group: 'components',
  image,
  description: 'Тест. Шрифты, жирность, размеры и цвета',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/file/wNIi9rZl30Uq1IPBJRubsl/Consta-Font-Styles?node-id=12%3A8296',
  order: 10,
});
