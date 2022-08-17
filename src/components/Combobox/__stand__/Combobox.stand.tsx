import { createStand } from '../../../stand/standConfig';
import image from './Combobox.image.svg';

export default createStand({
  title: 'Combobox',
  id: 'Combobox',
  group: 'components',
  image,
  description:
    'Выпадающий список с поиском. Можно выбрать один или несколько вариантов.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=58%3A16411',
  order: 10,
});
