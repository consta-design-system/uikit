import React from 'react';

import { ListGroupLabel } from '##/components/ListCanary';

import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { PropSize } from '../types';

type SelectGroupLabelProps = PropsWithHTMLAttributes<
  {
    label: string;
    size: PropSize;
    indent: 'normal' | 'increased';
  },
  HTMLDivElement
>;

export const SelectGroupLabel: React.FC<SelectGroupLabelProps> = (props) => {
  const { indent, ...otherProps } = props;

  return <ListGroupLabel {...otherProps} innerOffset={indent} />;
};
