import React, { lazy, Suspense } from 'react';

// import Docs from '@consta/stand/src/lazyDocs/uikit-components-attachment-stable';

import { LazyDocs } from '##/componets/LazyDocs';
import { DocLayout } from '##/componets/DocLayout';
import { LibPageMenu } from '../LibPage/LibPageMenu';

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

  const standID = `${standPath}`;

  // const importPath = `${rootPath}${standPath}${standID}.stand.mdx`;

  // console.log(importPath);
  // console.log(`../../${standPath}${standID}.stand.mdx`);
  // console.log('../../../../../../src/components/Attachment/__stand__/Attachment.stand.mdx');

  // const Docs = lazy(() => import(`../../${standPath}${standID}.stand.mdx`));

  // const Docs = lazy(() => import(`${rootPath}${standPath}${standID}.stand.mdx`));

  // const Docs = lazy(
  //   () => import(`../../../../../../src/components/Attachment/__stand__/Attachment.stand.mdx`),
  // );

  // const Docs = lazy(() => import(`../../lazy/${standID}.tsx`));
  // const Docs = lazy(() => import(`../../lazy/uikit-components-attachment-stable`));

  console.log(stand.path);

  return (
    <DocLayout key={standID} leftSide={<LibPageMenu/>}>
      <LazyDocs id={standID} />
    </DocLayout>
  );
};
