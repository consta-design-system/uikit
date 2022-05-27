import React, { useCallback } from 'react';

import { PortalMenu } from '##/componets/PortalMenu';
import { useAtom } from '@reatom/react';

import { libsAtom } from '##/modules/libs';
import { useRouter } from 'react-router5';
import { routesNames } from '##/modules/router';

const getItemLabel = (item: { title: string }) => item.title;
const getItemGroupId = (item: { group?: string }) => item.group;
const getItemDescription = () => undefined;

export const LibsPageMenu: React.FC = () => {
  const [libs] = useAtom(libsAtom);
  const router = useRouter();

  const getItemOnClick = useCallback(
    (item: { id: string }) => router.navigate(routesNames.LIBS_LIB, { libId: item.id }),
    [],
  );

  return (
    <PortalMenu
      items={libs}
      getItemLabel={getItemLabel}
      getItemGroupId={getItemGroupId}
      getItemOnClick={getItemOnClick}
      getItemDescription={getItemDescription}
      groupsByItems
    />
  );
};
