import { createStand } from '../../../stand/standConfig';
import Switch from '../../../uiKit/components/ComponentsGridWithData/data/images/SwitchImage';

export default createStand({
  title: 'Switch',
  id: 'Switch',
  group: 'components',
  image: Switch,
  description: 'Переключатель. Два положения — включено и выключено.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=58%3A2269',
  order: 10,
});
