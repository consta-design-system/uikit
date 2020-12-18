import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import { IconSelect } from '../../../icons/IconSelect/IconSelect';
import { IconUser } from '../../../icons/IconUser/IconUser';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  Button,
  buttonPropForm,
  buttonPropFormDefault,
  buttonPropSize,
  buttonPropSizeDefault,
  buttonPropView,
  buttonPropViewDefault,
  buttonPropWidth,
  buttonPropWidthDefault,
} from '../Button';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Button.mdx';

const defaultKnobs = () => ({
  width: select('Width', buttonPropWidth, buttonPropWidthDefault),
  size: select('Size', buttonPropSize, buttonPropSizeDefault),
  view: select('View', buttonPropView, buttonPropViewDefault),
  form: select('Form', buttonPropForm, buttonPropFormDefault),
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

export default createMetadata({
  title: 'Компоненты|/Button',
  id: 'components/Button',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
