import './List.variants.css';

import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { List, ListAddItem, ListBox, ListLoader } from '..';
import { basicItems, groups } from '../__mocks__/mock.data';
import {
  defaultListPropInnerOffset,
  defaultListPropSize,
  ListPropForm,
  listPropInnerOffset,
  listPropSize,
} from '../types';

const cnListVariant = cn('ListVariant');

const getUndefined = () => undefined;

const conditionalGetter = (conditional: boolean) =>
  conditional ? undefined : getUndefined;

const Box: React.FC<{
  withListBox?: boolean;
  children?: React.ReactNode;
  form?: ListPropForm;
}> = ({ withListBox, children, form = 'default' }) => {
  if (withListBox) {
    return (
      <ListBox className={cnListVariant()} form={form} border shadow>
        {children}
      </ListBox>
    );
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <div className={cnListVariant()}>{children}</div>;
};

const Variants = () => {
  const size = useSelect('size', listPropSize, defaultListPropSize);
  const withListBox = useBoolean('withListBox', false);
  const innerOffset = useSelect(
    'innerOffset',
    listPropInnerOffset,
    defaultListPropInnerOffset,
  );
  const isInteractive = useBoolean('isInteractive', true);
  const form = useSelect('form', ['default', 'brick', 'round'], undefined);
  const withGroups = useBoolean('withGroups', false);
  const groupsWithLabel = useBoolean('groupsWithLabel', true, withGroups);
  const disabled = useBoolean('disabled', false);
  const withLeftSide = useBoolean('withLeftSide', false);
  const withLeftIcon = useBoolean('withLeftIcon', false);
  const withRightSide = useBoolean('withRightSide', false);
  const withRightIcon = useBoolean('withRightIcon', false);
  const withDisabledItems = useBoolean('withDisabledItems', false);
  const withLoader = useBoolean('withLoader', false);
  const withListAddItem = useBoolean('withListAddItem', false);

  return (
    <Box withListBox={withListBox} form={form}>
      {withListAddItem && (
        <ListAddItem
          label="Добавить"
          size={size}
          innerOffset={innerOffset}
          underLine
          onClick={() => alert('Добавить')}
        />
      )}
      <List
        disabled={disabled}
        size={size}
        items={basicItems}
        onItemClick={isInteractive ? (item) => alert(item.label) : undefined}
        groups={withGroups ? groups : undefined}
        getItemGroupKey={conditionalGetter(withGroups)}
        getGroupLabel={conditionalGetter(groupsWithLabel)}
        getItemDisabled={conditionalGetter(withDisabledItems)}
        getItemLeftIcon={conditionalGetter(withLeftIcon)}
        getItemLeftSide={conditionalGetter(withLeftSide)}
        getItemRightIcon={conditionalGetter(withRightIcon)}
        getItemRightSide={conditionalGetter(withRightSide)}
        innerOffset={innerOffset}
      />
      {withLoader && <ListLoader size={size} innerOffset={innerOffset} />}
    </Box>
  );
};

export default Variants;
