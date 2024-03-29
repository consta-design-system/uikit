import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '../../../../Button/Button';
import { Select } from '../../../../SelectDeprecated/SelectDeprecated';
import { TextField } from '../../../../TextField/TextField';
import { items } from '../../../__mocks__/data.mock';
import { FieldGroup } from '../../../FieldGroup';

export const FieldGroupExampleForm = () => {
  return (
    <Example col={1}>
      <FieldGroup form="clearBrick">
        <TextField placeholder="TextField" />
        <Select
          placeholder="Select"
          items={items}
          onChange={() => {
            console.log('onChange');
          }}
        />
        <Button label="Button" />
      </FieldGroup>
    </Example>
  );
};
