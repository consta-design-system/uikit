import { useSelect } from '@consta/stand';
import React from 'react';

import { ChipsChoiceVariants } from './variants/ChipsChoiceVariants';
import { ChipsItemVariant } from './variants/ChipsItemVariant';
import { ChipsVariants } from './variants/ChipsVariants';

const componentsMap = {
  ChipsChoice: ChipsChoiceVariants,
  Chips: ChipsVariants,
  ChipsItem: ChipsItemVariant,
} as const;

const componentsVariants = Object.keys(
  componentsMap,
) as (keyof typeof componentsMap)[];

const Variants = () => {
  const stand =
    useSelect('component', componentsVariants, componentsVariants[0]) ||
    componentsVariants[0];

  const Component = componentsMap[stand];

  return <Component />;
};

export default Variants;
