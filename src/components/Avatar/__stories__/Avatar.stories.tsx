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

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Avatar.mdx';

const defaultKnobs = () => ({
  url: text('url', 'https://pbs.twimg.com/profile_images/1150453787603156992/DoiKLDMY_400x400.png'),
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
  title: 'Components|/Avatar',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
