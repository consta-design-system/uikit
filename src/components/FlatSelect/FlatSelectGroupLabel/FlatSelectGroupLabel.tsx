import { PropsWithHTMLAttributesAndRef } from '@consta/uikit/__internal__/src/utils/types/PropsWithHTMLAttributes';
import { FieldPropSize } from '@consta/uikit/FieldComponents';
import { ListGroupLabel } from '@consta/uikit/ListCanary';
import React, { forwardRef } from 'react';

type SelectGroupLabelProps = PropsWithHTMLAttributesAndRef<
  {
    label: string;
    size: FieldPropSize;
    indent: 'normal' | 'increased';
  },
  HTMLDivElement
>;

export const FlatSelectGroupLabel: React.FC<SelectGroupLabelProps> = forwardRef(
  ({ indent, ...otherProps }, ref) => {
    return <ListGroupLabel {...otherProps} ref={ref} innerOffset={indent} />;
  },
);
