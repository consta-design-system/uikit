import './List.variants.css';

import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { basicItems, groups } from '../__mocks__/mock.data';
import { List } from '../ListCanary';
import { DefaultListItem, defaultListPropSize, listPropSize } from '../types';

const cnListVariant = cn('ListVariant');

const Variants = () => {
  const size = useSelect('size', listPropSize, defaultListPropSize);
  const withGroups = useBoolean('withGroups', false);
  const disabled = useBoolean('disabled', false);
  const isLoading = useBoolean('isLoading', false);
  const withLeftSide = useBoolean('withLeftSide', false);
  const withLeftIcon = useBoolean('withLeftIcon', false);
  const withRightSide = useBoolean('withRightSide', false);
  const withRightIcon = useBoolean('withRightIcon', false);
  const withDisabledItems = useBoolean('withDisabledItems', false);

  const getItemLeftIcon = (item: DefaultListItem) => {
    return withLeftIcon ? item.leftIcon : undefined;
  };

  const getItemLeftSide = (item: DefaultListItem) => {
    return withLeftSide ? item.leftSide : undefined;
  };

  const getItemRightIcon = (item: DefaultListItem) => {
    return withRightIcon ? item.rightIcon : undefined;
  };

  const getItemRightSide = (item: DefaultListItem) => {
    return withRightSide ? item.rightSide : undefined;
  };

  const getItemDisabled = (item: DefaultListItem) => {
    return withDisabledItems ? item.disabled : undefined;
  };

  return (
    <div className={cnListVariant()}>
      <List
        disabled={disabled}
        isLoading={isLoading}
        size={size}
        items={basicItems}
        onItemClick={({ item }) => console.log(item.label)}
        groups={withGroups ? groups : undefined}
        getItemDisabled={getItemDisabled}
        getItemLeftIcon={getItemLeftIcon}
        getItemLeftSide={getItemLeftSide}
        getItemRightIcon={getItemRightIcon}
        getItemRightSide={getItemRightSide}
      />
    </div>
  );
};

export default Variants;
