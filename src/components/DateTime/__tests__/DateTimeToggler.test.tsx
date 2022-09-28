import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';

import { DateTimeToggler } from '../DateTimeToggler/DateTimeToggler';
import {
  getDateTimeTogglerLabel,
  getDateTimeTooglerButtonNext,
  getDateTimeTooglerButtonPrev,
  getRender,
  testId,
} from './helpers';

type DateTimeTogglerProps = React.ComponentProps<typeof DateTimeToggler>;

const renderComponent = (props: DateTimeTogglerProps) => {
  return render(<DateTimeToggler {...props} data-testid={testId} />);
};

describe('Компонент DateTimeToggler', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({ label: 'label' })).not.toThrow();
  });

  describe('проверка className', () => {
    it(`Дополнительный className присваевается`, () => {
      const className = 'className';

      renderComponent({ className, label: 'label' });

      expect(getRender()).toHaveClass(className);
    });
  });

  describe('проверка label', () => {
    it(`label отображаеся`, () => {
      const label = 'label';

      renderComponent({ label });

      expect(getDateTimeTogglerLabel()).toHaveTextContent(label);
    });
  });

  describe('проверка onLabelClick', () => {
    it(`onLabelClickорабатывает`, () => {
      const onLabelClick = jest.fn();
      const label = 'label';

      renderComponent({ onLabelClick, label });

      const DateTimeTogglerLabel = getDateTimeTogglerLabel();

      fireEvent.click(DateTimeTogglerLabel);

      expect(onLabelClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('проверка prevOnClick', () => {
    it(`prevOnClick орабатывает`, () => {
      const prevOnClick = jest.fn();
      const label = 'label';

      renderComponent({ prevOnClick, label });

      fireEvent.click(getDateTimeTooglerButtonPrev());

      expect(prevOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('проверка nextOnClick', () => {
    it(`nextOnClick орабатывает`, () => {
      const nextOnClick = jest.fn();
      const label = 'label';

      renderComponent({ nextOnClick, label });

      fireEvent.click(getDateTimeTooglerButtonNext());

      expect(nextOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
