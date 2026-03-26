import { AtomLike } from '@reatom/core';
import { useAtom } from '@reatom/react';
import React, { forwardRef } from 'react';

import { Checkbox } from '##/components/Checkbox';
import { FieldPropSize } from '##/components/FieldComponents';
import { ListItem } from '##/components/ListCanary';
import { Text, TextPropSize } from '##/components/Text';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { sizeCheckboxMap } from '../FlatSelectItem';

export type FlatFlatSelectItemAllProps = PropsWithHTMLAttributesAndRef<
  {
    size: FieldPropSize;
    hovered?: boolean;
    indent?: 'normal' | 'increased';
    groupsCounterAtom: AtomLike<Record<string, [number, number]>>;
    groupId: string | number;
    highlightedIndexAtom: AtomLike<number>;
    index: number;
    label: string;
    disabledAtom: AtomLike<boolean>;
  },
  HTMLDivElement
>;

export const cnFlatSelectItemAll = cn('FlatSelectItemAll');

const textSizeMap: Record<FieldPropSize, TextPropSize> = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'l',
};

const FlatSelectItemAllCounter: React.FC<{
  groupsCounterAtom: AtomLike<Record<string, [number, number]>>;
  groupId: string | number;
  size: FieldPropSize;
}> = ({ groupsCounterAtom, groupId, size }) => {
  const [total] = useAtom(
    () => groupsCounterAtom()[groupId]?.[1] || 0,
    [groupId],
  );
  const [selected] = useAtom(
    () => groupsCounterAtom()[groupId]?.[0] || 0,
    [groupId],
  );

  return (
    <Text
      size={textSizeMap[size]}
      lineHeight="xs"
      view="ghost"
    >{`${selected} из ${total}`}</Text>
  );
};

const FlatSelectItemAllCounterCheckbox: React.FC<{
  groupsCounterAtom: AtomLike<Record<string, [number, number]>>;
  disabledAtom: AtomLike<boolean>;
  groupId: string | number;
  size: FieldPropSize;
}> = ({ groupsCounterAtom, groupId, size, disabledAtom }) => {
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
  const [disabled] = useAtom(disabledAtom);

  return (
    <Checkbox
      checked={checked}
      intermediate={intermediate}
      size={sizeCheckboxMap[size]}
      tabIndex={-1}
      disabled={disabled}
    />
  );
};

export const FlatSelectItemAll: React.FC<FlatFlatSelectItemAllProps> =
  forwardRef((props, ref) => {
    const {
      size,
      className,
      groupsCounterAtom,
      groupId,
      highlightedIndexAtom,
      disabledAtom,
      index,
      label,
      ...otherProps
    } = props;

    const [hovered] = useAtom(() => highlightedIndexAtom() === index, [index]);
    const [disabled] = useAtom(disabledAtom);

    return (
      <ListItem
        {...otherProps}
        ref={ref}
        className={cnFlatSelectItemAll(null, [className])}
        role="option"
        label={label}
        size={size}
        active={hovered}
        disabled={disabled}
        rightSide={
          <FlatSelectItemAllCounter
            size={size}
            groupsCounterAtom={groupsCounterAtom}
            groupId={groupId}
          />
        }
        leftSide={
          <FlatSelectItemAllCounterCheckbox
            size={size}
            groupsCounterAtom={groupsCounterAtom}
            groupId={groupId}
            disabledAtom={disabledAtom}
          />
        }
      />
    );
  });
