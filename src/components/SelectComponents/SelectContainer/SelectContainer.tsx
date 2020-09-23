import './SelectContainer.css';

import React from 'react';

import { cnSelect } from '../cnSelect';
import {
  DefaultPropForm,
  DefaultPropSize,
  DefaultPropView,
  PropForm,
  PropSize,
  PropView,
} from '../types';

export type SelectContainerProps = {
  className?: string;
  disabled?: boolean;
  form?: PropForm;
  size?: PropSize;
  view?: PropView;
  focused?: boolean;
  children: React.ReactNode;
  multi?: boolean;
};

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
      multi,
    } = props;

    return (
      <div
        className={cnSelect({ size, form, disabled, view, focused, multi }, [className])}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);
