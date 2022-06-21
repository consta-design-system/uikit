import React, { useMemo } from 'react';

import { LazyDocs } from '##/componets/LazyDocs';
import { StandPageHeader } from './StandPageHeader';
import { StandPageFooter } from './StandPageFooter';
import { StandPageNavigation } from './StandPageNavigation';
import { StandPageFigma } from './StandPageFigma';
import { StandPageSandbox } from './StandPageSandbox';
import { StandPageInformer } from './StandPageInformer';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';
import { useRoute } from 'react-router5';

import { useStand } from './useStand';

import './StandPage.css';

const cnStandPage = cn('StandPage');

const standPathMap = {
  [routesNames.LIBS_LIB_STAND]: '',
  [routesNames.LIBS_LIB_STAND_DESIGN]: '_design',
  [routesNames.LIBS_LIB_STAND_DEV]: '_dev',
};

const getStandPath = (routerName: string, standID: string) => {
  return `${standID}${standPathMap[routerName]}`;
};

export const StandPage: React.FC = () => {
  const stand = useStand();
  const standID = stand?.path;
  const route = useRoute();
  const routeName = route.route.name;

  if (!standID) {
    return null;
  }

  console.log(standID);

  const standPath = getStandPath(routeName, standID);

  const standStatus = stand.stand.status;

  const { deprecated, canary } = useMemo(() => {
    const others = stand.stand.otherVersion;
    return {
      deprecated: others?.find((el) => el.status === 'deprecated'),
      canary: others?.find((el) => el.status === 'canary'),
    };
  }, [standID]);

  return (
    <div key={standID}>
      <StandPageHeader stand={stand.stand} />
      <StandPageInformer
        status={standStatus}
        deprecated={standStatus === 'deprecated' ? stand.stand.version : deprecated?.version}
        canary={canary?.version}
        className={cnStandPage('Informer')}
      />
      <StandPageNavigation className={cnStandPage('Navigation')} />
      {stand.stand.figma && routeName === routesNames.LIBS_LIB_STAND_DESIGN && (
        <StandPageFigma className={cnStandPage('Figma')} link={stand.stand.figma} />
      )}
      {routeName === routesNames.LIBS_LIB_STAND_SANDBOX &&
        (stand.stand.sandbox ? (
          <StandPageSandbox className={cnStandPage('SandBox')} link={stand.stand.sandbox} />
        ) : (
          'раздел в разработке'
        ))}
      {(routeName === routesNames.LIBS_LIB_STAND ||
        routeName === routesNames.LIBS_LIB_STAND_DESIGN ||
        routeName === routesNames.LIBS_LIB_STAND_DEV) && (
        <LazyDocs key={standPath} id={standPath} />
      )}
      <StandPageFooter className={cnStandPage('Footer')} onSPAClick={() => {}} />
    </div>
  );
};
