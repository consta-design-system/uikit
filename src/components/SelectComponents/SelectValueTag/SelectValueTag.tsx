import './SelectValueTag.css';

import React from 'react';

import { Tag } from '##/components/Tag';
import { cn } from '##/utils/bem';

type SelectValueTagProps = {
  label: string;
  size: 's' | 'm' | 'l' | 'xs';
  children?: never;
  disabled?: boolean;
  handleRemove?: (e: React.SyntheticEvent) => void;
};

export const cnSelectValueTag = cn('SelectValueTag');

export const SelectValueTag: React.FC<SelectValueTagProps> = (props) => {
  const { handleRemove = () => {}, size, label, disabled } = props;

  return (
    <Tag
      className={cnSelectValueTag({ size, disabled })}
      label={label}
      mode="cancel"
      onCancel={handleRemove}
      size={size}
    />
  );
};
