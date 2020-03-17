import React from 'react';
import { withKnobs, text, select, boolean, radios } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconUser from '../Icon/icons/User';
import Button from './Button';

const defaultKnobs = () => ({
  width: select('Width', ['full', 'default'], 'default'),
  wpSize: select('Size', ['xs', 's', 'm', 'l'], 'm'),
  view: select('View', ['clear', 'primary', 'secondary', 'ghost'], 'primary'),
  form: select(
    'Form',
    ['default', 'brick', 'round', 'brick-round', 'round-brick', 'brick-default', 'default-brick'],
    'default',
  ),
  disabled: boolean('Disabled', false),
});

const withIconKnobs = () => ({
  withIcon: radios('Icon position', ['left', 'right'], 'left'),
});

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('С текстом', () => (
    <Button onClick={action('click')} {...defaultKnobs()}>
      {text('Content', 'I am button')}
    </Button>
  ))
  .add('С иконкой', () => (
    <Button onClick={action('click')} {...defaultKnobs()} className="button_icon-only">
      <IconUser size={'xs'} className={'button__icon'} />
    </Button>
  ))
  .add('С текстом и иконкой', () => (
    <Button onClick={action('click')} {...defaultKnobs()} {...withIconKnobs()}>
      {text('Content', 'I am button')}
      <IconUser size={'xs'} className={'button__icon'} />
    </Button>
  ))
  .add('В роли ссылки', () => (
    <Button url="/" {...defaultKnobs()}>
      {text('Content', 'I am link')}
    </Button>
  ));
