import { createStand } from '##/stand/standConfig';

export default createStand({
  title: 'Banner',
  id: 'Banner',
  group: 'components',
  description:
    'Компонент, который отображает срочные и важные оповещения в верхней или нижней части страницы',
  version: '5.25.0',
  status: 'stable',
  alias: ['баннер'],
  order: 10,
});
