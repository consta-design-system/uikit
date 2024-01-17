import './SelectValueTag.css';

import React from 'react';

import { cnDeprecated } from '../../../utils/bem';
import { Tag } from '../../Tag/Tag';

type SelectValueTagProps = {
  label: string;
  size: 's' | 'm' | 'l' | 'xs';
  children?: never;
  disabled?: boolean;
  handleRemove?: (e: React.SyntheticEvent) => void;
};

export const cnSelectValueTag = cnDeprecated('SelectValueTag');

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
