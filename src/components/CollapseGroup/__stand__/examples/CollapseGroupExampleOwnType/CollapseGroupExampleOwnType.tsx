import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '../../../../Badge/Badge';
import { OwnItem, ownItems } from '../../../__mocks__/mock.data';
import { CollapseGroup } from '../../../CollapseGroup';

const getItemLabel = (item: OwnItem) => item.title;
const getItemContent = (item: OwnItem) => item.text;
const getItemRightSide = (item: OwnItem) => (
  <Badge size="s" status={item.status} label={item.status} />
);

export const CollapseGroupExampleOwnType = () => {
  return (
    <Example>
      <CollapseGroup
        items={ownItems}
        getItemLabel={getItemLabel}
        getItemContent={getItemContent}
        getItemRightSide={getItemRightSide}
      />
    </Example>
  );
};
