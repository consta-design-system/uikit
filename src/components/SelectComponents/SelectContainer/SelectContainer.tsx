import './SelectContainer.css';

import React, { forwardRef } from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../../utils/types/PropsWithHTMLAttributes';
import { cnSelect } from '../cnSelect';
import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
  PropForm,
  PropSize,
  PropView,
} from '../types';

export type SelectContainerProps = PropsWithHTMLAttributesAndRef<
  {
    disabled?: boolean;
    form?: PropForm;
    size?: PropSize;
    view?: PropView;
    focused?: boolean;
    multiple?: boolean;
  },
  HTMLDivElement
>;

export const SelectContainer = forwardRef<HTMLDivElement, SelectContainerProps>((props, ref) => {
  const {
    size = defaultPropSize,
    form = defaultPropForm,
    view = defaultPropView,
    className,
    disabled,
    children,
    focused,
    multiple,
    ...otherProps
  } = props;

  return (
    <div
      {...otherProps}
      className={cnSelect({ size, form, disabled, view, focused, multiple }, [className])}
      ref={ref}
    >
      {children}
    </div>
  );
});
