import './List.variants.css';

import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { basicItems, groups } from '../__mocks__/mock.data';
import { List } from '../ListCanary';
import { defaultListPropSize, listPropSize } from '../types';

const cnListVariant = cn('ListVariant');

const getUndefined = () => undefined;

const conditionalGetter = (conditional: boolean) =>
  conditional ? undefined : getUndefined;

const Variants = () => {
  const size = useSelect('size', listPropSize, defaultListPropSize);
  const withGroups = useBoolean('withGroups', false);
  const groupsWithLabel = useBoolean('groupsWithLabel', true, withGroups);
  const disabled = useBoolean('disabled', false);
  const isLoading = useBoolean('isLoading', false);
  const withLeftSide = useBoolean('withLeftSide', false);
  const withLeftIcon = useBoolean('withLeftIcon', false);
  const withRightSide = useBoolean('withRightSide', false);
  const withRightIcon = useBoolean('withRightIcon', false);
  const withDisabledItems = useBoolean('withDisabledItems', false);

  return (
    <div className={cnListVariant()}>
      <List
        disabled={disabled}
        isLoading={isLoading}
        size={size}
        items={basicItems}
        onItemClick={({ item }) => console.log(item.label)}
        groups={withGroups ? groups : undefined}
        getItemGroupKey={conditionalGetter(withGroups)}
        getGroupLabel={conditionalGetter(groupsWithLabel)}
        getItemDisabled={conditionalGetter(withDisabledItems)}
        getItemLeftIcon={conditionalGetter(withLeftIcon)}
        getItemLeftSide={conditionalGetter(withLeftSide)}
        getItemRightIcon={conditionalGetter(withRightIcon)}
        getItemRightSide={conditionalGetter(withRightSide)}
      />
    </div>
  );
};

export default Variants;
