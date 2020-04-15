import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { IconUser } from '../../icons/IconUser/IconUser';
import { Button } from './Button';

const defaultKnobs = () => ({
  width: select('width', ['full', 'default'], 'default'),
  size: select('size', ['xs', 's', 'm', 'l'], 'm'),
  view: select('view', ['clear', 'primary', 'secondary', 'ghost'], 'primary'),
  form: select(
    'form',
    ['default', 'brick', 'round', 'brickRound', 'roundBrick', 'brickDefault', 'defaultBrick'],
    'default'
  ),
  disabled: boolean('disabled', false),
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
    <Button<{ href: string; target: string }>
      as="a"
      href="#"
      target="_blank"
      onClick={action('click')}
      {...withIconLeftKnobs()}
      {...defaultKnobs()}
    />
  ));
