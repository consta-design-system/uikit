import { render } from '@testing-library/react';
import React from 'react';

import { DatePickerFieldTypeDateTime } from '../../DatePickerFieldTypeDateTime/DatePickerFieldTypeDateTime';
import { DatePickerFieldTypeDateTimeRange } from '../../DatePickerFieldTypeDateTimeRange/DatePickerFieldTypeDateTimeRange';

jest.mock('../../DatePickerFieldTypeDateTime/DatePickerFieldTypeDateTime');

const getFieldMock = () =>
  (DatePickerFieldTypeDateTime as any).render as jest.Mock;

describe('DatePickerFieldTypeDateTimeRange', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseTimeOptions = {
    hours: [0, 6, 12],
    minutes: [0, 30],
    seconds: [0, 10, 20, 30],
  };

  it('пробрасывает timeOptions в start и end DatePickerFieldTypeDateTime', () => {
    const value: [Date, Date] = [new Date(2023, 0, 1), new Date(2023, 0, 2)];
    render(
      <DatePickerFieldTypeDateTimeRange
        value={value}
        timeOptions={baseTimeOptions}
      />,
    );

    const fieldProps = getFieldMock().mock.calls.map((call) => call[0]);

    fieldProps.forEach((props) => {
      expect(props.timeOptions).toEqual(baseTimeOptions);
    });
  });

  it('если timeOptions не переданы, остаются undefined', () => {
    const value: [Date, Date] = [new Date(2023, 0, 1), new Date(2023, 0, 2)];
    render(<DatePickerFieldTypeDateTimeRange value={value} />);

    const fieldProps = getFieldMock().mock.calls.map((call) => call[0]);

    fieldProps.forEach((props) => {
      expect(props.timeOptions).toBeUndefined();
    });
  });

  it('пробрасывает value в start и end', () => {
    const value: [Date, Date] = [new Date(2023, 0, 1), new Date(2023, 0, 2)];
    render(<DatePickerFieldTypeDateTimeRange value={value} />);

    const fieldProps = getFieldMock().mock.calls.map((call) => call[0]);
    expect(fieldProps[0].value).toBe(value[0]);
    expect(fieldProps[1].value).toBe(value[1]);
  });

  it('пробрасывает disabled и placeholder', () => {
    const value: [Date, Date] = [new Date(2023, 0, 1), new Date(2023, 0, 2)];
    render(
      <DatePickerFieldTypeDateTimeRange
        value={value}
        disabled
        startFieldPlaceholder="Start"
        endFieldPlaceholder="End"
      />,
    );

    const fieldProps = getFieldMock().mock.calls.map((call) => call[0]);
    expect(fieldProps[0].disabled).toBe(true);
    expect(fieldProps[1].disabled).toBe(true);
    expect(fieldProps[0].placeholder).toBe('Start');
    expect(fieldProps[1].placeholder).toBe('End');
  });
});
