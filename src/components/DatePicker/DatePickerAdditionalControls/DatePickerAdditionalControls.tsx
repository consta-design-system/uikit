import './DatePickerAdditionalControls.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import {
  DatePickerAdditionalControlRenderFn,
  DatePickerAdditionalControlRenderProp,
  DatePickerPropDateTimeView,
  DatePickerPropType,
} from '../types';

type Props = PropsWithHTMLAttributes<
  {
    renderAdditionalControls?: DatePickerAdditionalControlRenderProp;
    currentVisibleDate?: Date;
    type: DatePickerPropType;
    view: DatePickerPropDateTimeView;
  },
  HTMLDivElement
>;

function isRenderFn(
  fn: DatePickerAdditionalControlRenderProp,
): fn is DatePickerAdditionalControlRenderFn {
  return (fn as DatePickerAdditionalControlRenderFn).call !== undefined;
}

const cnDatePickerAdditionalControls = cn('DatePickerAdditionalControls');

export const DatePickerAdditionalControls: React.FC<Props> = (props) => {
  const {
    renderAdditionalControls,
    currentVisibleDate,
    className,
    type,
    view,
    ...otherProps
  } = props;

  if (typeof renderAdditionalControls !== 'undefined') {
    const content = isRenderFn(renderAdditionalControls)
      ? renderAdditionalControls({ currentVisibleDate })
      : renderAdditionalControls;

    return (
      <div
        {...otherProps}
        className={cnDatePickerAdditionalControls(
          { type, view, contentType: Array.isArray(content) && 'array' },
          [className],
        )}
      >
        {content}
      </div>
    );
  }

  return null;
};
