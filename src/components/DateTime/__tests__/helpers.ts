import { screen } from '@testing-library/react';

import { cnDateTimeCell } from '../DateTimeCell/DateTimeCell';
import { cnDateTimeItem } from '../DateTimeItem/DateTimeItem';
import { cnDateTimeLabel } from '../DateTimeLabel/DateTimeLabel';
import { cnDateTimeTimeColumn } from '../DateTimeTimeColumn/DateTimeTimeColumn';

export const testId = 'DateTime';

export const getRender = () => screen.getByTestId(testId);
export const getDateTimeItems = () =>
  getRender().querySelectorAll(`.${cnDateTimeItem()}`);
export const getDateTimeCells = () =>
  getRender().querySelectorAll(`.${cnDateTimeCell()}`);
export const getDateTimeColumn = () =>
  getRender().querySelectorAll(`.${cnDateTimeTimeColumn()}`);
export const getDateTimeLabel = () =>
  getRender().querySelector(`.${cnDateTimeLabel()}`);
export const getDateTimeViewBookLabels = () =>
  getRender().querySelectorAll(`.${cnDateTimeLabel()}`);
export const getDateTimeSliderLabel = () =>
  getRender().querySelector(`.DateTimeSlider-ParentLabel_position_1`);
export const getDateTimeViewSliderLabels = () =>
  getRender().querySelectorAll(`.DateTimeMixLayout-Label`);
export const getDateTimeTooglerButtonNext = () =>
  getRender().querySelector(
    `.DateTimeToggler-Button_direction_next`,
  ) as Element;
export const getDateTimeTooglerButtonPrev = () =>
  getRender().querySelector(
    `.DateTimeToggler-Button_direction_prev`,
  ) as Element;
export const getDateTimeSliderButtonNext = () =>
  getRender().querySelector(`.DateTimeSlider-Button_direction_next`) as Element;
export const getDateTimeSliderButtonPrev = () =>
  getRender().querySelector(`.DateTimeSlider-Button_direction_prev`) as Element;
export const getDateTimeItem = (item = 0) => getDateTimeItems()[item];
export const getDateTimeCell = (item = 0) => getDateTimeCells()[item];
export const getTimeItems = () =>
  getRender().querySelectorAll(`.DateTimeTypeTime .DateTimeItem`);
export const getTimeItemsSelected = () =>
  getRender().querySelectorAll(`.DateTimeTypeTime .DateTimeItem_selected`);
export const getTimeItem = (item = 0) => getTimeItems()[item];
export const getDayItems = () =>
  getRender().querySelectorAll(`.DateTimeMonth .DateTimeItem`);
export const getDayItemsSelected = () =>
  getRender().querySelectorAll(`.DateTimeMonth .DateTimeItem_selected`);
export const getDayItem = (item = 0) => getDayItems()[item];
export const getDateTimeItemsSelected = () =>
  getRender().querySelectorAll(`.DateTimeItem_selected`);
export const getDateTimeTogglerLabel = () =>
  getRender().querySelector(`.DateTimeToggler-Label`) as Element;
export const getDateTimeTogglerLabels = () =>
  getRender().querySelectorAll(`.DateTimeToggler-Label`);
export const getColumnAllItem = (column: number) =>
  getDateTimeColumn()[column].querySelectorAll(`.${cnDateTimeItem()}`);
export const getDateTimeColumnItem = (column: number, item: number) =>
  getColumnAllItem(column)[item];
export const multiplicity = [0, 1, 2, 3, 4];
