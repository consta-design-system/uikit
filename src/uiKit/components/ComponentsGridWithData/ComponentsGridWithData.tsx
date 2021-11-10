import React from 'react';

import { ComponentsGrid } from '../ComponentsGrid/ComponentsGrid';

import NoImage from './data/images/NoImage';
import { additionalData, data, imageMap } from './data';

const getImage = (name: string) => imageMap[name] || NoImage;

const allData: typeof data = [...data, ...additionalData].map((group) => {
  return {
    title: group.title,
    items: group?.items?.map((item) => ({
      image: getImage(item.componentName || item.name),
      ...item,
    })),
  };
});

export const ComponentsGridWithData = () => {
  return <ComponentsGrid data={allData} />;
};
