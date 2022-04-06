import React, { useEffect, useRef, useState } from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { exampleItems, groups, Item } from '../__mocks__/mock.data';
import { useFlag } from '../../../hooks/useFlag/useFlag';
import { IconSelect } from '../../../icons/IconSelect/IconSelect';
import { IconSelectOpen } from '../../../icons/IconSelectOpen/IconSelectOpen';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Badge } from '../../Badge/Badge';
import { Button } from '../../Button/Button';
import { Switch } from '../../Switch/Switch';
import { ContextMenu } from '../ContextMenuCanary';
import {
  contextMenuDefaultSize,
  ContextMenuPropGetItemDisabled,
  ContextMenuPropSize,
  contextMenuSizes,
} from '../types';

import mdx from './ContextMenu.docs.mdx';

const defaultKnobs = () => ({
  size: select('size', contextMenuSizes, contextMenuDefaultSize),
  disabled: boolean('disabledLastItem', false),
  withGroup: boolean('withGroup', false),
  withGroupLabel: boolean('withGroupLabel', false),
  withSubMenu: boolean('withSubMenu', false),
  withLeftIcon: boolean('withLeftIcon', false),
  withLeftSide: boolean('withLeftSide', false),
  withRightIcon: boolean('withRightIcon', false),
  withRightSide: boolean('withRightSide', false),
});

const cnChoiceGroupStories = cn('ContextMenuStories');

function renderRightSide(
  item: Item,
  size: ContextMenuPropSize,
  onChange: (item: Item) => void,
  getDisabled?: ContextMenuPropGetItemDisabled<Item>,
): React.ReactNode {
  const nodeArray = [];
  const disabled = typeof getDisabled === 'function' ? getDisabled(item) : false;
  const status = item.status === 'alert' ? 'error' : item.status;
  item.switch !== undefined &&
    nodeArray.push(
      <Switch
        size="s"
        checked={item.switch}
        onChange={() => onChange(item)}
        key="Switch"
        disabled={disabled}
      />,
    );

  status &&
    nodeArray.push(
      <Badge
        status={disabled ? 'system' : status}
        minified
        key="Badge"
        size={size === 'l' ? 'm' : 's'}
      />,
    );

  return nodeArray;
}

export function Playground() {
  const {
    disabled,
    size,
    withGroup,
    withGroupLabel,
    withSubMenu,
    withLeftIcon,
    withLeftSide,
    withRightSide,
    withRightIcon,
  } = defaultKnobs();

  const [items, setItems] = useState<Item[]>(exampleItems);

  const onSwitch = (item: typeof exampleItems[number]) => {
    const itemIndex = items.findIndex((v) => v.label === item.label);
    const newItems = Array.from(items);
    newItems.splice(itemIndex, 1, { ...items[itemIndex], switch: !items[itemIndex].switch });
    setItems(newItems);
  };

  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useFlag();

  useEffect(() => {
    if (withGroup) {
      setItems(exampleItems);
    } else {
      setItems(
        items.map((item) => {
          const copy = { ...item };
          delete copy.groupId;
          return copy;
        }),
      );
    }
  }, [withGroup]);

  const sortGroup = (a: number | string, b: number | string) => {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  };

  const getItemGroupId = (item: typeof exampleItems[number]) => {
    if (withGroup) {
      return item.groupId;
    }
    return undefined;
  };

  const getGroupLabel = (group: typeof groups[number]) => {
    if (withGroupLabel) {
      return group.label;
    }
    return undefined;
  };

  const getItemSubMenu = (item: typeof exampleItems[number]) => {
    if (withSubMenu) {
      return item.subMenu;
    }
    return undefined;
  };

  const getItemDisabled = (item: typeof exampleItems[number]) => {
    if (disabled) {
      return item.disabled;
    }
    return undefined;
  };

  const getItemLeftIcon = (item: typeof exampleItems[number]) => {
    if (withLeftIcon) {
      return item.leftIcon;
    }
    return undefined;
  };

  const getItemRightIcon = (item: typeof exampleItems[number]) => {
    if (withRightIcon) {
      return item.leftIcon;
    }
    return undefined;
  };

  const getItemRightSide = (item: typeof exampleItems[number]) => {
    if (withRightSide) {
      return renderRightSide(item, size, onSwitch, getItemDisabled);
    }
    return undefined;
  };

  const getItemLeftSide = (item: typeof exampleItems[number]) => {
    if (withLeftSide) {
      return renderRightSide(item, size, onSwitch, getItemDisabled);
    }
    return undefined;
  };

  return (
    <div className={cnChoiceGroupStories()}>
      <Button
        label="Откройте контекстное меню"
        ref={ref}
        onClick={setIsOpen.toogle}
        iconRight={isOpen ? IconSelectOpen : IconSelect}
      />
      <ContextMenu
        items={items}
        isOpen={isOpen}
        groups={withGroup ? groups : undefined}
        getGroupLabel={getGroupLabel}
        getItemGroupId={getItemGroupId}
        getItemSubMenu={getItemSubMenu}
        getItemDisabled={getItemDisabled}
        getItemLeftIcon={getItemLeftIcon}
        getItemRightIcon={getItemRightIcon}
        anchorRef={ref}
        getItemRightSide={getItemRightSide}
        getItemLeftSide={getItemLeftSide}
        size={size}
        sortGroup={sortGroup}
        onClickOutside={setIsOpen.off}
        offset={8}
        style={{ zIndex: 100 }}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Базовые/ContextMenu(Canary)',
  id: 'components|/ContextMenu',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=4894%3A74617',
    },
  },
});
