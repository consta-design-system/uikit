import './SelectCreateButton.css';

import { AtomMut } from '@reatom/framework';
import { useAtom } from '@reatom/npm-react';
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
    inputValueAtom: AtomMut<string>;
    size: FieldPropSize;
    indent: 'normal' | 'increased';
    index: number;
    highlightIndex: (index: number) => void;
    highlightedIndexAtom: AtomMut<number>;
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
) => JSX.Element | null;

export const SelectCreateButton: SelectCreateButtonComponent = forwardRef(
  (props, ref) => {
    const {
      className,
      labelForCreate = labelForCreateDefault,
      inputValueAtom,
      index,
      size,
      indent,
      highlightedIndexAtom,
      highlightIndex,
      ...otherProps
    } = props;

    const [hovered] = useAtom((ctx) => {
      const highlightedIndex = ctx.spy(highlightedIndexAtom);
      return index === highlightedIndex;
    });

    const [inputValue] = useAtom(inputValueAtom);

    return (
      <ListAddItem
        {...otherProps}
        ref={ref}
        className={cnSelectCreateButton(null, [className])}
        role="option"
        active={hovered}
        size={size}
        innerOffset={indent}
        label={
          typeof labelForCreate === 'function'
            ? labelForCreate(inputValue)
            : labelForCreate
        }
        onMouseEnter={() => {
          highlightIndex(index);
        }}
        underLine
      />
    );
  },
);
