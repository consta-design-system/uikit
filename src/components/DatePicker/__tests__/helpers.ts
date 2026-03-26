import { fireEvent, within } from '@testing-library/react';

import {
  TestContext,
  testOutsideId,
  testPopoverId,
  testRootId,
} from '##/utils/vitest';

export const testId = 'DatePicker';
export const outsideId = 'outside';
export const getRender = (ctx: TestContext) =>
  document.querySelector(`#${testRootId(ctx)} *[data-testid=${testId}]`);
export const getOutside = (ctx: TestContext) =>
  document.querySelector(`#${testOutsideId(ctx)}`) as HTMLDivElement;
export const getDropdown = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} *[role="listbox"]`,
  ) as HTMLDivElement;
export const getInput = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`input.TextField-Input`) as Element;
export const inputFocus = (ctx: TestContext) => fireEvent.click(getInput(ctx));
export const inputChange = (ctx: TestContext, value: string) => {
  const input = getInput(ctx);
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value } });
};
export const outsideClick = (ctx: TestContext) =>
  fireEvent.mouseDown(getOutside(ctx));

export const getDateTimeItems = (ctx: TestContext) =>
  getDropdown(ctx).querySelectorAll(`.DateTimeItem`);
export const getDateTimeTimeItems = (ctx: TestContext) =>
  getDropdown(ctx).querySelectorAll(`.DateTimeTypeDateTime-Time .DateTimeItem`);
export const getDateTimeItem = (ctx: TestContext, item = 0) =>
  getDateTimeItems(ctx)[item];
export const getDateTimeTimeItem = (ctx: TestContext, item = 0) =>
  getDateTimeTimeItems(ctx)[item];
export const getDateTimeItemByText = (ctx: TestContext, dateText: string) =>
  within(getDropdown(ctx)).getByText(dateText);
export const getDateTimeItemsSelected = (ctx: TestContext) =>
  getDropdown(ctx).querySelectorAll(`.DateTimeItem_selected`);
export const getDateTimeItemSelected = (ctx: TestContext, item = 0) =>
  getDateTimeItemsSelected(ctx)[item];
export const getDateTimeDaysSelected = (ctx: TestContext) =>
  getDropdown(ctx).querySelectorAll(
    `.DateTimeTypeDateTime-Date .DateTimeItem_selected`,
  );
export const getDateTimeDaySelected = (ctx: TestContext, item = 0) =>
  getDateTimeDaysSelected(ctx)[item];
export const getDateTimeTimesSelected = (ctx: TestContext) =>
  getDropdown(ctx).querySelectorAll(
    `.DateTimeTypeDateTime-Time .DateTimeItem_selected`,
  );
export const getDateTimeTimeSelected = (ctx: TestContext, item = 0) =>
  getDateTimeTimesSelected(ctx)[item];
export const getAdditionalControls = (ctx: TestContext) =>
  getDropdown(ctx).querySelector(`.DatePickerAdditionalControls`);
