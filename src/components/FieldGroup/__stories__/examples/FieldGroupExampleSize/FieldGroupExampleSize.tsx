import React from 'react';

import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Button } from '../../../../Button/Button';
import { Select } from '../../../../Select/Select';
import { TextField } from '../../../../TextField/TextField';
import { items } from '../../../__mocks__/data.mock';
import { FieldGroup } from '../../../FieldGroup';

const sizes = ['xs', 's', 'm', 'l'] as const;

export const FieldGroupExampleSize = () => {
  return (
    <>
      {sizes.map((item, index) => (
        <div key={index} className={cnDocsDecorator('Section')}>
          <FieldGroup size={item} className={cnMixSpace({ mB: 's' })}>
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
        </div>
      ))}
    </>
  );
};
