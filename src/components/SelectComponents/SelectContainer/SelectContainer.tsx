import { IconComponent } from '@consta/icons/Icon';
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
  PropStatus,
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
    status?: PropStatus;
    label?: string;
    labelIcon?: IconComponent;
    type?: 'select' | 'combobox' | 'userselect';
    labelPosition?: 'top' | 'left';
    caption?: string;
  },
  HTMLDivElement
>;

export const SelectContainer = forwardRef<HTMLDivElement, SelectContainerProps>(
  (props, ref) => {
    const {
      size = defaultPropSize,
      form = defaultPropForm,
      view = defaultPropView,
      className,
      disabled,
      required,
      children,
      status,
      focused,
      id,
      multiple,
      type = 'select',
      labelPosition = 'top',
      label,
      labelIcon,
      caption,
      ...otherProps
    } = props;

    return (
      <div
        className={cnSelect({ labelPosition, size, view, type }, [className])}
        {...otherProps}
      >
        {label && (
          <FieldLabel
            icon={labelIcon}
            as="label"
            required={required}
            htmlFor={id}
            className={cnSelect('Label', { labelPosition })}
            size={size}
          >
            {label}
          </FieldLabel>
        )}
        <div className={cnSelect('Body')}>
          <div
            className={cnSelect('SelectContainer', {
              view,
              form,
              disabled,
              focused,
              multiple,
              status,
            })}
            ref={ref}
          >
            {children}
          </div>
          {caption && (
            <FieldCaption className={cnSelect('Caption')} status={status}>
              {caption}
            </FieldCaption>
          )}
        </div>
      </div>
    );
  },
);
