import './DateTimeAdditionalControls.css';

import React from 'react';

import { cn } from '../../../utils/bem';

type Props = {
  renderAdditionalControls?: (currentVisibleDate?: Date) => React.ReactNode | React.ReactNode[];
  currentVisibleDate?: Date;
};

const cnDateTimeAdditionalControls = cn('DateTimeAdditionalControls');

export const DateTimeAdditionalControls: React.FC<Props> = (props) => {
  const { renderAdditionalControls, currentVisibleDate } = props;

  return typeof renderAdditionalControls === 'function' ? (
    <div className={cnDateTimeAdditionalControls()}>
      {renderAdditionalControls(currentVisibleDate)}
    </div>
  ) : (
    <></>
  );
};
