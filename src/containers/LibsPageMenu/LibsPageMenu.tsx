import React from 'react';

import { PortalMenu } from '##/containers/PortalMenu';
import { useAtom } from '@reatom/react';

import { libsAtom } from '##/modules/libs';
import { routesNames } from '##/modules/router';

const getItemLabel = (item: { title: string }) => item.title;
const getItemGroupId = (item: { group?: string }) => item.group;
const getItemDescription = () => undefined;
const getItemHref = () => routesNames.LIBS_STAND;
const getItemParams = (item: { id: string }) => ({ stand: item.id });

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
