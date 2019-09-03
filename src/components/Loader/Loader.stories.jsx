import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Loader from './Loader';

const knobs = () => ({
  wpSize: select('Size', ['s', 'm'], 's'),
});

storiesOf('Loader', module)
  .addDecorator(withKnobs)
  .add('Точки', () => <Loader {...knobs()}></Loader>);
