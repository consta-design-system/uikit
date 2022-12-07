import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '../../../../Button/Button';
import { Select } from '../../../../Select/Select';
import { TextField } from '../../../../TextField/TextField';
import { items } from '../../../__mocks__/data.mock';
import { FieldGroup } from '../../../FieldGroup';

const sizes = ['xs', 's', 'm', 'l'] as const;

export const FieldGroupExampleSize = () => {
  return (
    <Example col={1}>
      {sizes.map((item) => (
        <FieldGroup key={item} size={item}>
          <TextField placeholder={item} />
          <Select
            placeholder="Select"
            items={items}
            onChange={() => {
              console.log('onChange');
            }}
          />
          <Button label="Button" />
        </FieldGroup>
      ))}
    </Example>
  );
};
