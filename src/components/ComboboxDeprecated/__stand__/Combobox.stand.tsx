import { createStand } from '../../../stand/standConfig';
import Combobox from '../../../uiKit/components/ComponentsGridWithData/data/images/ComboboxImage';

export default createStand({
  title: 'Combobox',
  id: 'Combobox',
  group: 'components',
  image: Combobox,
  description: 'Показывает загрузку файла или уже загруженный файл.',
  version: 'v3.18.0',
  status: 'deprecated',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=58%3A16411',
  order: 10,
});
