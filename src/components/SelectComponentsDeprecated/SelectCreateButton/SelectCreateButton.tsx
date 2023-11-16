import './SelectCreateButton.css';

import React from 'react';

import { ListAddItem } from '##/components/ListCanary';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import { PropSize } from '../types';

type SelectCreateButtonProps = PropsWithHTMLAttributes<
  {
    labelForCreate?: string;
    inputValue?: string;
    active: boolean;
    hovered: boolean;
    size: PropSize;
    indent: 'normal' | 'increased';
  },
  HTMLDivElement
>;

export const cnSelectCreateButton = cn('SelectCreateButton');

export const SelectCreateButton: React.FC<SelectCreateButtonProps> = (
  props,
) => {
  const {
    className,
    labelForCreate,
    inputValue,
    active,
    hovered,
    size,
    indent,
    ...otherProps
  } = props;

  return (
    <ListAddItem
      {...otherProps}
      className={cnSelectCreateButton(null, [className])}
      aria-selected={active}
      role="option"
      active={hovered}
      size={size}
      innerOffset={indent}
      label={
        <>
          {labelForCreate} «<b>{inputValue}</b>»
        </>
      }
    />
  );
};
