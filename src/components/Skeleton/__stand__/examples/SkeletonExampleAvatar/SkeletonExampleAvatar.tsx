import './SkeletonExampleAvatar.css';

import React from 'react';

import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { SkeletonCircle, SkeletonText } from '../../../Skeleton';

export const SkeletonExampleAvatar = () => (
  <StoryBookExample>
    <div className={cnSkeletonExampleAvatar()}>
      <SkeletonCircle className={cnSkeletonExampleAvatar('Avatar')} size={32} />
      <SkeletonText
        className={cnSkeletonExampleAvatar('Text')}
        rows={2}
        fontSize="xs"
        lineHeight="s"
      />
    </div>
  </StoryBookExample>
);

const cnSkeletonExampleAvatar = cn('SkeletonExampleAvatar');
