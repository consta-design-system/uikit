import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Loader } from './Loader';

const knobs = () => ({
  size: select('size', ['s', 'm'], 's'),
});

storiesOf('Loader', module)
  .addDecorator(withKnobs)
  .add('Точки', () => <Loader {...knobs()} />);
