import './SelectContainer.css';

import React from 'react';

import { cnSelect } from '../cnSelect';
import {
  DefaultPropForm,
  DefaultPropSize,
  DefaultPropView,
  DefaultPropWidth,
  PropForm,
  PropSize,
  PropView,
  PropWidth,
} from '../types';

export type SelectContainerProps = {
  className?: string;
  disabled?: boolean;
  form?: PropForm;
  size?: PropSize;
  width?: PropWidth;
  view?: PropView;
  focused?: boolean;
  children: React.ReactNode;
};

export const SelectContainer = React.forwardRef<HTMLDivElement, SelectContainerProps>(
  (props, ref) => {
    const {
      size = DefaultPropSize,
      width = DefaultPropWidth,
      form = DefaultPropForm,
      view = DefaultPropView,
      className,
      disabled,
      children,
      focused,
    } = props;

    return (
      <div
        className={cnSelect({ size, width, form, disabled, view, focused }, [className])}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);
