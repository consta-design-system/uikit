import './SelectCreateButton.css';

import { AtomLike } from '@reatom/core';
import { useAtom } from '@reatom/react';
import React, { forwardRef } from 'react';

import { FieldPropSize } from '##/components/FieldComponents';
import { ListAddItem } from '##/components/ListCanary';
import { cnCanary as cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

type LabelForCreate =
  | ((label: string | undefined) => React.ReactNode)
  | React.ReactNode;

type SelectCreateButtonProps = PropsWithHTMLAttributesAndRef<
  {
    labelForCreate?: LabelForCreate;
    inputValueAtom: AtomLike<string>;
    size: FieldPropSize;
    indent: 'normal' | 'increased';
    index: number;
    highlightedIndexAtom: AtomLike<number>;
  },
  HTMLDivElement
>;

export const cnSelectCreateButton = cn('SelectCreateButton');

const labelForCreateDefault: LabelForCreate = (label) => (
  <span className={cnSelectCreateButton('CreateLabel')}>
    {label ? (
      <>
        Добавить <b>«{label}»</b>
      </>
    ) : (
      'Добавить элемент'
    )}
  </span>
);

type SelectCreateButtonComponent = (
  props: SelectCreateButtonProps,
) => React.ReactNode | null;

export const SelectCreateButton: SelectCreateButtonComponent = forwardRef(
  (props, ref) => {
    const {
      className,
      labelForCreate: labelForCreateProp = labelForCreateDefault,
      inputValueAtom,
      index,
      size,
      indent,
      highlightedIndexAtom,
      ...otherProps
    } = props;

    const [hovered] = useAtom(() => highlightedIndexAtom() === index);

    const [labelForCreate] = useAtom(() => {
      const inputValue = inputValueAtom();
      return typeof labelForCreateProp === 'function'
        ? labelForCreateProp(inputValue)
        : labelForCreateProp;
    }, [labelForCreateProp]);

    return (
      <ListAddItem
        {...otherProps}
        ref={ref}
        className={cnSelectCreateButton(null, [className])}
        role="option"
        active={hovered}
        size={size}
        innerOffset={indent}
        label={labelForCreate}
        underLine
      />
    );
  },
);
