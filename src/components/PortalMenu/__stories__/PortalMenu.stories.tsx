import './PortalMenuStories.css';

import React, { useMemo, useState } from 'react';

import {
  components as componentsArray,
  componentsGroup,
  ComponentType,
  groups,
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
import { PortalMenu, PortalMenuPropView } from '../PortalMenu';

const cnPortalMenuStories = cn('PortalMenuStories');

export function Playground() {
  const [view, setView] = useState<PortalMenuPropView>('navigation');
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

  const components: ComponentType[] = useMemo(() => {
    return componentsArray.filter((item) => {
      if (!showDeprecated && item.deprecated) {
        return false;
      }
      if (searchValue && searchValue.trim() !== '') {
        return item.label.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      }
      return true;
    });
  }, [showDeprecated, searchValue]);

  return (
    <PortalMenu
      className={cnPortalMenuStories()}
      view={view}
      additionalControls={view === 'components' ? additionalControls() : undefined}
      packages={view === 'packages' ? packages : components}
      groups={view === 'packages' ? groups : componentsGroup}
      navigation={view === 'navigation' ? navigation : navigationPackages}
      onNavigationClick={() => setView('packages')}
      onPackageClick={() => setView('components')}
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
