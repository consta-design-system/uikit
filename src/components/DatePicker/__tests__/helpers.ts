import { act, fireEvent, screen } from '@testing-library/react';

import { animateTimeout } from '../../../mixs/MixPopoverAnimate/MixPopoverAnimate';

export const testId = 'DatePicker';
export const outsideId = 'outside';
export const getRender = () => screen.getByTestId(testId);
export const getOutside = () => screen.getByTestId(outsideId);
export const getDropdown = () => screen.getByRole('listbox');
export const getInput = () =>
  getRender().querySelector(`input.TextField-Input`) as Element;
export const inputFocus = () => fireEvent.focus(getInput());
export const inputChange = (value: string) => {
  const input = getInput();
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value } });
};
export const outsideClick = () => fireEvent.mouseDown(getOutside());
export const animateDelay = () =>
  act(() => {
    jest.advanceTimersByTime(animateTimeout);
  });
export const getDateTimeItems = () =>
  getDropdown().querySelectorAll(`.DateTimeItem`);
export const getDateTimeItem = (item = 0) => getDateTimeItems()[item];
export const getDateTimeItemsSelected = () =>
  getDropdown().querySelectorAll(`.DateTimeItem_selected`);
export const getDateTimeItemSelected = (item = 0) =>
  getDateTimeItemsSelected()[item];
export const getDateTimeDaysSelected = () =>
  getDropdown().querySelectorAll(
    `.DateTimeTypeDateTime-Date .DateTimeItem_selected`,
  );
export const getDateTimeDaySelected = (item = 0) =>
  getDateTimeDaysSelected()[item];
export const getDateTimeTimesSelected = () =>
  getDropdown().querySelectorAll(
    `.DateTimeTypeDateTime-Time .DateTimeItem_selected`,
  );
export const getDateTimeTimeSelected = (item = 0) =>
  getDateTimeTimesSelected()[item];
export const getAdditionalControls = () =>
  getDropdown().querySelector(`.DatePickerAdditionalControls`);
