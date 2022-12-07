import { useBoolean, useSelect } from '@consta/stand';
import React, { useState } from 'react';

import { basicItems, groups } from '../__mocks__/mock.data';
import { List } from '../ListCanary';
import {
  DefaultListItem,
  defaultListPropForm,
  defaultListPropSize,
  listPropForm,
  listPropSize,
} from '../types';

const Variants = () => {
  const form = useSelect('form', listPropForm, defaultListPropForm);
  const size = useSelect('size', listPropSize, defaultListPropSize);
  const withGroups = useBoolean('withGroups', false);
  const multiple = useBoolean('multiple', false);
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

  const [value, setValue] = useState<DefaultListItem | undefined | null>();
  const [multipleValue, setMultipleValue] = useState<DefaultListItem[] | null>(
    [],
  );

  if (multiple) {
    return (
      <List
        form={form}
        disabled={disabled}
        value={multipleValue}
        isLoading={isLoading}
        onChange={({ value }) => setMultipleValue(value)}
        size={size}
        multiple
        items={basicItems}
        groups={withGroups ? groups : undefined}
        getItemDisabled={getItemDisabled}
        getItemLeftIcon={getItemLeftIcon}
        getItemLeftSide={getItemLeftSide}
        getItemRightIcon={getItemRightIcon}
        getItemRightSide={getItemRightSide}
      />
    );
  }

  return (
    <List
      form={form}
      disabled={disabled}
      value={value}
      isLoading={isLoading}
      onChange={({ value }) => setValue(value)}
      size={size}
      items={basicItems}
      groups={withGroups ? groups : undefined}
      getItemDisabled={getItemDisabled}
      getItemLeftIcon={getItemLeftIcon}
      getItemLeftSide={getItemLeftSide}
      getItemRightIcon={getItemRightIcon}
      getItemRightSide={getItemRightSide}
    />
  );
};

export default Variants;
