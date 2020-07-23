import React from 'react';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Avatar } from './Avatar';

const defaultKnobs = () => ({
  url: text('url', 'https://pbs.twimg.com/profile_images/1150453787603156992/DoiKLDMY_400x400.png'),
  name: text('name', 'Вадим Матвеев'),
  size: select('size', ['s', 'm'], 'm'),
  form: select('form', ['round', 'brick', 'default'], 'round'),
});

storiesOf('UI-KIT|/Avatar', module)
  .addDecorator(withKnobs)
  .add('playground', () => <Avatar {...defaultKnobs()} />);
