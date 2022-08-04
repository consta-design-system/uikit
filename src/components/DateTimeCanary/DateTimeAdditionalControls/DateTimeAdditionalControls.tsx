import './DateTimeAdditionalControls.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import {
  AdditionalControlRenderType,
  DateTimeAdditionalControlRenderProp,
} from '../helpers';

type Props = {
  renderAdditionalControls?: DateTimeAdditionalControlRenderProp;
  currentVisibleDate?: Date;
};

function isRenderFn(
  fn: DateTimeAdditionalControlRenderProp,
): fn is AdditionalControlRenderType {
  return (fn as AdditionalControlRenderType).call !== undefined;
}

const cnDateTimeAdditionalControls = cn('DateTimeAdditionalControls');

export const DateTimeAdditionalControls: React.FC<Props> = (props) => {
  const { renderAdditionalControls, currentVisibleDate } = props;

  if (typeof renderAdditionalControls !== 'undefined') {
    const content = isRenderFn(renderAdditionalControls)
      ? renderAdditionalControls({ currentVisibleDate })
      : renderAdditionalControls;
    return <div className={cnDateTimeAdditionalControls()}>{content}</div>;
  }
  return null;
};
