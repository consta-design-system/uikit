import { TestContext, testRootId } from '##/utils/vitest';

import { cnDateTimeCell } from '../DateTimeCell/DateTimeCell';
import { cnDateTimeItem } from '../DateTimeItem/DateTimeItem';
import { cnDateTimeLabel } from '../DateTimeLabel/DateTimeLabel';
import { cnDateTimeTimeColumn } from '../DateTimeTimeColumn/DateTimeTimeColumn';

export const testId = 'DateTime';

export const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;
export const getDateTimeItems = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(
    `.${cnDateTimeItem()}`,
  ) as NodeListOf<HTMLElement>;
export const getDateTimeCells = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnDateTimeCell()}`);
export const getDateTimeColumn = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnDateTimeTimeColumn()}`);
export const getDateTimeLabel = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnDateTimeLabel()}`);
export const getDateTimeViewBookLabels = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnDateTimeLabel()}`);
export const getDateTimeSliderLabel = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.DateTimeSlider-ParentLabel_position_1`);
export const getDateTimeViewSliderLabels = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.DateTimeMixLayout-Label`);
export const getDateTimeTogglerButtonNext = (ctx: TestContext) =>
  getRender(ctx).querySelector(
    `.DateTimeToggler-Button_direction_next`,
  ) as Element;
export const getDateTimeTogglerButtonPrev = (ctx: TestContext) =>
  getRender(ctx).querySelector(
    `.DateTimeToggler-Button_direction_prev`,
  ) as Element;
export const getDateTimeSliderButtonNext = (ctx: TestContext) =>
  getRender(ctx).querySelector(
    `.DateTimeSlider-Button_direction_next`,
  ) as Element;
export const getDateTimeSliderButtonPrev = (ctx: TestContext) =>
  getRender(ctx).querySelector(
    `.DateTimeSlider-Button_direction_prev`,
  ) as Element;
export const getDateTimeItem = (ctx: TestContext, item = 0) =>
  getDateTimeItems(ctx)[item];
export const getDateTimeCell = (ctx: TestContext, item = 0) =>
  getDateTimeCells(ctx)[item];
export const getTimeItems = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.DateTimeTypeTime .DateTimeItem`);
export const getTimeItemsSelected = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.DateTimeTypeTime .DateTimeItem_selected`);
export const getTimeItem = (ctx: TestContext, item = 0) =>
  getTimeItems(ctx)[item];
export const getDayItems = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.DateTimeMonth .DateTimeItem`);
export const getDayItemsSelected = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.DateTimeMonth .DateTimeItem_selected`);
export const getDayItem = (ctx: TestContext, item = 0) =>
  getDayItems(ctx)[item];
export const getDateTimeItemsSelected = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.DateTimeItem_selected`);
export const getDateTimeTogglerLabel = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.DateTimeToggler-Label`) as Element;
export const getDateTimeTogglerLabels = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.DateTimeToggler-Label`);
export const getColumnAllItem = (ctx: TestContext, column: number) =>
  getDateTimeColumn(ctx)[column].querySelectorAll(`.${cnDateTimeItem()}`);
export const getDateTimeColumnItem = (
  ctx: TestContext,
  column: number,
  item: number,
) => getColumnAllItem(ctx, column)[item];
export const multiplicity = [0, 1, 2, 3, 4];
export const getDateTimeItemByText = (ctx: TestContext, dateText: string) =>
  Array.from(getDateTimeItems(ctx)).find(
    (node) => node.textContent === dateText,
  );
