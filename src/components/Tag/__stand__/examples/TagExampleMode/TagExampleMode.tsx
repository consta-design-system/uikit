import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Tag } from '../../../Tag';

export const TagExampleMode = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Example>
      <Tag onClick={() => {}} mode="button" label="Button" />
      <Tag mode="link" label="Link" href="#" />
      <Tag
        mode="check"
        onChange={({ checked }) => setChecked(checked)}
        label="Check"
        checked={checked}
      />
      <Tag onCancel={() => {}} mode="cancel" label="Cancel" />
    </Example>
  );
};
