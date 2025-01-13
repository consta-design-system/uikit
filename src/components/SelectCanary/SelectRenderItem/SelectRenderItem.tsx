import { AtomMut } from '@reatom/framework';
import { reatomComponent } from '@reatom/npm-react';
import React from 'react';

import { useCreateAtom } from '##/utils/state/useCreateAtom';

type RenderItemProps<ITEM> = {
  item: ITEM;
  active: boolean;
  hovered: boolean;
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  ref: React.Ref<HTMLDivElement>;
};

type SelectRenderItemProps<ITEM> = {
  item: ITEM;
  rootRef: React.Ref<HTMLDivElement>;
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  renderItem: (props: RenderItemProps<ITEM>) => React.ReactNode | null;
  highlightedIndexAtom: AtomMut<number>;
  index: number;
  valueAtom: AtomMut<ITEM[]>;
  getItemKeyAtom: AtomMut<(item: ITEM) => string | number>;
};

type SelectRenderItemComponent = <ITEM>(
  props: SelectRenderItemProps<ITEM>,
) => JSX.Element;

export const SelectRenderItem: SelectRenderItemComponent = reatomComponent(
  (props) => {
    const {
      ctx,
      renderItem,
      item,
      rootRef,
      onClick,
      onMouseEnter,
      highlightedIndexAtom,
      index,
      valueAtom,
      getItemKeyAtom,
    } = props;

    const hoveredAtom = useCreateAtom((ctx) => {
      const highlightedIndex = ctx.spy(highlightedIndexAtom);
      return index === highlightedIndex;
    });

    const activeAtom = useCreateAtom((ctx) => {
      const value = ctx.spy(valueAtom);
      const getItemKey = ctx.get(getItemKeyAtom);

      return !!value.find(
        (valueItem) => getItemKey(valueItem) === getItemKey(item),
      );
    });

    return (
      <>
        {renderItem({
          ref: rootRef,
          onClick,
          onMouseEnter,
          item,
          active: ctx.spy(activeAtom),
          hovered: ctx.spy(hoveredAtom),
        })}
      </>
    );
  },
);
