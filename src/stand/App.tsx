import React from 'react';

import { stands } from '@@/stand/stands';
import { routerAtom } from '@@/stand/modules/router';
import { standsAtom } from '@@/stand/modules/stands';
import { useAtom } from '@reatom/react';

console.log(stands);

export const App: React.FC = () => {
  const [router] = useAtom(routerAtom);
  const [stands] = useAtom(standsAtom);

  console.log(router);
  console.log(stands);
  return <div>133fssdf</div>;
};
