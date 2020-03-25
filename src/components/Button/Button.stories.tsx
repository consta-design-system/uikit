import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconUser from '../Icon/icons/User';
import { Button } from './Button';

const defaultKnobs = () => ({
  width: select('width', ['full', 'default'], 'default'),
  size: select('size', ['xs', 's', 'm', 'l'], 'm'),
  view: select('view', ['clear', 'primary', 'secondary', 'ghost'], 'primary'),
  form: select(
    'form',
    ['default', 'brick', 'round', 'brick-round', 'round-brick', 'brick-default', 'default-brick'],
    'default'
  ),
  disabled: boolean('disabled', false),
  label: text('Content', 'I am button'),
});

const withIconLeftKnobs = () => ({
  iconLeft: IconUser,
});

const withIconRightKnobs = () => ({
  iconRight: IconUser,
});

const withAsLink = () => ({
  as: 'a',
  href: '#',
  target: '_blank',
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
  .add('С иконкой справа и слева', () => (
    <Button
      onClick={action('click')}
      {...defaultKnobs()}
      {...withIconLeftKnobs()}
      {...withIconRightKnobs()}
    />
  ))
  .add('Как ссылка', () => (
    <Button onClick={action('click')} {...defaultKnobs()} {...withAsLink()} />
  ));
