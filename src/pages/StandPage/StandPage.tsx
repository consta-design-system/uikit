import React, { lazy, Suspense } from 'react';

// import { Stand } from '../../../../../../src/components/Attachment/__stand__/Attachment.stand';
// import { Stand } from '../../../../../../src/components/Attachment/__stand__/Attachment.stand.mdx';

import { useStand } from './useStand';
// import {PreparedStand} from '../../../types'

const rootPath = '../../';

export const StandPage: React.FC = () => {
  const stand = useStand();
  const standPath = stand?.path;

  if (!standPath) {
    return null;
  }

  // const docs = lazy(() => import(/* webpackChunkName: "[request]" */ `${rootPath}${standPath}.js`));
  const Docs = lazy(
    () => import(`../../../../../../src/components/Attachment/__stand__/Attachment.stand.mdx`),
  );

  console.log(stand);

  return (
    <div>
      <Suspense>
        <Docs />
      </Suspense>
      StandPage
    </div>
  );
};
