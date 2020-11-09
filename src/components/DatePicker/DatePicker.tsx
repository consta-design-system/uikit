import './DatePicker.css';

import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { classnames } from '@bem-react/classnames';
import { Props } from '@storybook/addon-docs/dist/blocks';
import { endOfDay, startOfDay } from 'date-fns';

import { cn } from '../../utils/bem';
import { componentToRenderFn } from '../../utils/componentToRenderFn';
import { Calendar } from '../Calendar/Calendar';
import { Popover } from '../Popover/Popover';
import { useTheme } from '../Theme/Theme';

import { DatePickerInputDate } from './DatePickerInputDate/DatePickerInputDate';
import { DatePickerMonthsSliderRange } from './DatePickerMonthsSliderRange/DatePickerMonthsSliderRange';
import { DatePickerMonthsSliderSingle } from './DatePickerMonthsSliderSingle/DatePickerMonthsSliderSingle';
import { DatePickerRangeControl } from './DatePickerRangeControl/DatePickerRangeControl';
import { DatePickerRangesSelector } from './DatePickerRangesSelector/DatePickerRangesSelector';
import {
  getCurrentVisibleDate,
  isDateFullyEntered,
  isDateIsInvalid,
  makeQuartersRanges,
  useCombinedRefs,
} from './helpers';
import {
  BaseControlProps,
  BaseDatePickerProps,
  DateRange,
  MinMaxDate,
  RenderControlsType,
  RenderSliderProps,
  RenderSliderType,
} from './types';

export const cnDatePicker = cn('DatePicker');

const POSSIBLE_DIRECTIONS = [
  'upCenter',
  'leftCenter',
  'rightCenter',
  'downCenter',
  'downStartLeft',
  'upStartLeft',
  'downStartRight',
  'upStartRight',
] as const;

const defaultRenderSingleControl = componentToRenderFn(DatePickerInputDate);
const defaultRenderRangeControls = componentToRenderFn(DatePickerRangeControl);
const renderMonthSingleSlider = componentToRenderFn<RenderSliderProps<Date>>(
  DatePickerMonthsSliderSingle,
);

const renderSingleControls: RenderControlsType<Date> = ({
  value,
  minDate,
  maxDate,
  size,
  onChange,
  isTooltipVisible,
  renderControls = defaultRenderSingleControl,
}) => {
  const isInvalid = isDateIsInvalid({ date: value, minDate, maxDate });

  return renderControls({
    size,
    isInvalid,
    isCalendarOpened: isTooltipVisible,
    value,
    onChange,
  });
};

const renderRangeControls: RenderControlsType<DateRange> = ({
  value,
  minDate,
  maxDate,
  size,
  onChange,
  isTooltipVisible,
  renderControls = defaultRenderRangeControls,
}) => {
  const isInvalid = !!value && value.some((date) => isDateIsInvalid({ date, minDate, maxDate }));

  return renderControls({
    size,
    isInvalid,
    isCalendarOpened: isTooltipVisible,
    value,
    onChange,
  });
};

const renderMonthRangeSlider: RenderSliderType<DateRange> = (props) => (
  <DndProvider backend={HTML5Backend}>
    <DatePickerMonthsSliderRange {...props} />
  </DndProvider>
);

type SingleProps = {
  type: 'date';
} & BaseControlProps<Date>;

type RangeProps = {
  type: 'date-range';
  makePreparedRanges?: (
    options: { date: Date } & MinMaxDate,
  ) => Array<{ range: DateRange; title: string }>;
} & BaseControlProps<DateRange>;

type Props = BaseDatePickerProps & (SingleProps | RangeProps);

export const DatePicker = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { minDate: sourceMinDate, maxDate: sourceMaxDate, value } = props;
  const minDate = startOfDay(sourceMinDate);
  const maxDate = endOfDay(sourceMaxDate);

  const controlsRef = useRef<HTMLDivElement>(null);
  const combinedRef = useCombinedRefs(ref, controlsRef);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [currentVisibleDate, setCurrentVisibleDate] = useState<Date>(
    getCurrentVisibleDate({ value, minDate, maxDate }),
  );
  const { themeClassNames } = useTheme();
  const handleApplyDate = () => {
    setIsTooltipVisible(false);
  };

  useLayoutEffect(() => {
    if (!value || !isDateFullyEntered(value)) {
      return;
    }

    const newVisibleDate = getCurrentVisibleDate({ value, minDate, maxDate });

    if (currentVisibleDate !== newVisibleDate) {
      setCurrentVisibleDate(newVisibleDate);
    }
    // отключаем проверку, чтобы избежать неявных эффектов, вызванных изменением всех props
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, props.minDate, props.maxDate, isTooltipVisible]);

  let dateRangesSelector = null;
  let dateControls;
  let slider;
  let datePicker;
  const baseCommonProps = {
    currentVisibleDate,
    minDate,
    maxDate,
  };
  const monthsPanelCommonProps = {
    ...baseCommonProps,
    onChange: setCurrentVisibleDate,
  };
  const propsForControls = {
    size: props.size,
    isTooltipVisible,
    minDate,
    maxDate,
  };
  if (props.type === 'date-range') {
    dateRangesSelector = (
      <DatePickerRangesSelector
        {...baseCommonProps}
        onSelect={(val: DateRange): void => {
          setCurrentVisibleDate(
            getCurrentVisibleDate({ value: [val[0], undefined], minDate, maxDate }),
          );

          return props.onChange(val);
        }}
        makeRanges={props.makePreparedRanges || makeQuartersRanges}
      />
    );

    dateControls = renderRangeControls({
      ...propsForControls,
      value: props.value,
      onChange: props.onChange,
      renderControls: props.renderControls,
    });
    slider = renderMonthRangeSlider({
      ...monthsPanelCommonProps,
      value: props.value,
    });
    datePicker = (
      <Calendar
        {...baseCommonProps}
        type={props.type}
        value={props.value}
        onSelect={props.onChange}
      />
    );
  } else {
    dateControls = renderSingleControls({
      ...propsForControls,
      value: props.value,
      onChange: props.onChange,
      renderControls: props.renderControls,
    });
    slider = renderMonthSingleSlider({
      ...monthsPanelCommonProps,
      value: props.value,
    });
    datePicker = (
      <Calendar
        {...baseCommonProps}
        type={props.type}
        value={props.value}
        onSelect={props.onChange}
      />
    );
  }

  return (
    <>
      <div
        className={cnDatePicker(null, [props.className])}
        role="button"
        tabIndex={0}
        ref={combinedRef}
        onClick={() => setIsTooltipVisible(!isTooltipVisible)}
        onKeyDown={() => setIsTooltipVisible(!isTooltipVisible)}
      >
        {dateControls}
      </div>
      {isTooltipVisible && (
        <Popover
          anchorRef={combinedRef}
          offset={4}
          direction="downStartLeft"
          possibleDirections={POSSIBLE_DIRECTIONS}
          onClickOutside={handleApplyDate}
        >
          <div className={classnames(themeClassNames.color.primary, cnDatePicker('Tooltip'))}>
            {slider}
            {datePicker}
            {dateRangesSelector}
          </div>
        </Popover>
      )}
    </>
  );
});
