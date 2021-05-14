import * as React from 'react';
import { select, text } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  Avatar,
  avatarPropForm,
  avatarPropFormDefault,
  avatarPropSize,
  avatarPropSizeDefault,
} from '../Avatar';

import mdx from './Avatar.docs.mdx';

const defaultKnobs = () => ({
  url: text('url', ''),
  name: text('name', 'Вадим Матвеев'),
  size: select('size', avatarPropSize, avatarPropSizeDefault),
  form: select('form', avatarPropForm, avatarPropFormDefault),
});

const cnAvatarStories = cn('AvatarStories');

export function Playground() {
  const { url, name, size, form } = defaultKnobs();

  return (
    <div className={cnAvatarStories()}>
      <Avatar url={url} name={name} size={size} form={form} />
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Графика/Avatar',
  id: 'components/Avatar',
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
