import { libsAtom } from '##/exportAtoms/libs';
import { store } from '##/modules/app';
import { libs } from '@consta/stand/src/stands';

store.dispatch(libsAtom.set(libs));

export { libsAtom };
