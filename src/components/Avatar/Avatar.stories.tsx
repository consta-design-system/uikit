import React from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import figmaDecorator from 'storybook-addon-figma-new';
import { storiesOf } from '@storybook/react';
import { Avatar } from './Avatar';

const defaultKnobs = () => ({
  url: text('url', 'https://pbs.twimg.com/profile_images/1150453787603156992/DoiKLDMY_400x400.png'),
  name: text('name', 'Вадим Матвеев'),
  size: select('size', ['s', 'm'], 'm'),
  form: select('form', ['round', 'brick', 'default'], 'round'),
});

const withFigma = figmaDecorator({
  url: 'https://www.figma.com/file/FLCwrJTceo6xB9VInayasa/UI-Kit%2FDefault?node-id=2222%3A5588',
});

storiesOf('UI-KIT|/Avatar', module)
  .addDecorator(withKnobs)
  .addDecorator(withFigma)
  .add('playground', () => <Avatar {...defaultKnobs()} />);
