import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IconUser } from '../../icons/IconUser/IconUser';

import { Button } from './Button';

const defaultKnobs = () => ({
  width: select('width', ['full', 'default'], 'default'),
  size: select('size', ['xs', 's', 'm', 'l'], 'm'),
  view: select('view', ['clear', 'primary', 'secondary', 'ghost'], 'primary'),
  form: select(
    'form',
    ['default', 'brick', 'round', 'brickRound', 'roundBrick', 'brickDefault', 'defaultBrick'],
    'default',
  ),
  disabled: boolean('disabled', false),
  loading: boolean('loading', false),
  label: text('Content', 'I am button'),
  onlyIcon: boolean('onlyIcon', false),
});

const withIconLeftKnobs = () => ({
  iconLeft: IconUser,
});

const withIconRightKnobs = () => ({
  iconRight: IconUser,
});

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('С текстом', () => <Button onClick={action('click')} {...defaultKnobs()} />)
  .add('С иконкой слева', () => (
    <Button onClick={action('click')} {...defaultKnobs()} {...withIconLeftKnobs()} />
  ))
  .add('С иконкой справа', () => (
    <Button onClick={action('click')} {...defaultKnobs()} {...withIconRightKnobs()} />
  ))
  .add('Как ссылка', () => (
    <Button
      as="a"
      href="#"
      type="button"
      onClick={action('click')}
      {...withIconLeftKnobs()}
      {...defaultKnobs()}
    />
  ));
