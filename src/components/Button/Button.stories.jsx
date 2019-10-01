import React from 'react';
import { withKnobs, text, select, boolean, radios } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '.';

const defaultKnobs = () => ({
  width: select('Width', ['full', 'default'], 'default'),
  wpSize: select('Size', ['s', 'm', 'l', 'xl'], 'm'),
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
      {/* Временное решение, пока не появится сборка иконок */}
      <svg
        className="icon_user_xs button__icon"
        width="11"
        height="11"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="5.5" cy="2.5" r="2.5" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 11c0-2.734-1-4.5-4.5-4.5S1 8.266 1 11h9z"
        />
      </svg>
    </Button>
  ))
  .add('С текстом и иконкой', () => (
    <Button onClick={action('click')} {...defaultKnobs()} {...withIconKnobs()}>
      {text('Content', 'I am button')}
      {/* Временное решение, пока не появится сборка иконок */}
      <svg
        className="icon_user_xs button__icon"
        width="11"
        height="11"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="5.5" cy="2.5" r="2.5" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 11c0-2.734-1-4.5-4.5-4.5S1 8.266 1 11h9z"
        />
      </svg>
    </Button>
  ));
