import { libsAtom } from '##/exportAtoms/libs';
import { store } from '##/modules/app';
import { libs } from '##/stands';

store.dispatch(libsAtom.set(libs));

export { libsAtom };
