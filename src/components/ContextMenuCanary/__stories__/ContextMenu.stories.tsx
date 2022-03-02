import React, { useMemo, useRef, useState } from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import { exampleItems, groups } from '../__mocks__/mock.data';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { ContextMenu } from '../ContextMenuCanary';
import { contextMenuDefaultSize, contextMenuSizes } from '../types';

import mdx from './ContextMenu.docs.mdx';

const defaultKnobs = () => ({
  size: select('size', contextMenuSizes, contextMenuDefaultSize),
  disabled: boolean('disabledLastItem', false),
  withGroup: boolean('withGroup', false),
  withGroupLabel: boolean('withGroupLabel', false),
  withSubMenu: boolean('withSubMenu', false),
  withLeftSide: boolean('withLeftSide', false),
  withRightSide: boolean('withRightSide', false),
});

const cnChoiceGroupStories = cn('ContextMenuStories');

export function Playground() {
  const {
    disabled,
    size,
    withGroup,
    withGroupLabel,
    withSubMenu,
    withLeftSide,
    withRightSide,
  } = defaultKnobs();

  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const itemsArr = useMemo(() => {
    if (withGroup) {
      return exampleItems;
    }
    return exampleItems.map((item) => {
      const copy = { ...item };
      delete copy.groupId;
      return copy;
    });
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

  const getItemLeftSide = (item: typeof exampleItems[number]) => {
    if (withLeftSide) {
      return item.leftSide;
    }
    return undefined;
  };

  const getItemRightSide = (item: typeof exampleItems[number]) => {
    if (withRightSide) {
      return item.rightSide;
    }
    return undefined;
  };

  return (
    <div className={cnChoiceGroupStories()}>
      <Button label="Откройте контекстное меню" ref={ref} onClick={() => setIsOpen(!isOpen)} />
      <ContextMenu
        items={itemsArr}
        isOpen={isOpen}
        groups={withGroup ? groups : undefined}
        getGroupLabel={getGroupLabel}
        getItemSubMenu={getItemSubMenu}
        getItemDisabled={getItemDisabled}
        getItemLeftSide={getItemLeftSide}
        getItemRightSide={getItemRightSide}
        anchorRef={ref}
        size={size}
        sortGroup={sortGroup}
        onClickOutside={() => setIsOpen(false)}
        offset={8}
      />
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
