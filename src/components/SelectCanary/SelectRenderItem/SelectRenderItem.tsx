import { AtomMut } from '@reatom/framework';
import { useAtom } from '@reatom/npm-react';
import React from 'react';

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
) => React.ReactNode;

export const SelectRenderItem: SelectRenderItemComponent = (props) => {
  const {
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

  const [active] = useAtom((ctx) => {
    const value = ctx.spy(valueAtom);

    const getItemKey = ctx.get(getItemKeyAtom);

    return !!value.find(
      (valueItem) => getItemKey(valueItem) === getItemKey(item),
    );
  });

  const [hovered] = useAtom((ctx) => {
    const highlightedIndex = ctx.spy(highlightedIndexAtom);
    return index === highlightedIndex;
  });

  return (
    <>
      {renderItem({
        ref: rootRef,
        onClick,
        onMouseEnter,
        item,
        active,
        hovered,
      })}
    </>
  );
};
