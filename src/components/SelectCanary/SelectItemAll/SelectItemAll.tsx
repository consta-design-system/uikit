import { action, Atom, AtomLike, computed, wrap } from '@reatom/core';
import React, { memo } from 'react';

import { Checkbox } from '##/components/Checkbox';
import { FieldPropSize } from '##/components/FieldComponents';
import { ListItem } from '##/components/ListCanary';
import { Text, TextPropSize } from '##/components/Text';
import { cnCanary as cn } from '##/utils/bem';
import { setRefs } from '##/utils/setRef';
import { factoryComponent } from '##/utils/state';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { sizeCheckboxMap } from '../SelectItem';
import { SelectAllItem } from '../types';

export type SelectItemAllProps = PropsWithHTMLAttributesAndRef<
  {
    size: FieldPropSize;
    hovered?: boolean;
    indent?: 'normal' | 'increased';
    groupsCounterAtom: AtomLike<Record<string, [number, number]>>;
    groupId: string | number;
    highlightedIndexAtom: AtomLike<number>;
    index: number;
    label: string;
    getOptionActions(props: { index: number; item: SelectAllItem }): {
      onClick: (e: React.MouseEvent) => void;
      onMouseEnter: (e: React.MouseEvent) => void;
    };
    getItemRef: (index: number) => React.Ref<HTMLDivElement>;
    virtualIndex: number;
    listElementsAtom: AtomLike<Atom<HTMLDivElement | null>[]>;
    disabledAtom: AtomLike<boolean>;
  },
  HTMLDivElement
>;

export const componentName = 'SelectItemAll';
export const cnSelectItemAll = cn(componentName);

const textSizeMap: Record<FieldPropSize, TextPropSize> = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'l',
};

const SelectItemAllCounter = memo(
  factoryComponent<
    HTMLDivElement,
    {
      groupsCounterAtom: AtomLike<Record<string, [number, number]>>;
      groupId: string | number;
      size: FieldPropSize;
    }
  >(({ groupsCounterAtom, groupId }) => {
    const total = computed(() => groupsCounterAtom()[groupId]?.[1] || 0);
    const selected = computed(() => groupsCounterAtom()[groupId]?.[0] || 0);
    return ({ size, ref }) => {
      return (
        <Text
          ref={ref}
          size={textSizeMap[size]}
          lineHeight="xs"
          view="ghost"
        >{`${selected()} из ${total()}`}</Text>
      );
    };
  }),
);

const SelectItemAllCounterCheckbox = memo(
  factoryComponent<
    HTMLLabelElement,
    {
      groupsCounterAtom: AtomLike<Record<string, [number, number]>>;
      groupId: string | number;
      size: FieldPropSize;
      disabledAtom: AtomLike<boolean>;
    }
  >(({ groupsCounterAtom, groupId, disabledAtom }) => {
    const checked = computed(() => {
      const counter = groupsCounterAtom();
      if (counter[groupId] === undefined) {
        return false;
      }
      return counter[groupId][0] === counter[groupId][1];
    });
    const intermediate = computed(() => {
      const counter = groupsCounterAtom();
      if (counter[groupId] === undefined) {
        return false;
      }
      return (
        counter[groupId][0] > 0 && counter[groupId][0] < counter[groupId][1]
      );
    });
    return ({ size, ref }) => {
      return (
        <Checkbox
          ref={ref}
          checked={checked()}
          intermediate={intermediate()}
          size={sizeCheckboxMap[size]}
          disabled={disabledAtom()}
        />
      );
    };
  }),
);

export const SelectItemAll = factoryComponent<
  HTMLDivElement,
  SelectItemAllProps
>(({ highlightedIndexAtom, listElementsAtom }, propsAtom) => {
  const hovered = computed(() => highlightedIndexAtom() === propsAtom().index);
  const ref = action((el: HTMLDivElement | null) =>
    setRefs(
      [
        propsAtom().ref,
        listElementsAtom()[propsAtom().virtualIndex]?.set,
        propsAtom().getItemRef(propsAtom().index),
      ],
      el,
    ),
  );

  return ({
    size,
    indent,
    className,
    groupsCounterAtom,
    groupId,
    highlightedIndexAtom,
    index,
    getOptionActions,
    listElementsAtom,
    virtualIndex,
    getItemRef,
    disabledAtom,
    ...otherProps
  }) => {
    return (
      <ListItem
        {...otherProps}
        {...getOptionActions({
          index,
          item: { __optionSelectAll: true, groupKey: groupId },
        })}
        ref={wrap(ref)}
        className={cnSelectItemAll(null, [className])}
        role="option"
        innerOffset={indent}
        size={size}
        active={hovered()}
        rightSide={
          <SelectItemAllCounter
            size={size}
            groupsCounterAtom={groupsCounterAtom}
            groupId={groupId}
          />
        }
        leftSide={
          <SelectItemAllCounterCheckbox
            size={size}
            groupsCounterAtom={groupsCounterAtom}
            disabledAtom={disabledAtom}
            groupId={groupId}
          />
        }
        disabled={disabledAtom()}
      />
    );
  };
}, componentName);
