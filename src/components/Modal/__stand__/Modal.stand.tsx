import { createStand } from '##/stand/standConfig';

export default createStand({
  title: 'Modal',
  id: 'Modal',
  group: 'components',
  description: 'Всплывающее окно. Показывает контент поверх основной страницы.',
  version: '1.10.0',
  status: 'stable',
  sandbox: 'modal-lsp1ut',
  alias: ['окно', 'модальное', 'всплывающее'],
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=6263%3A117289',
  order: 10,
});
