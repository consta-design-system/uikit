import './SelectContainer.css';

import React from 'react';

import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { cnSelect } from '../cnSelect';
import {
  DefaultPropForm,
  DefaultPropSize,
  DefaultPropView,
  PropForm,
  PropSize,
  PropView,
} from '../types';

export type SelectContainerProps = PropsWithHTMLAttributes<
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

export const SelectContainer = React.forwardRef<HTMLDivElement, SelectContainerProps>(
  (props, ref) => {
    const {
      size = DefaultPropSize,
      form = DefaultPropForm,
      view = DefaultPropView,
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
  },
);
