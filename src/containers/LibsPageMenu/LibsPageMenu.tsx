import React from 'react';

import { PortalMenu } from '##/componets/PortalMenu';
import { useAtom } from '@reatom/react';

import { libsAtom } from '##/modules/libs';
import { routesNames } from '##/modules/router';

const getItemLabel = (item: { title: string }) => item.title;
const getItemGroupId = (item: { group?: string }) => item.group;
const getItemDescription = () => undefined;
const getItemHref = () => {
  return routesNames.LIBS_LIB;
};
const getItemParams = (item: { id: string }) => ({ libId: item.id });

export const LibsPageMenu: React.FC = () => {
  const [libs] = useAtom(libsAtom);

  return (
    <PortalMenu
      items={libs}
      getItemLabel={getItemLabel}
      getItemGroupId={getItemGroupId}
      getItemDescription={getItemDescription}
      getItemHref={getItemHref}
      getItemParams={getItemParams}
      groupsByItems
    />
  );
};
