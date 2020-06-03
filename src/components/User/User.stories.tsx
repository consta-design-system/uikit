import React from 'react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { User } from './User';

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

storiesOf('User', module)
  .addDecorator(withKnobs)
  .add('User', () => <User {...defaultKnobs()} />);
