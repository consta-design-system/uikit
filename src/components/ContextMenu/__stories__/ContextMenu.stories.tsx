import React, { useRef, useState } from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { exampleItems, groups, Item } from '../__mocks__/mock.data';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Badge } from '../../Badge/Badge';
import { Button } from '../../Button/Button';
import { Switch } from '../../Switch/Switch';
import { ContextMenu } from '../ContextMenu';
import {
  contextMenuDefaultSize,
  ContextMenuPropGetDisable,
  ContextMenuPropGetGroupId,
  ContextMenuPropGetGroupLabel,
  ContextMenuPropGetSide,
  ContextMenuPropGetSubItems,
  ContextMenuPropSize,
  contextMenuSizes,
} from '../helpers';

import mdx from './ContextMenu.docs.mdx';

const defaultKnobs = () => ({
  size: select('size', contextMenuSizes, contextMenuDefaultSize),
  disabled: boolean('disabledLastItem', false),
  withGroup: boolean('withGroup', false),
  groupWithLabel: boolean('groupWithLabel', false),
  withSubMenu: boolean('withSubMenu', false),
  withLeftSide: boolean('withLeftSide', false),
  withRightSide: boolean('withRightSide', false),
});

function renderLeftSide(item: Item): React.ReactNode {
  const Icon = item.icon;
  if (Icon) {
    return <Icon size="s" />;
  }
  if (Icon === null) {
    return <div style={{ width: 16 }} />;
  }
  return undefined;
}

function renderRightSide(
  item: Item,
  size: ContextMenuPropSize,
  onChange: (item: Item) => void,
  getDisabled?: ContextMenuPropGetDisable<Item>,
): React.ReactNode {
  const nodeArray = [];
  const disabled = typeof getDisabled === 'function' ? getDisabled(item) : false;

  item.switch !== undefined &&
    nodeArray.push(
      <Switch
        size={size === 'l' ? 'l' : 'm'}
        checked={item.switch}
        onChange={() => onChange(item)}
        key="Switch"
        disabled={disabled}
      />,
    );

  item.status &&
    nodeArray.push(
      <Badge
        status={disabled ? 'system' : item.status}
        minified
        key="Badge"
        size={size === 'l' ? 'm' : 's'}
      />,
    );

  return nodeArray;
}

const cnChoiceGroupStories = cn('ContextMenuStories');

export function Playground() {
  const {
    disabled,
    size,
    withGroup,
    groupWithLabel,
    withSubMenu,
    withLeftSide,
    withRightSide,
  } = defaultKnobs();

  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<Item[]>(exampleItems);

  const onSwitch = (item: Item) => {
    const itemIndex = items.findIndex((v) => v.name === item.name);
    const newItems = Array.from(items);
    newItems.splice(itemIndex, 1, { ...items[itemIndex], switch: !items[itemIndex].switch });
    setItems(newItems);
  };

  const getDisabled: ContextMenuPropGetDisable<Item> = (item) =>
    disabled ? item.disabled : undefined;
  const getGroupId: ContextMenuPropGetGroupId<Item> | undefined = withGroup
    ? (item) => item.group
    : undefined;
  const getGroupLabel: ContextMenuPropGetGroupLabel | undefined = groupWithLabel
    ? (id) => groups.find((group) => group.id === id)?.name
    : undefined;
  const getSubItems: ContextMenuPropGetSubItems<Item> | undefined = withSubMenu
    ? (item) => item.subMenu
    : undefined;
  const getRightSideBar: ContextMenuPropGetSide<Item> | undefined = withRightSide
    ? (item) => renderRightSide(item, size, onSwitch, getDisabled)
    : undefined;
  const getLeftSideBar: ContextMenuPropGetSide<Item> | undefined = withLeftSide
    ? (item) => renderLeftSide(item)
    : undefined;

  const sortGroup = (a: number | string, b: number | string) => {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  };

  return (
    <div className={cnChoiceGroupStories()}>
      <Button label="Откройте контекстное меню" ref={ref} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <ContextMenu
          items={items}
          getLabel={(item) => item.name}
          getGroupId={getGroupId}
          getGroupLabel={getGroupLabel}
          anchorRef={ref}
          getSubItems={getSubItems}
          size={size}
          getRightSideBar={getRightSideBar}
          getLeftSideBar={getLeftSideBar}
          getDisabled={getDisabled}
          sortGroup={sortGroup}
          onClickOutside={() => setIsOpen(false)}
          offset={8}
        />
      )}
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Базовые/ContextMenu',
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
