import React, { forwardRef } from 'react';

import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

import { cnFieldArrayValueInlineControl } from './cnFieldArrayValueInlineControl';

type FieldArrayValueInlineControlProps<ITEM> = PropsWithJsxAttributes<
  {
    children?: never;
    value: ITEM[];
    renderValue: (props: { item: ITEM }) => React.ReactElement | null;
    maxLength?: number;
    inputValue?: string;
    inputDafeultValue?: string;
  },
  'div'
>;

const FieldArrayValueInlineControlRender = <>()

export const FieldArrayValueInlineControl = forwardRef<
  HTMLDivElement,
  FieldArrayValueInlineControlProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cnFieldArrayValueInlineControl(null, [className])}
      ref={ref}
    >
      <input {...props} maxLength />
    </div>
  );
});
