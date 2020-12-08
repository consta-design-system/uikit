import './ContextMenuExampleSubMenu.css';

import React, { useRef } from 'react';

import { IconAdd } from '../../../../../icons/IconAdd/IconAdd';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

type Item = {
  name: string;
  menu?: Item[];
};

const items: Item[] = [
  {
    name: 'Пункт 1',
    menu: [
      {
        name: 'Пункт 1-1',
      },
      {
        name: 'Пункт 1-2',
      },
      {
        name: 'Пункт 1-3',
        menu: [
          {
            name: 'Пункт 1-3-1',
          },
          {
            name: 'Пункт 1-3-2',
          },
          {
            name: 'Пункт 1-3-3',
          },
        ],
      },
    ],
  },
  {
    name: 'Пункт 2',
  },
  {
    name: 'Пункт 3',
  },
];

const cnContextMenuExampleSubMenu = cn('ContextMenuExampleSubMenu');

export const ContextMenuExampleSubMenu = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section', [cnContextMenuExampleSubMenu()])}>
      <Button iconLeft={IconAdd} ref={ref1} />
      <ContextMenu
        items={items}
        getLabel={(item) => item.name}
        anchorRef={ref1}
        direction="downStartRight"
        subMenuDirection="leftStartUp"
        possibleDirections={['upStartRight', 'downStartRight']}
        spareDirection="downStartRight"
        getSubItems={(item) => item.menu}
      />
      <Button iconLeft={IconAdd} ref={ref2} />
      <ContextMenu
        items={items}
        getLabel={(item) => item.name}
        anchorRef={ref2}
        direction="downStartLeft"
        possibleDirections={['upStartLeft', 'downStartLeft']}
        subMenuDirection="rightStartUp"
        getSubItems={(item) => item.menu}
      />
    </StoryBookExample>
  );
};
