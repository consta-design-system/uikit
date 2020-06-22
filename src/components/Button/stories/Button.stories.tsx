import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import { IconSelect } from '../../../icons/IconSelect/IconSelect';
import { IconUser } from '../../../icons/IconUser/IconUser';
import { cn } from '../../../utils/bem';
import { Button } from '../Button';

import mdx from './Button.mdx';

const defaultKnobs = () => ({
  width: select('Width', ['full', 'default'], 'default'),
  size: select('Size', ['xs', 's', 'm', 'l'], 'm'),
  view: select('View', ['clear', 'primary', 'secondary', 'ghost'], 'primary'),
  form: select(
    'Form',
    ['default', 'brick', 'round', 'brickRound', 'roundBrick', 'brickDefault', 'defaultBrick'],
    'default',
  ),
  disabled: boolean('Disabled', false),
  loading: boolean('Loading', false),
  label: text('Content', 'I am button'),
  iconLeft: boolean('Icon Left', false),
  iconRight: boolean('Icon Right', false),
  onlyIcon: boolean('Only Icon', false),
});

const cnButtonStories = cn('ButtonStories');

export function Playground() {
  const {
    width,
    size,
    view,
    form,
    disabled,
    loading,
    label,
    iconLeft,
    iconRight,
    onlyIcon,
  } = defaultKnobs();

  return (
    <div className={cnButtonStories()}>
      <Button
        width={width}
        size={size}
        view={view}
        form={form}
        disabled={disabled}
        loading={loading}
        label={label}
        onlyIcon={onlyIcon}
        onClick={action('click')}
        iconLeft={iconLeft ? IconUser : undefined}
        iconRight={iconRight ? IconSelect : undefined}
      />
    </div>
  );
}

export default {
  title: 'UI-KIT|/Button',
  component: Playground,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
