import './SelectCreateButton.css';

import React, { forwardRef } from 'react';

import { ListAddItem } from '##/components/ListCanary';
import { cnCanary } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { PropSize } from '../types';

type SelectCreateButtonProps = PropsWithHTMLAttributesAndRef<
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

export const cnSelectCreateButton = cnCanary('SelectCreateButton');

export const SelectCreateButton: React.FC<SelectCreateButtonProps> = forwardRef(
  (props, ref) => {
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
        ref={ref}
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
  },
);
