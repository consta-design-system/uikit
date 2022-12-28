import { IconComponent } from '@consta/icons/Icon';
import { IconAdd } from '@consta/icons/IconAdd';
import { IconInfo } from '@consta/icons/IconInfo';
import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { useFlag } from '##/hooks/useFlag';

import { Badge } from '../../../../Badge/Badge';
import { Button } from '../../../../Button/Button';
import { Switch } from '../../../../Switch/Switch';
import { ContextMenu } from '../../../ContextMenuDeprecated';

type Item = {
  name: string;
  icon: IconComponent;
  switch?: boolean;
  status: 'warning' | 'success';
};

const menuItems: Item[] = [
  {
    name: 'Пункт 1',
    icon: IconInfo,
    status: 'success',
  },
  {
    name: 'Пункт 2',
    icon: IconInfo,
    status: 'warning',
    switch: false,
  },
  {
    name: 'Пункт 3',
    icon: IconInfo,
    status: 'success',
    switch: true,
  },
];

function renderLeftSide(item: Item): React.ReactNode {
  const Icon = item.icon;
  return <Icon size="s" />;
}

function renderRightSide(
  item: Item,
  onChange: (item: Item) => void,
): React.ReactNode {
  const nodeArray = [];

  item.switch !== undefined &&
    nodeArray.push(
      <Switch
        size="m"
        checked={item.switch}
        onChange={() => onChange(item)}
        key="Switch"
      />,
    );

  nodeArray.push(<Badge status={item.status} minified key="Badge" size="s" />);

  return nodeArray;
}

export const ContextMenuExampleSide = () => {
  const [items, setItems] = useState(menuItems);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useFlag();

  const getLabel = (item: Item) => item.name;

  const onChange = (switchItem: Item) => {
    const newItems = items.map((item, index) => {
      if (getLabel(switchItem) === getLabel(item)) {
        return { ...items[index], switch: !items[index].switch };
      }
      return item;
    });

    setItems(newItems);
  };

  return (
    <>
      <Example>
        <Button iconLeft={IconAdd} ref={ref} onClick={setIsOpen.toggle} />
      </Example>
      {isOpen && (
        <ContextMenu
          items={items}
          getLabel={getLabel}
          anchorRef={ref}
          direction="downStartLeft"
          getLeftSideBar={renderLeftSide}
          getRightSideBar={(item) => renderRightSide(item, onChange)}
          possibleDirections={['upStartLeft', 'downStartLeft']}
        />
      )}
    </>
  );
};
