import { standsAtom } from '##/exportAtoms/stands';
import { store } from '##/modules/app';
import { stands } from '##/stands';

store.dispatch(standsAtom.set(stands));

export { standsAtom };
