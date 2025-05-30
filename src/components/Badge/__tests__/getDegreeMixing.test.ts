import { badgePropStatus, badgePropView } from '..';
import { getDegreeMixing } from '../maps';

const resultMap: Record<string, string | undefined> = {
  'alert-filled': undefined,
  'alert-stroked': undefined,
  'alert-tinted': '10%',
  'disabled-filled': undefined,
  'disabled-stroked': undefined,
  'disabled-tinted': '100%',
  'normal-filled': undefined,
  'normal-stroked': undefined,
  'normal-tinted': '10%',
  'success-filled': undefined,
  'success-stroked': undefined,
  'success-tinted': '10%',
  'system-filled': undefined,
  'system-stroked': undefined,
  'system-tinted': '30%',
  'warning-filled': undefined,
  'warning-stroked': undefined,
  'warning-tinted': '10%',
};

describe('Компонент Badge проверка getDegreeMixing', () => {
  badgePropStatus.forEach((status) => {
    badgePropView.forEach((view) => {
      it(`возвращает правильное значение для status=${status}, view=${view}`, () => {
        expect(getDegreeMixing(status, view)).toBe(
          resultMap[`${status}-${view}`],
        );
      });
    });
  });
});
