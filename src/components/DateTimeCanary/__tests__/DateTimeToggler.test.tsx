import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { cnDateTimeToggler, DateTimeToggler } from '../DateTimeToggler/DateTimeToggler';

type DateTimeTogglerProps = React.ComponentProps<typeof DateTimeToggler>;

const testId = 'DateTimeToggler';

const getRender = () => screen.getByTestId(testId);
const getDateTimeTogglerLabel = () =>
  getRender().querySelector(`.${cnDateTimeToggler('Label')}`) as Element;
const getDateTimeTogglerButtonDirectionPrev = () =>
  getRender().querySelector(`.DateTimeToggler-Button_direction_prev`) as Element;
const getDateTimeTogglerButtonDirectioNext = () =>
  getRender().querySelector(`.DateTimeToggler-Button_direction_next`) as Element;

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
    it(`Дополнительный className присваевается`, () => {
      const label = 'label';

      renderComponent({ label });

      expect(getDateTimeTogglerLabel()).toHaveTextContent(label);
    });
  });

  describe('проверка onLabelClick', () => {
    it(`Дополнительный className присваевается`, () => {
      const onLabelClick = jest.fn();
      const label = 'label';

      renderComponent({ onLabelClick, label });

      const DateTimeTogglerLabel = getDateTimeTogglerLabel();

      fireEvent.click(DateTimeTogglerLabel);

      expect(onLabelClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('проверка prevOnClick', () => {
    it(`Дополнительный className присваевается`, () => {
      const prevOnClick = jest.fn();
      const label = 'label';

      renderComponent({ prevOnClick, label });

      const DateTimeTogglerButtonDirectionPrev = getDateTimeTogglerButtonDirectionPrev();

      fireEvent.click(DateTimeTogglerButtonDirectionPrev);

      expect(prevOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('проверка nextOnClick', () => {
    it(`Дополнительный className присваевается`, () => {
      const nextOnClick = jest.fn();
      const label = 'label';

      renderComponent({ nextOnClick, label });

      const DateTimeTogglerButtonDirectionNext = getDateTimeTogglerButtonDirectioNext();

      fireEvent.click(DateTimeTogglerButtonDirectionNext);

      expect(nextOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
