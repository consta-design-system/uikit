import React, { lazy, Suspense, useState, useMemo } from 'react';

// import Docs from '@consta/stand/src/lazyDocs/uikit-components-attachment-stable';

import { LazyDocs } from '##/componets/LazyDocs';
import { DocLayout } from '##/componets/DocLayout';
import { StandPageHeader } from './StandPageHeader';
import { StandPageFooter } from './StandPageFooter';
import { StandPageNavigation } from './StandPageNavigation';
import { StandPageFigma } from './StandPageFigma';
import { StandPageSandbox } from './StandPageSandbox';
import { StandPageInformer } from './StandPageInformer';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';
import { LibPageMenu } from '../LibPage/LibPageMenu';
// import { Stand } from '../../../../../../src/components/Attachment/__stand__/Attachment.stand';
// import { Stand } from '../../../../../../src/components/Attachment/__stand__/Attachment.stand.mdx';

import { useStand } from './useStand';
import { getNavigationList } from './helpers';
import './StandPage.css';
// import {PreparedStand} from '../../../types'

const rootPath = '../../';

const cnStandPage = cn('StandPage');

export const StandPage: React.FC = () => {
  const stand = useStand();
  const path = stand?.path;
  const [standPage, setStandPage] = useState<string>(routesNames.LIBS_LIB_STAND);

  if (!path) {
    return null;
  }

  const standID = `${path}`;

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

  const standPath = useMemo(() => {
    if (standPage === routesNames.LIBS_LIB_STAND) {
      return standID;
    }
    if (standPage === routesNames.LIBS_LIB_STAND_DESIGN) {
      return `${standID}_design`;
    }
    if (standPage === routesNames.LIBS_LIB_STAND_DEV) {
      return `${standID}_dev`;
    }
    if (standPage === routesNames.LIBS_LIB_STAND_SANDBOX) {
      return null;
    }
  }, [standPage]);

  const getContent = () => {
    if (stand.stand.figma && standPage === routesNames.LIBS_LIB_STAND_DESIGN) {
      return <StandPageFigma className={cnStandPage('Figma')} link={stand.stand.figma} />;
    }
    if (stand.stand.sandbox && standPage === routesNames.LIBS_LIB_STAND_SANDBOX) {
      return <StandPageSandbox className={cnStandPage('SandBox')} link={stand.stand.sandbox} />;
    }
    return null;
  };

  const standStatus = stand.stand.status;
  console.log(stand);

  const { deprecated, canary } = useMemo(() => {
    const others = stand.stand.otherVersion;
    return {
      deprecated: others?.filter((el) => el.status === 'deprecated')[0],
      canary: others?.filter((el) => el.status === 'canary')[0],
    };
  }, [stand]);

  return (
    <DocLayout>
      <>
        <StandPageHeader stand={stand.stand} />
        <StandPageInformer
          status={standStatus}
          deprecated={standStatus === 'deprecated' ? stand.stand.version : deprecated?.version}
          canary={canary?.version}
          className={cnStandPage('Informer')}
        />
        <StandPageNavigation
          items={getNavigationList(!!stand.stand.sandbox)}
          className={cnStandPage('Navigation')}
          standId={stand.id}
          libId={stand.lib.id}
          onChange={setStandPage}
        />
        {getContent()}
        {standPath && <LazyDocs id={standPath} />}
        <StandPageFooter className={cnStandPage('Footer')} onSPAClick={() => {}} />
      </>
    </DocLayout>
  );
};
