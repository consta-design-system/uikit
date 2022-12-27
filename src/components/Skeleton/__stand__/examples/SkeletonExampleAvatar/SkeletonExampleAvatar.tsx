import './SkeletonExampleAvatar.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { SkeletonCircle, SkeletonText } from '../../../Skeleton';

export const SkeletonExampleAvatar = () => (
  <Example>
    <div className={cnSkeletonExampleAvatar()}>
      <SkeletonCircle className={cnSkeletonExampleAvatar('Avatar')} size={32} />
      <SkeletonText
        className={cnSkeletonExampleAvatar('Text')}
        rows={2}
        fontSize="xs"
        lineHeight="s"
      />
    </div>
  </Example>
);

const cnSkeletonExampleAvatar = cn('SkeletonExampleAvatar');
