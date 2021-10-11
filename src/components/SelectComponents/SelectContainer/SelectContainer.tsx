import React, { forwardRef } from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../../utils/types/PropsWithHTMLAttributes';
import { FieldCaption } from '../../FieldCaption/FieldCaption';
import { FieldLabel } from '../../FieldLabel/FieldLabel';
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
    required?: boolean;
    label?: string;
    labelPosition?: 'top' | 'left';
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
    required,
    children,
    focused,
    multiple,
    labelPosition = 'top',
    label,
    caption,
    ...otherProps
  } = props;

  return (
    <div className={cnSelect({ labelPosition, size, view }, [className])} {...otherProps}>
      {label && (
        <FieldLabel
          required={required}
          className={cnSelect('Label', { labelPosition })}
          size={size}
        >
          {label}
        </FieldLabel>
      )}
      <div className={cnSelect('Body')}>
        <div
          className={cnSelect('SelectContainer', { view, form, disabled, focused, multiple })}
          ref={ref}
        >
          {children}
        </div>
        {caption && <FieldCaption className={cnSelect('Caption')}>{caption}</FieldCaption>}
      </div>
    </div>
  );
});
