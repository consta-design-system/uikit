import './DateTimeTypeDateTime.css';

import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { cn } from '../../../utils/bem';
import { DateTimeAdditionalControls } from '../DateTimeAdditionalControls/DateTimeAdditionalControls';
import { DateTimeTypeDate } from '../DateTimeTypeDate/DateTimeTypeDate';
import { DateTimeTypeTime } from '../DateTimeTypeTime/DateTimeTypeTime';
import { DateTimeTypeComponent, MoveType, moveTypes } from '../helpers';

import { useOnChange } from './useOnChange';

const cnDateTimeTypeDateTime = cn('DateTimeTypeDateTime');

type CssVars = {
  '--root-padding-left': string;
};

export const DateTimeTypeDateTime: DateTimeTypeComponent<'date-time'> = forwardRef((props, ref) => {
  const {
    className,
    onMove: onMoveProp,
    currentVisibleDate,
    value,
    onChange,
    minDate,
    maxDate,
    events,
    locale,
    onChangeCurrentVisibleDate,
    multiplicitySeconds,
    multiplicityMinutes,
    multiplicityHours,
    style,
    renderAdditionalControls,
    ...otherProps
  } = props;

  const [moveType, setMoveType] = useState<MoveType>(moveTypes[2]);
  const [cssVars, setCssVars] = useState<CssVars>({
    '--root-padding-left': '0px',
  });

  const [onDateChange, onTimeChange] = useOnChange(onChange, value);

  const rootRef = useRef<HTMLDivElement>(null);

  const onMove = (type: MoveType) => {
    setMoveType(type);
    onMoveProp?.(type);
  };

  const withTime = moveType === moveTypes[2];

  useEffect(() => {
    if (rootRef.current) {
      setCssVars({
        '--root-padding-left': window.getComputedStyle(rootRef.current).paddingLeft || '0px',
      });
    }
  }, []);

  return (
    <>
      <div
        {...otherProps}
        className={cnDateTimeTypeDateTime({ withTime }, [className])}
        ref={useForkRef([rootRef, ref])}
        style={{
          ...style,
          ...cssVars,
        }}
      >
        <DateTimeTypeDate
          className={cnDateTimeTypeDateTime('Date', { withTime })}
          onMove={onMove}
          currentVisibleDate={currentVisibleDate}
          value={value}
          onChange={onDateChange}
          minDate={minDate}
          maxDate={maxDate}
          events={events}
          locale={locale}
          renderAdditionalControls={withTime ? undefined : renderAdditionalControls}
          onChangeCurrentVisibleDate={onChangeCurrentVisibleDate}
        />
        {withTime && (
          <DateTimeTypeTime
            className={cnDateTimeTypeDateTime('Time')}
            value={value}
            onChange={onTimeChange}
            minDate={minDate}
            maxDate={maxDate}
            locale={locale}
            multiplicitySeconds={multiplicitySeconds}
            multiplicityMinutes={multiplicityMinutes}
            multiplicityHours={multiplicityHours}
          />
        )}
      </div>
      <DateTimeAdditionalControls
        currentVisibleDate={currentVisibleDate}
        renderAdditionalControls={withTime ? renderAdditionalControls : undefined}
      />
    </>
  );
});
