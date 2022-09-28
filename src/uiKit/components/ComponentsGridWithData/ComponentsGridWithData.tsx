import React from 'react';

import { ComponentsGrid } from '../ComponentsGrid/ComponentsGrid';
import { additionalData, data, imageMap } from './data';
import NoImage from './data/images/NoImage';
import { Data, DataItem } from './data/types';

const getImage = (name: string) => imageMap[name] || NoImage;

const sort = (a: DataItem, b: DataItem) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
};

const allData: Data = [...data, ...additionalData].map((group) => {
  return {
    title: group.title,
    items: group?.items
      ?.map((item) => ({
        image: getImage(item.componentName || item.name),
        ...item,
      }))
      .sort(sort),
  };
});

export const ComponentsGridWithData = () => {
  return <ComponentsGrid data={allData} />;
};
