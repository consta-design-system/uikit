import './SelectValueTag.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { Tag } from '../../Tag/Tag';

type SelectValueTagProps = {
  label: string;
  size: 's' | 'm' | 'l';
  children?: never;
  handleRemove?: (e: React.SyntheticEvent) => void;
};

export const cnSelectValueTag = cn('SelectValueTag');

export const SelectValueTag: React.FC<SelectValueTagProps> = (props) => {
  const { handleRemove, size, label } = props;

  return handleRemove ? (
    <Tag
      className={cnSelectValueTag({ size })}
      label={label}
      mode="cancel"
      onCancel={handleRemove}
      size={size}
    />
  ) : (
    <Tag
      className={cnSelectValueTag({ size, disabled: true })}
      label={label}
      size={size}
      mode="info"
    />
  );
};
