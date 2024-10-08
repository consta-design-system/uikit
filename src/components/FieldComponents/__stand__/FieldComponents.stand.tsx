import { createStand } from '##/stand/standConfig';

export default createStand({
  title: 'FieldComponents',
  id: 'FieldComponents',
  group: 'components',
  description: 'Набор компонентов для создания полей ввода',
  version: '5.10.0',
  status: 'canary',
  alias: [
    'ввод',
    'поле',
    'поля',
    'инпут',
    'input',
    'select',
    'FieldControlLayout',
    'FieldButton',
    'FieldCaption',
    'FieldLabel',
    'FieldClearButton',
    'FieldCounter',
    'FieldToggleVisiblePasswordButton',
    'FieldWrapper',
  ],
  order: 10,
});
