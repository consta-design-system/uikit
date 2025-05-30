import { badgePropStatus, badgePropView } from '..';
import { getTextColor } from '../maps';

const resultMap: Record<string, string> = {
  'alert-filled': 'var(--color-typo-primary)',
  'alert-stroked': 'var(--color-typo-alert)',
  'alert-tinted': 'var(--color-typo-alert)',
  'disabled-filled': 'var(--color-control-typo-disable)',
  'disabled-stroked': 'var(--color-control-typo-disable)',
  'disabled-tinted': 'var(--color-control-typo-disable)',
  'normal-filled': 'var(--color-typo-primary)',
  'normal-stroked': 'var(--color-typo-normal)',
  'normal-tinted': 'var(--color-typo-normal)',
  'success-filled': 'var(--color-typo-primary)',
  'success-stroked': 'var(--color-typo-success)',
  'success-tinted': 'var(--color-typo-success)',
  'system-filled': 'var(--color-typo-secondary)',
  'system-stroked': 'var(--color-typo-secondary)',
  'system-tinted': 'var(--color-typo-secondary)',
  'warning-filled': 'var(--color-typo-primary)',
  'warning-stroked': 'var(--color-typo-warning)',
  'warning-tinted': 'var(--color-typo-warning)',
};

describe('Компонент Badge проверка getTextColor', () => {
  badgePropStatus.forEach((status) => {
    badgePropView.forEach((view) => {
      it(`возвращает правильное значение для status=${status}, view=${view}`, () => {
        expect(getTextColor(status, view)).toBe(resultMap[`${status}-${view}`]);
      });
    });
  });
});
