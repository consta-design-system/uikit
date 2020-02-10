import React from 'react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import User from './';

const defaultKnobs = () => ({
  view: select('View', ['secondary', 'clear'], 'clear'),
  size: select('Size', ['s', 'm'], 'm'),
  status: select('Status', ['default', 'available', 'away', 'off'], 'default'),
  avatar: text(
    'Avatar Url',
    `https://pbs.twimg.com/profile_images/1150453787603156992/DoiKLDMY_400x400.png`,
  ),
});

const fullKnobs = () => ({
  profileLink: text('Url', `http://ya.ru`),
  name: text('Name', `Имя Фамилия`),
  info: text('Info', `Сегодня на Почтамской`),
});

storiesOf('User', module)
  .addDecorator(withKnobs)
  .add('Full', () => (
    <div>
      <User {...defaultKnobs()} {...fullKnobs()} />
    </div>
  ))
  .add('Mini', () => (
    <div>
      <User onlyAvatar={true} {...defaultKnobs()} />
    </div>
  ));
