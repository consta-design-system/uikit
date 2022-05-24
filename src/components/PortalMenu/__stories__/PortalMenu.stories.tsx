import './PortalMenuStories.css';

import React, { useEffect, useMemo, useState } from 'react';

import {
  components as componentsArray,
  componentsGroup,
  groups,
  Item,
  navigation,
  navigationPackages,
  packages,
} from '../__mocks__/mock.data';
import { useFlag } from '../../../hooks/useFlag/useFlag';
import { IconBackward } from '../../../icons/IconBackward/IconBackward';
import { IconSearch } from '../../../icons/IconSearch/IconSearch';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { Switch } from '../../Switch/Switch';
import { TextField } from '../../TextField/TextField';
import { PortalMenu } from '../PortalMenu';

const cnPortalMenuStories = cn('PortalMenuStories');

type View = 'navigation' | 'packages' | 'components';

const getItems = (view: View) => {
  if (view === 'navigation') {
    return navigation;
  }
  if (view === 'components') {
    return componentsArray;
  }
  return [...navigationPackages, ...packages];
};

export function Playground() {
  const [view, setView] = useState<View>('navigation');
  const [searchValue, setSearchValue] = useState<string | undefined | null>(null);
  const [showDeprecated, setShowDeprecated] = useFlag(true);

  const additionalControls = () => {
    return (
      <div className={cnPortalMenuStories('Controls')}>
        <Button
          label="К списку библиотек"
          iconLeft={IconBackward}
          onClick={() => setView('packages')}
          size="xs"
          view="clear"
        />
        <TextField
          type="text"
          value={searchValue}
          size="s"
          width="full"
          placeholder="Поиск по компонентам"
          leftSide={IconSearch}
          onChange={({ value }) => setSearchValue(value)}
        />
        <Switch
          checked={showDeprecated}
          size="m"
          onChange={({ checked }) => setShowDeprecated[checked ? 'on' : 'off']()}
          label="Показывать deprecated"
        />
      </div>
    );
  };

  const toggle = () => {
    if (view === 'navigation') {
      setView('packages');
    } else if (view === 'packages') {
      setView('components');
    }
  };

  const items: Item[] = useMemo(() => {
    return getItems(view).filter((item) => {
      if (!showDeprecated && item.deprecated) {
        return false;
      }
      if (searchValue && searchValue.trim() !== '') {
        return item.label.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      }
      return true;
    });
  }, [showDeprecated, searchValue, view]);

  useEffect(() => {
    setSearchValue(null);
  }, [view]);

  return (
    <PortalMenu
      className={cnPortalMenuStories()}
      additionalControls={view === 'components' ? additionalControls() : undefined}
      items={items}
      groups={view === 'packages' ? groups : componentsGroup}
      onItemClick={toggle}
    />
  );
}

export default createMetadata({
  title: 'Компоненты|/Обратная связь/PortalMenu',
  id: 'components/PortalMenu',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=2334%3A37476',
    },
  },
});
