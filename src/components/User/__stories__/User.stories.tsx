import React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import { User } from '../User';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './User.mdx';

const defaultKnobs = () => ({
  view: select('view', ['ghost', 'clear'], 'clear'),
  width: select('width', ['full', 'default'], 'default'),
  size: select('size', ['s', 'm'], 'm'),
  status: select('status', ['available', 'remote', 'out'], undefined),
  avatarUrl: text(
    'avatarUrl',
    `https://pbs.twimg.com/profile_images/1150453787603156992/DoiKLDMY_400x400.png`,
  ),
  name: text('Name', `Имя Фамилия`),
  info: text('Info', `Сегодня на Почтамской`),
  withArrow: boolean('withArrow', false),
  onlyAvatar: boolean('onlyAvatar', false),
});

export function Playground() {
  return (
    <div>
      <User {...defaultKnobs()} />
    </div>
  );
}

export default createMetadata({
  title: 'Components|/User',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
