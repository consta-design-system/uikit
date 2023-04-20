import { createStand } from '##/stand/standConfig';

export default createStand({
  title: 'DatePicker',
  id: 'DatePicker',
  group: 'components',
  description: 'Поле, в котором можно выбрать дату или период.',
  version: '3.7.0',
  status: 'stable',
  sandbox: 'datepicker-2q3e43',
  alias: [
    'поле',
    'ввод',
    'календарь',
    'дата',
    'день',
    'месяц',
    'год',
    'время',
    'диапозон',
  ],
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=11302%3A2',
  order: 10,
});
