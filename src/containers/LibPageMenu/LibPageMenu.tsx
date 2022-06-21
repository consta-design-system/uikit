import React, { useCallback, useState } from 'react';

import { PortalMenu } from '##/componets/PortalMenu';
import { useAtom } from '@reatom/react';

import { libsAtom } from '##/modules/libs';
import { libAtom } from '##/modules/lib';
import { useRouter } from 'react-router5';
import { useRoute } from 'react-router5';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';
import { IconBackward } from '@consta/uikit/IconBackward';
import { IconSearch } from '@consta/uikit/IconSearch';
import { Switch } from '@consta/uikit/Switch';
import { Button } from '@consta/uikit/Button';
import { Badge } from '@consta/uikit/Badge';
import { TextField } from '@consta/uikit/TextField';
import { useFlag } from '@consta/uikit/useFlag';
import { LibWithStands, Stand } from '##/exportTypes';
import { useIsActiveRouter } from '##/modules/router';

import './LibPageMenu.css';
import { useMemo } from 'react';

const getItemLabel = (item: { title: string }) => item.title;
const getItemGroupId = (item: { group?: string }) => item.group;
const getItemDescription = () => undefined;
const getGroupLabel = (group: { title: string }) => group.title;
const getGroupKey = (group: { id: string }) => group.id;
const getItemBadge = (item: Stand) => {
  if (item.status === 'stable') {
    return undefined;
  } else if (item.status === 'canary') {
    return <Badge label="Canary" view="filled" status="success" size="s" />;
  } else if (item.status === 'inWork') {
    return <Badge label="в работе" view="filled" status="warning" size="s" />;
  } else {
    return <Badge label="depricated" view="stroked" status="error" size="s" />;
  }
};
const getItemHref = (item: Stand) => {
  if (item.standId) {
    return routesNames.LIBS_LIB_STAND;
  }
  return routesNames.LIBS_LIB;
};
const getItemParmas = (item: Stand, libId?: string): Record<string, string> => {
  if (item.standId) {
    return {
      libId: libId ?? '',
      standId: item.standId ?? '',
    };
  }
  return {
    libId: libId ?? '',
  };
};

const cnLibPageMenu = cn('LibPageMenu');

export const LibPageMenu: React.FC = () => {
  const [libs] = useAtom(libsAtom);
  const [lib] = useAtom(libAtom);
  const router = useRouter();
  const route = useRoute();
  const [searchValue, setSearchValue] = useState<string | undefined | null>(null);
  const [showDeprecated, setShowDeprecated] = useFlag(true);
  const getIsActive = useIsActiveRouter();

  const onItemClick = useCallback(({ item }: { item: { standId?: string; id: string } }) => {
    if (item.standId) {
      router.navigate(routesNames.LIBS_LIB_STAND, { libId: item.id, standId: item.standId });
    } else {
      router.navigate(routesNames.LIBS_LIB, { libId: item.id });
    }
  }, []);

  const defaultStand: Stand = {
    id: lib?.id ?? 'uikit',
    title: 'Обзор',
    group: 'review',
    status: 'stable',
    version: '',
  };

  const getItemActive = (item: Stand) => {
    if (lib?.id) {
      if (item.standId) {
        return getIsActive(routesNames.LIBS_LIB_STAND, { libId: lib?.id, standId: item.standId });
      } else {
        return (
          getIsActive(routesNames.LIBS_LIB, { libId: lib?.id }) &&
          route.route.name === routesNames.LIBS_LIB
        );
      }
    }
  };

  const back = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    router.navigate(routesNames.LIBS);
  }, []);

  const { stands, logo, groups } = lib ?? ({} as LibWithStands);

  const allStands = [defaultStand, ...(stands ?? [])];

  const visibleStands = useMemo(() => {
    return allStands.filter((item) => {
      if (!showDeprecated && item.status === 'deprecated') {
        return false;
      }
      if (searchValue && searchValue.trim() !== '') {
        return item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      }
      return true;
    });
  }, [showDeprecated, searchValue]);

  const additionalControls = () => {
    return (
      <div className={cnLibPageMenu('Controls')}>
        {libs?.length > 0 && (
          <Button
            as="a"
            href={router.buildPath(routesNames.LIBS)}
            label="К списку библиотек"
            iconLeft={IconBackward}
            size="xs"
            view="clear"
            onClick={back}
            className={cnLibPageMenu('Button')}
          />
        )}
        {typeof logo === 'string' ? (
          <img alt="Consta-UIKit" src={logo?.toString()} className={cnLibPageMenu('Image')} />
        ) : (
          logo?.()
        )}
        <TextField
          type="text"
          value={searchValue}
          size="s"
          width="full"
          placeholder="Поиск по компонентам"
          leftSide={IconSearch}
          className={cnLibPageMenu('Input')}
          onChange={({ value }) => setSearchValue(value)}
        />
        <Switch
          checked={showDeprecated}
          size="m"
          className={cnLibPageMenu('Switch')}
          onChange={({ checked }) => setShowDeprecated[checked ? 'on' : 'off']()}
          label="Показывать deprecated"
        />
      </div>
    );
  };

  return (
    <PortalMenu
      items={visibleStands}
      className={cnLibPageMenu()}
      groups={[...(groups ?? [])]}
      additionalControls={additionalControls()}
      getItemLabel={getItemLabel}
      getItemHref={getItemHref}
      getItemParams={(item) => getItemParmas(item, lib?.id)}
      getGroupLabel={getGroupLabel}
      getItemActive={getItemActive}
      getItemBadge={getItemBadge}
      getGroupKey={getGroupKey}
      getItemGroupId={getItemGroupId}
      onItemClick={onItemClick}
      getItemDescription={getItemDescription}
    />
  );
};
