import { createStand } from '##/stand/standConfig';

import image from './ProgressLine.image.svg';

export default createStand({
  title: 'ProgressLine',
  id: 'ProgressLine',
  group: 'components',
  image,
  description: 'Индикатор загрузки в виде линии. Показывает течение процесса.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=87813%3A160640',
  order: 10,
});
