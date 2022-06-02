import { standsAtom } from '##/exportAtoms/stands';
import { store } from '##/modules/app';
import { stands } from '@consta/stand/src/stands';

store.dispatch(standsAtom.set(stands));

export { standsAtom };
