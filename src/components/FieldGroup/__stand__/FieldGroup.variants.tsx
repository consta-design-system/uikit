import './FieldGroup.variants.css';

import { useSelect } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

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

const cnFieldGroupVariants = cn('FieldGroupVariants');

const Variants = () => {
  const form = useSelect('form', forms, 'default');
  const size = useSelect('size', sizes, 'm');

  return (
    <FieldGroup className={cnFieldGroupVariants()} form={form} size={size}>
      <TextField placeholder="TextField" />
      <Select
        placeholder="Select"
        items={items}
        onChange={() => console.log('onChange')}
      />
      <Button label="Button" />
    </FieldGroup>
  );
};

export default Variants;
