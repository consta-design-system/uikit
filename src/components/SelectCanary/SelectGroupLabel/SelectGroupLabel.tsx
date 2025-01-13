import React, { forwardRef } from 'react';

import { FieldPropSize } from '##/components/FieldComponents';
import { ListGroupLabel } from '##/components/ListCanary';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

type SelectGroupLabelProps = PropsWithHTMLAttributesAndRef<
  {
    label: string;
    size: FieldPropSize;
    indent: 'normal' | 'increased';
  },
  HTMLDivElement
>;

export const SelectGroupLabel: React.FC<SelectGroupLabelProps> = forwardRef(
  ({ indent, ...otherProps }, ref) => (
    <ListGroupLabel {...otherProps} ref={ref} innerOffset={indent} />
  ),
);
