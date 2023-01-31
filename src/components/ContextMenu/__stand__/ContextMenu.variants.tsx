import './ContextMenu.variants.css';

import { IconSelect } from '@consta/icons/IconSelect';
import { IconSelectOpen } from '@consta/icons/IconSelectOpen';
import { useBoolean, useSelect } from '@consta/stand';
import React, { useEffect, useRef, useState } from 'react';

import { cn } from '##/utils/bem';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { Badge } from '../../Badge/Badge';
import { Button } from '../../Button/Button';
import { Switch } from '../../Switch/Switch';
import { exampleItems, groups, Item } from '../__mocks__/mock.data';
import { ContextMenu } from '../ContextMenu';
import {
  contextMenuDefaultSize,
  contextMenuForm,
  ContextMenuPropGetItemDisabled,
  ContextMenuPropSize,
  contextMenuSizes,
  defaultContextMenuForm,
} from '../types';

function renderRightSide(
  item: Item,
  size: ContextMenuPropSize,
  onChange: (item: Item) => void,
  getDisabled?: ContextMenuPropGetItemDisabled<Item>,
): React.ReactNode {
  const nodeArray = [];
  const disabled =
    typeof getDisabled === 'function' ? getDisabled(item) : false;
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

const cnContextMenuVariants = cn('ContextMenuVariants');

const Variants = () => {
  const size =
    useSelect('size', contextMenuSizes, contextMenuDefaultSize) ||
    contextMenuDefaultSize;
  const form = useSelect('form', contextMenuForm, defaultContextMenuForm);
  const withGroup = useBoolean('withGroup', false);
  const withGroupLabel = useBoolean('withGroupLabel', false);
  const withSubMenu = useBoolean('withSubMenu', false);
  const withLeftIcon = useBoolean('withLeftIcon', false);
  const withLeftSide = useBoolean('withLeftSide', false);
  const withRightIcon = useBoolean('withRightIcon', false);
  const withRightSide = useBoolean('withRightSide', false);
  const disabled = useBoolean('withDisabledItems', false);
  const isMobile = useBoolean('isMobile', false);

  const [items, setItems] = useState<Item[]>(exampleItems);

  const onSwitch = (item: typeof exampleItems[number]) => {
    const itemIndex = items.findIndex((v) => v.label === item.label);
    const newItems = Array.from(items);
    newItems.splice(itemIndex, 1, {
      ...items[itemIndex],
      switch: !items[itemIndex].switch,
    });
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
    <div className={cnContextMenuVariants()}>
      <Button
        label="Откройте контекстное меню"
        ref={ref}
        onClick={setIsOpen.toggle}
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
        getItemStatus={() => undefined}
        anchorRef={ref}
        getItemRightSide={getItemRightSide}
        getItemLeftSide={getItemLeftSide}
        size={size}
        sortGroup={sortGroup}
        onClickOutside={setIsOpen.off}
        offset="xs"
        style={{ zIndex: 100 }}
        form={form}
        isMobile={isMobile}
      />
    </div>
  );
};

export default Variants;
