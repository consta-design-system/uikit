import './whitepaper.css';

import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '_', v: '_' });

export const ptIconPlus = cn('pt-icon-plus');
export const theme = cn('theme');
export const text = cn('text');
export const tplGrid = cn('tpl-grid');
export const decorator = cn('decorator');
export const layout = cn('layout');
