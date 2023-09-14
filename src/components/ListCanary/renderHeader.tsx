import React from 'react';

import { MixSpaceProps } from '##/mixs/MixSpace';

import { ListDivider } from './ListDivider';
import { ListGroupLabel } from './ListGroupLabel';
import { ListPropSize } from './types';

export const renderHeader = (
  label: string | undefined,
  first: boolean,
  size: ListPropSize,
  rightSide: React.ReactNode,
  labelSpace: MixSpaceProps | undefined,
  dividerSpase: MixSpaceProps | undefined,
  className: string | undefined,
): React.ReactNode | null => {
  if (label) {
    return (
      <ListGroupLabel
        size={size}
        label={label}
        rightSide={rightSide}
        space={labelSpace}
        className={className}
      />
    );
  }

  if (!label && !first) {
    return (
      <ListDivider size={size} space={dividerSpase} className={className} />
    );
  }

  return null;
};
