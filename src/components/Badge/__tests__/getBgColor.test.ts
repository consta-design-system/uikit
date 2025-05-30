import { badgePropStatus } from '..';
import { getBgColor } from '../maps';

const resultMap: Record<string, string> = {
  alert: 'var(--color-bg-alert)',
  disabled: 'var(--color-control-bg-disable)',
  normal: 'var(--color-bg-normal)',
  success: 'var(--color-bg-success)',
  system: 'var(--color-bg-system)',
  warning: 'var(--color-bg-warning)',
};

describe('Компонент Badge проверка getBgColor', () => {
  badgePropStatus.forEach((status) => {
    it(`возвращает правильное значение для status=${status}`, () => {
      expect(getBgColor(status)).toBe(resultMap[`${status}`]);
    });
  });
});
