import { createStand } from '##/stand/standConfig';

import image from './ChoiceGroup.image.svg';

export default createStand({
  title: 'ChoiceGroup',
  id: 'ChoiceGroup',
  group: 'components',
  image,
  description: 'Группа кнопок. Можно выбрать один или несколько вариантов.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=5156%3A79693',
  order: 10,
});
