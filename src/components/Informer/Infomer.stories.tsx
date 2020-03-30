import React from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import IconUser from '../Icon/icons/User';
import { Informer } from './Informer';

const defaultKnobs = () => ({
  status: select('status', ['system', 'alert', 'warning', 'success'], 'system'),
  title: text('title', 'Title'),
  label: text('label', 'I am informer'),
  view: select('view', ['filled', 'bordered'], 'filled'),
});

storiesOf('Informer', module)
  .addDecorator(withKnobs)
  .add('С текстом', () => <Informer {...defaultKnobs()} />)
  .add('С текстом и иконкой', () => <Informer icon={IconUser} {...defaultKnobs()} />);
