import React from 'react';

import { createPrimitiveAtom } from '@reatom/core/primitives';

export const menuMdxAtom = createPrimitiveAtom<React.ReactNode | undefined>(undefined);
