import { useSelect } from '@consta/stand';
import React from 'react';

import { Button } from '../../Button/Button';
import { Select } from '../../Select/Select';
import { TextField } from '../../TextField/TextField';
import { items } from '../__mocks__/data.mock';
import { FieldGroup } from '../FieldGroup';

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

const Variants = () => {
  const form = useSelect('form', forms, 'default');
  const size = useSelect('size', sizes, 'm');

  return (
    <FieldGroup form={form} size={size}>
      <TextField placeholder="TextField" />
      <Select
        placeholder="Select"
        items={items}
        onChange={() => action('onChange')}
      />
      <Button label="Button" />
    </FieldGroup>
  );
};

export default Variants;
