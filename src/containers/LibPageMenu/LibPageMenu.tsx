import React, { useCallback, useState } from 'react';

import { PortalMenu } from '##/containers/PortalMenu';
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
import { PreparedStand } from '##/exportTypes';

import './LibPageMenu.css';
import { useMemo } from 'react';

const mapBadgeProps = {
  stable: undefined,
  canary: {
    label: 'canary',
    status: 'success',
    view: 'filled',
  },
  inWork: {
    label: 'в работе',
    status: 'warning',
    view: 'filled',
  },
  deprecated: {
    label: 'deprecated',
    status: 'error',
    view: 'stroked',
  },
} as const;

const getItemLabel = (item: PreparedStand) => item.stand.title;
const getItemGroupId = (item: PreparedStand) => item.stand.group;
const getItemDescription = () => undefined;
const getGroupLabel = (group: { title: string }) => group.title;
const getGroupKey = (group: { id: string }) => group.id;
const getItemBadge = (item: PreparedStand) => {
  const props = mapBadgeProps[item.stand.status];
  if (!props) {
    return undefined;
  }

  return <Badge {...props} size="s" />;
};
const getItemHref = () => routesNames.LIBS_STAND;
const getItemParmas = (item: PreparedStand): Record<string, string> => ({
  stand: item.id,
});

const cnLibPageMenu = cn('LibPageMenu');

export const LibPageMenu: React.FC = () => {
  const [libs] = useAtom(libsAtom);
  const [lib] = useAtom(libAtom);
  const router = useRouter();
  const route = useRoute();
  const [searchValue, setSearchValue] = useState<string | undefined | null>(null);
  const [showDeprecated, setShowDeprecated] = useFlag(true);
  const getIsActive = useIsActiveRouter();

  const getItemActive = (item: PreparedStand) =>
    getIsActive(routesNames.LIBS_STAND, { stand: item.id });

  const back = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    router.navigate(routesNames.LIBS);
  }, []);

  const { stands, logo, groups } = lib ?? ({} as LibWithStands);

  const visibleStands = useMemo(() => {
    const reviewItem: PreparedStand | undefined = lib
      ? {
          id: lib.id,
          path: '',
          lib,
          stand: {
            id: lib.id,
            title: 'Обзор',
            group: 'review',
            status: 'stable',
            version: '',
          },
        }
      : undefined;

    return [...(reviewItem ? [reviewItem] : []), ...stands].filter((item) => {
      if (!showDeprecated && item.stand.status === 'deprecated') {
        return false;
      }
      if (searchValue && searchValue.trim() !== '') {
        return item.stand.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
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

  if (!lib) {
    return null;
  }

  return (
    <PortalMenu
      items={visibleStands}
      className={cnLibPageMenu()}
      groups={[...(groups ?? [])]}
      additionalControls={additionalControls()}
      getItemLabel={getItemLabel}
      getItemHref={getItemHref}
      getItemParams={getItemParmas}
      getGroupLabel={getGroupLabel}
      getItemActive={getItemActive}
      getItemBadge={getItemBadge}
      getGroupKey={getGroupKey}
      getItemGroupId={getItemGroupId}
      getItemDescription={getItemDescription}
    />
  );
};
