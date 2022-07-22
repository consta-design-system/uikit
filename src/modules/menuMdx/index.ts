import React from 'react';

import { createPrimitiveAtom } from '@reatom/core/primitives';

export const menuMdxAtom = createPrimitiveAtom<React.ReactNode | undefined>(undefined);

type AnchordItem = {
  label: string;
  href: string;
};

export const activeItemAtom = createPrimitiveAtom<AnchordItem | undefined>(undefined);
