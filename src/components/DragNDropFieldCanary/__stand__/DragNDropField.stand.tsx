import { createStand } from '##/stand/standConfig';

export default createStand({
  title: 'DragNDropField',
  id: 'DragNDropFieldCanary',
  group: 'components',
  description:
    'Компонент позволяет загружать файлы путем перетаскивания или через диалоговое окно',
  version: '5.3.0',
  status: 'canary',
  alias: ['поле', 'ввод', 'файл', 'файлы', 'загрузка', 'выбор'],
  figma:
    'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?type=design&node-id=32774-0&mode=design',
  order: 10,
});
