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
  rootRef: React.Ref<HTMLDivElement>;
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  renderItem: AtomLike<
    (props: RenderItemProps<ITEM>) => React.ReactNode | null
  >;
  highlightedIndexAtom: AtomLike<number>;
  index: number;
  valueAtom: AtomLike<ITEM[]>;
  getItemKeyAtom: AtomLike<(item: ITEM) => string | number>;
};

type SelectRenderItemComponent = <ITEM>(
  props: SelectRenderItemProps<ITEM>,
) => React.ReactNode;

export const FlatSelectRenderItem: SelectRenderItemComponent = factoryComponent(
  <ITEM,>(
    initProps: SelectRenderItemProps<ITEM>,
    propsAtom: AtomLike<SelectRenderItemProps<ITEM>>,
  ) => {
    const { highlightedIndexAtom, valueAtom, getItemKeyAtom } = initProps;

    const active = computed(() => {
      const value = valueAtom();
      const { item } = propsAtom();

      const getItemKey = peek(getItemKeyAtom);

      return !!value.find(
        (valueItem) => getItemKey(valueItem) === getItemKey(item),
      );
    });

    const hovered = computed(
      () => highlightedIndexAtom() === propsAtom().index,
    );

    return ({ renderItem, item, rootRef, onClick, onMouseEnter }) => {
      return peek(renderItem)({
        ref: rootRef,
        onClick,
        onMouseEnter,
        item,
        active: active(),
        hovered: hovered(),
      });
    };
  },
);
