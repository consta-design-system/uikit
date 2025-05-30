import { badgePropStatus, badgePropView } from '..';
import { getBorderColor } from '../maps';

const resultMap: Record<string, string | undefined> = {
  'alert-filled': undefined,
  'alert-stroked': 'var(--color-bg-alert)',
  'alert-tinted': undefined,
  'disabled-filled': undefined,
  'disabled-stroked': 'var(--color-control-bg-border-disable)',
  'disabled-tinted': undefined,
  'normal-filled': undefined,
  'normal-stroked': 'var(--color-bg-normal)',
  'normal-tinted': undefined,
  'success-filled': undefined,
  'success-stroked': 'var(--color-bg-success)',
  'success-tinted': undefined,
  'system-filled': undefined,
  'system-stroked': 'var(--color-bg-system)',
  'system-tinted': undefined,
  'warning-filled': undefined,
  'warning-stroked': 'var(--color-bg-warning)',
  'warning-tinted': undefined,
};

describe('Компонент Badge проверка getBorderColor', () => {
  badgePropStatus.forEach((status) => {
    badgePropView.forEach((view) => {
      it(`возвращает правильное значение для status=${status}, view=${view}`, () => {
        expect(getBorderColor(status, view)).toBe(
          resultMap[`${status}-${view}`],
        );
      });
    });
  });
});
