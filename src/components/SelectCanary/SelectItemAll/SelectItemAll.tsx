import { AtomLike } from '@reatom/core';
import { useAtom } from '@reatom/react';
import React, { forwardRef } from 'react';

import { Checkbox } from '##/components/Checkbox';
import { FieldPropSize } from '##/components/FieldComponents';
import { ListItem } from '##/components/ListCanary';
import { Text, TextPropSize } from '##/components/Text';
import { cnCanary as cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { sizeCheckboxMap } from '../SelectItem';

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
  },
  HTMLDivElement
>;

export const cnSelectItemAll = cn('SelectItemAll');

const textSizeMap: Record<FieldPropSize, TextPropSize> = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'l',
};

const SelectItemAllCounter: React.FC<{
  groupsCounterAtom: AtomLike<Record<string, [number, number]>>;
  groupId: string | number;
  size: FieldPropSize;
}> = ({ groupsCounterAtom, groupId, size }) => {
  const [total] = useAtom(() => {
    const counter = groupsCounterAtom();
    return counter[groupId]?.[1] || 0;
  });
  const [selected] = useAtom(() => {
    const counter = groupsCounterAtom();
    return counter[groupId]?.[0] || 0;
  });

  return (
    <Text
      size={textSizeMap[size]}
      lineHeight="xs"
      view="ghost"
    >{`${selected} из ${total}`}</Text>
  );
};

const SelectItemAllCounterCheckbox: React.FC<{
  groupsCounterAtom: AtomLike<Record<string, [number, number]>>;
  groupId: string | number;
  size: FieldPropSize;
}> = ({ groupsCounterAtom, groupId, size }) => {
  const [checked] = useAtom(() => {
    const counter = groupsCounterAtom();
    if (counter[groupId] === undefined) {
      return false;
    }
    return counter[groupId][0] === counter[groupId][1];
  });
  const [intermediate] = useAtom(() => {
    const counter = groupsCounterAtom();
    if (counter[groupId] === undefined) {
      return false;
    }
    return counter[groupId][0] > 0 && counter[groupId][0] < counter[groupId][1];
  });

  return (
    <Checkbox
      checked={checked}
      intermediate={intermediate}
      size={sizeCheckboxMap[size]}
    />
  );
};

export const SelectItemAll: React.FC<SelectItemAllProps> = forwardRef(
  (props, ref) => {
    const {
      size,
      indent,
      className,
      groupsCounterAtom,
      groupId,
      highlightedIndexAtom,
      index,
      label,
      ...otherProps
    } = props;

    const [hovered] = useAtom(() => highlightedIndexAtom() === index, [index]);

    return (
      <ListItem
        {...otherProps}
        ref={ref}
        className={cnSelectItemAll(null, [className])}
        role="option"
        label={label}
        innerOffset={indent}
        size={size}
        active={hovered}
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
            groupId={groupId}
          />
        }
      />
    );
  },
);
