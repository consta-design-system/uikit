import { number, object, select } from '@storybook/addon-knobs';
import * as React from 'react';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { avatarGroupItems } from '../__mocks__/mock.data';
import {
  AvatarGroup,
  avatarGroupPropForm,
  avatarGroupPropFormDefault,
  avatarGroupPropSize,
  avatarGroupPropSizeDefault,
} from '../AvatarGroup';
import mdx from './AvatarGroup.docs.mdx';

const defaultKnobs = () => ({
  visibleCount: number('visibleCount', 4),
  size: select('size', avatarGroupPropSize, avatarGroupPropSizeDefault),
  form: select('form', avatarGroupPropForm, avatarGroupPropFormDefault),
  items: object('items', avatarGroupItems),
});

const cnAvatarStories = cn('AvatarStories');

export const Playground = () => {
  const { items, size, visibleCount, form } = defaultKnobs();

  return (
    <div className={cnAvatarStories()}>
      <AvatarGroup
        visibleCount={visibleCount}
        items={items}
        size={size}
        form={form}
      />
    </div>
  );
};

export default createMetadata({
  title: 'Компоненты|/Графика/AvatarGroup',
  id: 'components/AvatarGroup',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=56%3A30966',
    },
  },
});
