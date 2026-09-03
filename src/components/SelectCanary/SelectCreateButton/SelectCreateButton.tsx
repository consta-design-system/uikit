import './SelectCreateButton.css';

import { AtomLike, computed } from '@reatom/core';
import React from 'react';

import { FieldPropSize } from '##/components/FieldComponents';
import { ListAddItem } from '##/components/ListCanary';
import { cnCanary as cn } from '##/utils/bem';
import { factoryComponent } from '##/utils/state';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { OptionForCreate } from '../types';

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
    getOptionActions(props: { index: number; item: OptionForCreate }): {
      onClick: (e: React.MouseEvent) => void;
      onMouseEnter: (e: React.MouseEvent) => void;
    };
    disabledAtom: AtomLike<boolean>;
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

export const SelectCreateButton = factoryComponent<
  HTMLDivElement,
  SelectCreateButtonProps
>(({ highlightedIndexAtom, inputValueAtom }, propsAtom) => {
  const hovered = computed(
    () => highlightedIndexAtom() === propsAtom().index,
    'hovered',
  );

  const labelForCreate = computed(() => {
    const inputValue = inputValueAtom();
    const labelForCreateProp =
      propsAtom().labelForCreate || labelForCreateDefault;
    return typeof labelForCreateProp === 'function'
      ? labelForCreateProp(inputValue)
      : labelForCreateProp;
  }, 'labelForCreate');

  return ({
    className,
    labelForCreate: labelForCreateProp = labelForCreateDefault,
    inputValueAtom,
    index,
    size,
    indent,
    highlightedIndexAtom,
    getOptionActions,
    ref,
    disabledAtom,
    ...otherProps
  }) => {
    return (
      <ListAddItem
        {...otherProps}
        {...getOptionActions({
          index,
          item: { label: '', __optionForCreate: true },
        })}
        ref={ref}
        className={cnSelectCreateButton(null, [className])}
        role="option"
        active={hovered()}
        size={size}
        innerOffset={indent}
        label={labelForCreate()}
        underLine
        disabled={disabledAtom()}
      />
    );
  };
});
