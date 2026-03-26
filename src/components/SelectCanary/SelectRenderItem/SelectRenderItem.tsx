import { AtomLike, computed, peek } from '@reatom/core';
import React from 'react';

import { factoryComponent } from '##/utils/state';

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
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  renderItem: (props: RenderItemProps<ITEM>) => React.ReactNode | null;
  highlightedIndexAtom: AtomLike<number>;
  index: number;
  valueAtom: AtomLike<ITEM[]>;
  getItemKeyAtom: AtomLike<(item: ITEM) => string | number>;
  ref: React.Ref<HTMLDivElement>;
};

type SelectRenderItemComponent = <ITEM>(
  props: SelectRenderItemProps<ITEM>,
) => React.ReactNode;

export const SelectRenderItem = factoryComponent<
  HTMLDivElement,
  SelectRenderItemProps<unknown>
>(({ highlightedIndexAtom, valueAtom, getItemKeyAtom }, propsAtom) => {
  const active = computed(() => {
    const getItemKey = peek(() => getItemKeyAtom());

    return !!valueAtom().find(
      (valueItem) => getItemKey(valueItem) === getItemKey(propsAtom().item),
    );
  });

  const hovered = computed(() => highlightedIndexAtom() === propsAtom().index);

  return ({ renderItem, item, ref, onClick, onMouseEnter }) =>
    renderItem({
      ref,
      onClick,
      onMouseEnter,
      item,
      active: active(),
      hovered: hovered(),
    });
}) as SelectRenderItemComponent;
