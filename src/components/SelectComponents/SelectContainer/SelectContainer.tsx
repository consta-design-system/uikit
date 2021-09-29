import React, { forwardRef } from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../../utils/types/PropsWithHTMLAttributes';
import { FieldCaption } from '../../FieldCaption/FieldCaption';
import { FieldLabel, FieldLabelPropPosition } from '../../FieldLabel/FieldLabel';
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
    labelPosition?: FieldLabelPropPosition;
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
    labelPosition = 'top',
    label,
    caption,
    ...otherProps
  } = props;

  return (
    <div className={cnSelect({ position: labelPosition, size, view }, [className])} {...otherProps}>
      {label && (
        <FieldLabel className={cnSelect('Label')} size={size}>
          {label}
        </FieldLabel>
      )}
      <div className={cnSelect('CaptionContainer')}>
        <div
          className={cnSelect('SelectContainer', { form, disabled, focused, multiple })}
          ref={ref}
        >
          {children}
        </div>
        {caption && <FieldCaption className={cnSelect('Caption')}>{caption}</FieldCaption>}
      </div>
    </div>
  );
});
