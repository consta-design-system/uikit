import React, { forwardRef } from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../../utils/types/PropsWithHTMLAttributes';
import { FieldCaption } from '../../FieldCaption/FieldCaption';
import { FieldLabel, FieldLabelPropAlign } from '../../FieldLabel/FieldLabel';
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
    label?: string;
    labelAlign?: FieldLabelPropAlign;
    caption?: string;
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
    labelAlign = 'top',
    label,
    caption,
    ...otherProps
  } = props;

  return (
    <div className={cnSelect({ labelAlign, size }, [className])} {...otherProps}>
      {label && <FieldLabel size={size}>{label}</FieldLabel>}
      <div className={cnSelect('CaptionContainer', { size })}>
        <div
          className={cnSelect('SelectContainer', { size, form, disabled, view, focused, multiple })}
          ref={ref}
        >
          {children}
        </div>
        {caption && <FieldCaption>{caption}</FieldCaption>}
      </div>
    </div>
  );
});
