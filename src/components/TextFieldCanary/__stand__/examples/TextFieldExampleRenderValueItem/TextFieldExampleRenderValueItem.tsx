import './TextFieldExampleRenderValueItem.css';

import { IconRecord } from '@consta/icons/IconRecord';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Tag } from '##/components/Tag';
import { cn } from '##/utils/bem';

import { TextField, TextFieldPropRenderValueItem } from '../../..';

const cnTextFieldExampleRenderValueItem = cn('TextFieldExampleRenderValueItem');

const RenderValueItem: TextFieldPropRenderValueItem = ({
  item,
  index,
  disabled,
  onRemove,
  size,
}) => (
  <Tag
    icon={IconRecord}
    key={index}
    mode="cancel"
    className={cnTextFieldExampleRenderValueItem({ disabled })}
    label={item}
    onCancel={onRemove}
    size={size}
    cancelButtonTabIndex={-1}
  />
);

export const TextFieldExampleRenderValueItem = () => {
  const [value, setValue] = useState<string[] | null>(null);

  return (
    <Example col={1}>
      <TextField
        value={value}
        onChange={setValue}
        type="textarray"
        withClearButton
        renderValueItem={RenderValueItem}
      />
    </Example>
  );
};
