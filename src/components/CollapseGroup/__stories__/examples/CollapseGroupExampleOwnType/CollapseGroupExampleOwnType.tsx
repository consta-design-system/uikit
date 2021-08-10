import React from 'react';

import { OwnItem, ownItems } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge } from '../../../../Badge/Badge';
import { CollapseGroup } from '../../../CollapseGroup';

const getItemLabel = (item: OwnItem) => item.title;
const getItemContent = (item: OwnItem) => item.text;
const getItemRightSide = (item: OwnItem) => (
  <Badge size="s" status={item.status} label={item.status} />
);

export const CollapseGroupExampleOwnType = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <CollapseGroup
        items={ownItems}
        getItemLabel={getItemLabel}
        getItemContent={getItemContent}
        getItemRightSide={getItemRightSide}
      />
    </StoryBookExample>
  );
};
