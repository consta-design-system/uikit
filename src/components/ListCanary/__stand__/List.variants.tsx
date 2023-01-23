import './List.variants.css';

import { useBoolean, useSelect } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { basicItems, groups } from '../__mocks__/mock.data';
import { List } from '../ListCanary';
import {
  defaultListPropIndent,
  defaultListPropSize,
  listPropIndent,
  listPropSize,
} from '../types';

const cnListVariant = cn('ListVariant');

const getUndefined = () => undefined;

const conditionalGetter = (conditional: boolean) =>
  conditional ? undefined : getUndefined;

const Variants = () => {
  const size = useSelect('size', listPropSize, defaultListPropSize);
  const indent = useSelect('indent', listPropIndent, defaultListPropIndent);
  const isInteractive = useBoolean('isInteractive', true);
  const withGroups = useBoolean('withGroups', false);
  const groupsWithLabel = useBoolean('groupsWithLabel', true, withGroups);
  const disabled = useBoolean('disabled', false);
  const withLeftSide = useBoolean('withLeftSide', false);
  const withLeftIcon = useBoolean('withLeftIcon', false);
  const withRightSide = useBoolean('withRightSide', false);
  const withRightIcon = useBoolean('withRightIcon', false);
  const withDisabledItems = useBoolean('withDisabledItems', false);

  return (
    <div className={cnListVariant()}>
      <List
        disabled={disabled}
        size={size}
        items={basicItems}
        onItemClick={
          isInteractive ? (item) => console.log(item.label) : undefined
        }
        groups={withGroups ? groups : undefined}
        getItemGroupKey={conditionalGetter(withGroups)}
        getGroupLabel={conditionalGetter(groupsWithLabel)}
        getItemDisabled={conditionalGetter(withDisabledItems)}
        getItemLeftIcon={conditionalGetter(withLeftIcon)}
        getItemLeftSide={conditionalGetter(withLeftSide)}
        getItemRightIcon={conditionalGetter(withRightIcon)}
        getItemRightSide={conditionalGetter(withRightSide)}
        indent={indent}
      />
    </div>
  );
};

export default Variants;
