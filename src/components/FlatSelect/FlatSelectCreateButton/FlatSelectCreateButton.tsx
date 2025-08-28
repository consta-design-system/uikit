import './FlatSelectCreateButton.css';

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

type FlatSelectCreateButtonProps = PropsWithHTMLAttributesAndRef<
  {
    labelForCreate?: LabelForCreate;
    inputValueAtom: AtomMut<string>;
    size: FieldPropSize;
    indent: 'normal' | 'increased';
    index: number;
    highlightedIndexAtom: AtomMut<number>;
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
      indent,
      highlightedIndexAtom,
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
        className={cnFlatSelectCreateButton(null, [className])}
        role="option"
        active={hovered}
        size={size}
        innerOffset={indent}
        label={
          typeof labelForCreate === 'function'
            ? labelForCreate(inputValue)
            : labelForCreate
        }
        underLine
      />
    );
  });
