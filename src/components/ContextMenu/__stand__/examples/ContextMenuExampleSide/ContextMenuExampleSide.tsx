import { IconComponent } from '@consta/icons/Icon';
import { IconInfo } from '@consta/icons/IconInfo';
import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Badge } from '../../../../Badge/Badge';
import { Button } from '../../../../Button/Button';
import { Switch } from '../../../../Switch/Switch';
import { ContextMenu } from '../../../ContextMenu';

type Item = {
  label: string;
  icon: IconComponent;
  switch?: boolean;
  status: 'warning' | 'success';
};

const menuItems: Item[] = [
  {
    label: 'Пункт 1',
    icon: IconInfo,
    status: 'success',
  },
  {
    label: 'Пункт 2',
    icon: IconInfo,
    status: 'warning',
    switch: false,
  },
  {
    label: 'Пункт 3',
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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useRef(null);

  const onChange = (switchItem: Item) => {
    const newItems = items.map((item, index) => {
      if (switchItem.label === item.label) {
        return { ...items[index], switch: !items[index].switch };
      }
      return item;
    });

    setItems(newItems);
  };

  return (
    <>
      <Example>
        <Button ref={ref} label="Открыть" onClick={() => setIsOpen(!isOpen)} />
      </Example>
      <ContextMenu
        isOpen={isOpen}
        items={items}
        anchorRef={ref}
        getItemLeftSide={renderLeftSide}
        getItemRightSide={(item) => renderRightSide(item, onChange)}
      />
    </>
  );
};
