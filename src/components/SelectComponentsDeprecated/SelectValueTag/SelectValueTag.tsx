import './SelectValueTag.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { Tag } from '../../Tag/Tag';

type SelectValueTagProps = {
  label: string;
  handleRemove: (e: React.SyntheticEvent) => void;
  size: 's' | 'm' | 'l';
  disabled: boolean;
  children?: never;
};

const cnSelectValueTag = cn('SelectValueTagDeprecated');

export const SelectValueTag: React.FC<SelectValueTagProps> = (props) => {
  const { handleRemove, disabled, size, ...otherProps } = props;

  return disabled ? (
    <Tag {...otherProps} className={cnSelectValueTag({ size, disabled })} size={size} mode="info" />
  ) : (
    <Tag
      {...otherProps}
      className={cnSelectValueTag({ size })}
      mode="cancel"
      onCancel={handleRemove}
      size={size}
    />
  );
};
