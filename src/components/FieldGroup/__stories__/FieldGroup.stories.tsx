import React from 'react';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

import { items } from '../__mocks__/data.mock';
import { createMetadata } from '../../../utils/storybook';
import { Button } from '../../Button/Button';
import { Select } from '../../Select/Select';
import { TextField } from '../../TextField/TextField';
import { FieldGroup } from '../FieldGroup';

import mdx from './FieldGroup.docs.mdx';

const forms = [
  'default',
  'brick',
  'round',
  'clearRound',
  'roundClear',
  'clearDefault',
  'defaultClear',
  'defaultBrick',
  'brickDefault',
  'brickClear',
  'clearBrick',
  'clearClear',
] as const;

const sizes = ['xs', 's', 'm', 'l'] as const;

const defaultKnobs = () => ({
  form: select('form', forms, 'default'),
  size: select('size', sizes, 'm'),
});

export function Playground() {
  const { form, size } = defaultKnobs();

  return (
    <FieldGroup form={form} size={size}>
      <TextField placeholder="TextField" />
      <Select placeholder="Select" items={items} onChange={() => action('onChange')} />
      <Button label="Button" />
    </FieldGroup>
  );
}

export default createMetadata({
  title: 'Компоненты/Базовые/FieldGroup',
  id: 'components/FieldGroup',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=94253%3A165585',
    },
  },
});
