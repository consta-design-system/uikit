import { top } from '@reatom/core';

const concatName = (...name: (string | undefined)[]) =>
  `${name.filter(Boolean).join('.')}`;

export const named =
  (...n1: (string | undefined)[]) =>
  (...n2: (string | undefined)[]) =>
    concatName(...n1, ...n2);

export const generateAtomName = (...name: (string | undefined)[]) =>
  concatName(top().atom.name.replace('context.', ''), concatName(...name));
