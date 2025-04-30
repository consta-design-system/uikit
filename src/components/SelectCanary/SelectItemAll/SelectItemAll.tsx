import { AtomMut } from '@reatom/framework';
import { useAtom } from '@reatom/npm-react';
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
    groupsCounterAtom: AtomMut<Record<string, [number, number]>>;
    groupId: string | number;
    highlightedIndexAtom: AtomMut<number>;
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
  groupsCounterAtom: AtomMut<Record<string, [number, number]>>;
  groupId: string | number;
  size: FieldPropSize;
}> = ({ groupsCounterAtom, groupId, size }) => {
  const [total] = useAtom((ctx) => {
    const counter = ctx.spy(groupsCounterAtom);
    return counter[groupId]?.[1] || 0;
  });
  const [selected] = useAtom((ctx) => {
    const counter = ctx.spy(groupsCounterAtom);
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
  groupsCounterAtom: AtomMut<Record<string, [number, number]>>;
  groupId: string | number;
  size: FieldPropSize;
}> = ({ groupsCounterAtom, groupId, size }) => {
  const [checked] = useAtom((ctx) => {
    const counter = ctx.spy(groupsCounterAtom);
    if (counter[groupId] === undefined) {
      return false;
    }
    return counter[groupId][0] === counter[groupId][1];
  });
  const [intermediate] = useAtom((ctx) => {
    const counter = ctx.spy(groupsCounterAtom);
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

    const [hovered] = useAtom((ctx) => ctx.spy(highlightedIndexAtom) === index);

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
