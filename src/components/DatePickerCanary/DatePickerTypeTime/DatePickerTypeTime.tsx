import React, { forwardRef, useEffect, useRef } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useFlag } from '../../../hooks/useFlag/useFlag';
import { setRef } from '../../../utils/setRef';
import { DatePickerDropdown } from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeTime } from '../DatePickerFieldTypeTime/DatePickerFieldTypeTime';
import {
  datePickerPropFormatTypeDateTime,
  DatePickerTypeComponent,
  getMultiplicityTime,
} from '../helpers';

export const DatePickerTypeTime: DatePickerTypeComponent<'time'> = forwardRef((props, ref) => {
  const {
    events,
    dateTimeView,
    locale,
    dropdownForm,
    onFocus,
    multiplicityHours: multiplicityHoursProp,
    multiplicityMinutes: multiplicityMinutesProp,
    multiplicitySeconds: multiplicitySecondsProp,
    renderAdditionalControls,
    style,

    currentVisibleDate,
    onChangeCurrentVisibleDate,
    ...otherProps
  } = props;

  const [multiplicityHours, multiplicityMinutes, multiplicitySeconds] = getMultiplicityTime(
    otherProps.format || datePickerPropFormatTypeDateTime,
    multiplicityHoursProp,
    multiplicityMinutesProp,
    multiplicitySecondsProp,
  );

  const fieldRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [calendarVisible, setCalendarVisible] = useFlag(false);

  const onFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
    onFocus && onFocus(e);
    setCalendarVisible.on();
  };

  useEffect(() => {
    if (ref) {
      setRef(ref, fieldRef.current);
    }
  }, [ref, fieldRef]);

  useClickOutside({
    isActive: calendarVisible,
    ignoreClicksInsideRefs: [fieldRef, calendarRef],
    handler: () => setCalendarVisible.off(),
  });

  return (
    <>
      <DatePickerFieldTypeTime
        {...otherProps}
        ref={fieldRef}
        onFocus={onFocusHandler}
        multiplicityHours={multiplicityHours}
        multiplicitySeconds={multiplicitySeconds}
        multiplicityMinutes={multiplicityMinutes}
        style={style}
      />
      <DatePickerDropdown
        ref={calendarRef}
        anchorRef={fieldRef}
        isOpen={calendarVisible}
        value={props.value || undefined}
        type="time"
        view={dateTimeView}
        events={events}
        locale={locale}
        minDate={props.minDate}
        maxDate={props.maxDate}
        form={dropdownForm}
        onChange={props.onChange}
        renderAdditionalControls={renderAdditionalControls}
        multiplicityHours={multiplicityHours}
        multiplicitySeconds={multiplicitySeconds}
        multiplicityMinutes={multiplicityMinutes}
        zIndex={typeof style?.zIndex === 'number' ? style.zIndex + 1 : undefined}
      />
    </>
  );
});
