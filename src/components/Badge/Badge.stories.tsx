import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import IconUser from '../Icon/icons/User';
import Badge from '.';

const defaultKnobs = () => ({
  wpSize: select('Size', ['s', 'm'], 'm'),
  view: select('View', ['filled', 'stroked'], 'filled'),
  status: select('Status', ['success', 'error', 'warning', 'normal', 'system'], 'success'),
  form: select('Form', ['default', 'round'], 'default'),
  isMinified: boolean('Minified', false),
});

storiesOf('Badge', module)
  .addDecorator(withKnobs)
  .add('Текстовый', () => <Badge {...defaultKnobs()}>{text('Content', 'Statusing along')}</Badge>)
  .add('С иконкой', () => (
    <Badge withIcon={true} icon={<IconUser size={'xs'} />} {...defaultKnobs()}>
      {text('Content', 'Statusing along')}
    </Badge>
  ));
