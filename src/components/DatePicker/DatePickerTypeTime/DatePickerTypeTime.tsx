import React, { forwardRef, useEffect, useRef } from 'react';

import { useClickOutside } from '##/hooks/useClickOutside/useClickOutside';
import { useForkRef } from '##/hooks/useForkRef';
import { setRef } from '##/utils/setRef';

import { DatePickerDropdown } from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeTime } from '../DatePickerFieldTypeTime/DatePickerFieldTypeTime';
import {
  datePickerPropFormatTypeDateTime,
  getDropdownZIndex,
  getMultiplicityTime,
  getTimeOptionsByFormat,
} from '../helpers';
import {
  datePickerPropDateTimeViewDefault,
  DatePickerTypeComponent,
} from '../types';
import { useCalendarVisible } from '../useCalendarVisible';

export const DatePickerTypeTime: DatePickerTypeComponent<'time'> = forwardRef(
  (props, ref) => {
    const {
      events,
      dateTimeView = datePickerPropDateTimeViewDefault,
      locale,
      dropdownForm,
      dropdownClassName,
      dropdownRef,
      timeOptions: timeOptionsProp,
      multiplicityHours: multiplicityHoursProp,
      multiplicityMinutes: multiplicityMinutesProp,
      multiplicitySeconds: multiplicitySecondsProp,
      renderAdditionalControls,
      currentVisibleDate,
      onChangeCurrentVisibleDate,
      onDropdownOpen,
      dropdownOpen,
      ignoreOutsideClicksRefs,
      disabled,
      inputRef: inputRefProp,
      disableDates,
      ...otherProps
    } = props;

    /**
     * @deprecated
     * TODO: major - удалить вызов getMultiplicityTime и связанные свойства multiplicity*
     * при переходе на новую схему работы с timeOptions, использовать только timeOptions и getTimeOptionsByFormat.
     */
    const [multiplicityHours, multiplicityMinutes, multiplicitySeconds] =
      getMultiplicityTime(
        otherProps.format || datePickerPropFormatTypeDateTime,
        multiplicityHoursProp,
        multiplicityMinutesProp,
        multiplicitySecondsProp,
      );

    const timeOptions = getTimeOptionsByFormat(
      otherProps.format || datePickerPropFormatTypeDateTime,
      timeOptionsProp,
    );

    const fieldRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [calendarVisible, setCalendarVisible] = useCalendarVisible({
      dropdownOpen,
      onDropdownOpen,
      disabled,
      startRef: inputRef,
    });

    useEffect(() => {
      if (ref) {
        setRef(ref, fieldRef.current);
      }
    }, [ref, fieldRef]);

    useClickOutside({
      isActive: calendarVisible,
      ignoreClicksInsideRefs: [
        fieldRef,
        calendarRef,
        ...(ignoreOutsideClicksRefs ?? []),
      ],
      handler: setCalendarVisible.off,
    });

    return (
      <>
        <DatePickerFieldTypeTime
          {...otherProps}
          ref={fieldRef}
          inputRef={useForkRef([inputRef, inputRefProp])}
          onClick={setCalendarVisible.on}
          timeOptions={timeOptions}
          multiplicityHours={multiplicityHours}
          multiplicityMinutes={multiplicityMinutes}
          multiplicitySeconds={multiplicitySeconds}
          disabled={disabled}
        />
        <DatePickerDropdown
          ref={useForkRef([dropdownRef, calendarRef])}
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
          className={dropdownClassName}
          onChange={props.onChange}
          renderAdditionalControls={renderAdditionalControls}
          timeOptions={timeOptions}
          multiplicityHours={multiplicityHours}
          multiplicityMinutes={multiplicityMinutes}
          multiplicitySeconds={multiplicitySeconds}
          zIndex={getDropdownZIndex(props.style)}
          disableDates={disableDates}
        />
      </>
    );
  },
);
