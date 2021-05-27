import './SelectCreateButton.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
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

const cnSelectCreateButton = cn('SelectCreateButton');

export const SelectCreateButton: React.FC<SelectCreateButtonProps> = (props) => {
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
    <div
      {...otherProps}
      className={cnSelectCreateButton({ active, hovered, size, indent }, [className])}
      aria-selected={active}
      role="option"
    >
      {labelForCreate} «<b>{inputValue}</b>»
    </div>
  );
};
