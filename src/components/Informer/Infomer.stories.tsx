import React from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import IconUser from '../Icon/icons/User';
import Informer from '.';

const defaultKnobs = () => ({
  status: select('Status', ['system', 'alert', 'warning', 'success'], 'system'),
});

storiesOf('Informer', module)
  .addDecorator(withKnobs)
  .add('С текстом', () => (
    <Informer view="filled" {...defaultKnobs()}>
      {text('Content', 'I am informer')}
    </Informer>
  ))
  .add('С текстом и иконкой', () => (
    <Informer
      view="filled"
      withIcon={true}
      icon={<IconUser size={'s'} view={'primary'} />}
      {...defaultKnobs()}
    >
      {text('Content', 'I am informer')}
    </Informer>
  ))
  .add('С текстом и полоской', () => (
    <Informer view="bordered" {...defaultKnobs()}>
      {text('Content', 'I am informer')}
    </Informer>
  ));
