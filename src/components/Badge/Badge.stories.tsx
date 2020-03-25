import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import IconUser from '../Icon/icons/User';
import { Badge } from './Badge';

const defaultKnobs = () => ({
  label: text('label', 'Statusing along'),
  size: select('size', ['s', 'm'], 'm'),
  view: select('view', ['filled', 'stroked'], 'filled'),
  status: select('status', ['success', 'error', 'warning', 'normal', 'system'], 'success'),
  form: select('form', ['default', 'round'], 'default'),
  minified: boolean('minified', false),
});

storiesOf('Badge', module)
  .addDecorator(withKnobs)
  .add('Текстовый', () => <Badge {...defaultKnobs()} />)
  .add('С иконкой', () => <Badge {...defaultKnobs()} icon={IconUser} />);
