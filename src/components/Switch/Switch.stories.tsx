import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Switch from './';

const knobs = () => ({
  disabled: boolean('Disabled', false),
  wpSize: select('Size', ['m', 'l'], 'm'),
});

storiesOf('Switch', module)
  .addDecorator(withKnobs)
  .add('Свитч', () => <Switch {...knobs()}>{text('Content', 'Move me, I beg you!')}</Switch>);
