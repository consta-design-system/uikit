import './FlatSelectCreateButton.css';

import { AtomLike } from '@reatom/core';
import { useAtom } from '@reatom/react';
import React, { forwardRef } from 'react';

import { FieldPropSize } from '##/components/FieldComponents';
import { ListAddItem } from '##/components/ListCanary';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

type LabelForCreate =
  | ((label: string | undefined) => React.ReactNode)
  | React.ReactNode;

type FlatSelectCreateButtonProps = PropsWithHTMLAttributesAndRef<
  {
    labelForCreate?: LabelForCreate;
    inputValueAtom: AtomLike<string>;
    size: FieldPropSize;
    indent: 'normal' | 'increased';
    index: number;
    highlightedIndexAtom: AtomLike<number>;
    disabledAtom: AtomLike<boolean>;
  },
  HTMLDivElement
>;

export const cnFlatSelectCreateButton = cn('FlatSelectCreateButton');

const labelForCreateDefault: LabelForCreate = (label) => (
  <span className={cnFlatSelectCreateButton('CreateLabel')}>
    {label ? (
      <>
        Добавить <b>«{label}»</b>
      </>
    ) : (
      'Добавить элемент'
    )}
  </span>
);

type FlatSelectCreateButtonComponent = (
  props: FlatSelectCreateButtonProps,
) => React.ReactNode | null;

export const FlatSelectCreateButton: FlatSelectCreateButtonComponent =
  forwardRef((props, ref) => {
    const {
      className,
      labelForCreate = labelForCreateDefault,
      inputValueAtom,
      index,
      size,

      highlightedIndexAtom,
      disabledAtom,
      ...otherProps
    } = props;

    const [active] = useAtom(() => {
      const highlightedIndex = highlightedIndexAtom();
      const disabled = disabledAtom();
      if (disabled) {
        return false;
      }
      return index === highlightedIndex;
    }, [index]);

    const [inputValue] = useAtom(inputValueAtom);
    const [disabled] = useAtom(disabledAtom);

    return (
      <ListAddItem
        {...otherProps}
        ref={ref}
        className={cnFlatSelectCreateButton(null, [className])}
        role="option"
        active={active}
        size={size}
        disabled={disabled}
        label={
          typeof labelForCreate === 'function'
            ? labelForCreate(inputValue)
            : labelForCreate
        }
        underLine
      />
    );
  });
