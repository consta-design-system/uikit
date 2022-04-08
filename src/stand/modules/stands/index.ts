import { standsAtom } from '@consta/stand';
import { store } from '@@/stand/modules/app';
import { stands } from '@@/stand/stands';

store.dispatch(standsAtom.set(stands));

export { standsAtom };
