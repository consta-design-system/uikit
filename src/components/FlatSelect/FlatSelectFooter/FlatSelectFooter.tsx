import './FlatSelectFooter.css';

import React, { forwardRef } from 'react';

import { FieldPropView } from '##/components/FieldComponents';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cnCanary as cn } from '##/utils/bem';
import { isNotNil } from '##/utils/type-guards';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type FlatSelectFooterProps = PropsWithHTMLAttributesAndRef<
  {
    view?: FieldPropView;
    bordered?: boolean;
    form?: 'default' | 'brick' | 'round';
    footer: React.ReactNode;
  },
  HTMLDivElement
>;

export const cnFlatSelectFooter = cn('FlatSelectFooter');

const renderSlot = (slot: React.ReactNode) => {
  if (Array.isArray(slot)) {
    return slot.filter(isNotNil).map((item, index) => (
      <div className={cnFlatSelectFooter('Slot')} key={index}>
        {item}
      </div>
    ));
  }
  return renderSlot([slot]);
};

export const FlatSelectFooter: React.FC<FlatSelectFooterProps> = forwardRef(
  (props, ref) => {
    const { className, footer, view, bordered, form, ...otherProps } = props;

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnFlatSelectFooter(
          {
            border: view === 'clear' ? bordered : undefined,
            form: bordered ? form : undefined,
          },
          [
            Array.isArray(footer)
              ? cnMixFlex({ flex: 'flex', justify: 'flex-end', gap: 'xs' })
              : undefined,
            cnMixSpace({ pV: 'xs', pH: 's' }),
            className,
          ],
        )}
      >
        {renderSlot(footer)}
      </div>
    );
  },
);
