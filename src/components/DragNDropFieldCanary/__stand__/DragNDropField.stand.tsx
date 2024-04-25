import { createStand } from '##/stand/standConfig';

export default createStand({
  title: 'DragNDropField',
  id: 'DragNDropFieldCanary',
  group: 'components',
  description:
    'Компонент позволяет загружать файлы путем перетаскивания или через диалоговое окно',
  version: '2.1.0',
  status: 'canary',
  sandbox: 'dragndropfield-gst04t',
  alias: ['поле', 'ввод', 'файл', 'файлы', 'загрузка', 'выбор'],
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=9601%3A151',
  order: 10,
});
