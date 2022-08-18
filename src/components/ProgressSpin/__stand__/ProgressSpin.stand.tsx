import { createStand } from '##/stand/standConfig';

import image from './ProgressSpin.image.svg';

export default createStand({
  title: 'ProgressSpin',
  id: 'ProgressSpin',
  group: 'components',
  image,
  description:
    'Индикатор. Показывает течение процесса — загрузку, отправку или что-то похожее.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=60000%3A121868',
  order: 10,
});