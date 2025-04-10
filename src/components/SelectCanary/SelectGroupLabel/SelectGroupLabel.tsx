import { AtomMut } from '@reatom/framework';
import { useAtom } from '@reatom/npm-react';
import React, { forwardRef } from 'react';

import { FieldPropSize } from '##/components/FieldComponents';
import { ListGroupLabel } from '##/components/ListCanary';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

type SelectGroupLabelProps = PropsWithHTMLAttributesAndRef<
  {
    label: string;
    size: FieldPropSize;
    indent: 'normal' | 'increased';
    groupsCounterAtom: AtomMut<Record<string, [number, number]>>;
  },
  HTMLDivElement
>;

export const SelectGroupLabel: React.FC<SelectGroupLabelProps> = forwardRef(
  ({ indent, groupsCounterAtom, ...otherProps }, ref) => {
    const [couter] = useAtom(groupsCounterAtom);
    console.log('couter', couter);
    return <ListGroupLabel {...otherProps} ref={ref} innerOffset={indent} />;
  },
);
