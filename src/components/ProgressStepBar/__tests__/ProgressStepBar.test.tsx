import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import * as useOverflowHook from '##/hooks/useOverflow/useOverflow';
import * as useScrollElementsHook from '##/hooks/useScrollElements/useScrollElements';

import { ProgressStepBar } from '../ProgressStepBar';

type ProgressStepBarProps = React.ComponentProps<typeof ProgressStepBar>;

const testId = 'ProgressStepBar';

const steps = [
  {
    label: 'Шаг 1',
    point: 1,
  },
  {
    label: 'Шаг 2',
    point: 2,
  },
  {
    label: 'Шаг 3',
    point: 3,
  },
];

const renderComponent = (props: Partial<ProgressStepBarProps> = {}) => {
  return render(
    <ProgressStepBar
      data-testid={testId}
      steps={steps}
      {...props}
      getItemLabel={() => ''}
    />,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}

function getItems() {
  return getRender().querySelectorAll('.ProgressStepBarItem');
}

describe('Компонент ProgressStepBar', () => {
  it('рендерится без ошибок', () => {
    expect(() => renderComponent()).not.toThrow();
  });

  describe('проверка props', () => {
    it('className применяется', () => {
      const className = 'test-class';
      renderComponent({ className });
      expect(getRender()).toHaveClass(className);
    });

    it('отображает правильное количество шагов', () => {
      renderComponent();
      expect(getItems().length).toBe(steps.length);
    });

    it('onItemClick вызывается при клике на шаг', () => {
      const onItemClick = jest.fn();
      renderComponent({ onItemClick });
      const itemButton = getItems()[1].querySelector('button');
      if (itemButton) {
        fireEvent.click(itemButton);
      }
      expect(onItemClick).toHaveBeenCalledWith(steps[1], {
        e: expect.any(Object),
        index: 1,
      });
    });

    it('activeStepIndex правильно применяется', () => {
      const activeStepIndex = 1;
      renderComponent({ activeStepIndex });
      const items = getItems();
      expect(items[0]).toHaveClass('ProgressStepBarItem_status_normal');
      expect(items[1]).toHaveClass('ProgressStepBarItem_status_normal');
      expect(items[2]).toHaveClass('ProgressStepBarItem_status_system');
    });

    it('ref устанавливается', () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent({ ref });
      expect(ref.current).toBe(getRender());
    });
  });

  describe('проверка direction', () => {
    it('устанавливает горизонтальное направление по умолчанию', () => {
      renderComponent();
      expect(getRender().querySelector('.ProgressStepBar-List')).toHaveClass(
        'ProgressStepBar-List_direction_horizontal',
      );
    });

    it('устанавливает вертикальное направление', () => {
      renderComponent({ direction: 'vertical' });
      expect(getRender().querySelector('.ProgressStepBar-List')).toHaveClass(
        'ProgressStepBar-List_direction_vertical',
      );
    });
  });

  describe('проверка кнопок навигации при переполнении', () => {
    const mockScrollTo = jest.fn();

    beforeEach(() => {
      jest.spyOn(useOverflowHook, 'useOverflow').mockReturnValue(true);
      jest.spyOn(useScrollElementsHook, 'useScrollElements').mockReturnValue({
        refs: steps.map(() => React.createRef()),
        scrollTo: mockScrollTo,
      });
      mockScrollTo.mockClear();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('кнопки навигации отображаются при isOverflow=true', () => {
      renderComponent();
      const leftButton = getRender().querySelector(
        '.ProgressStepBar-Button_side_left',
      );
      const rightButton = getRender().querySelector(
        '.ProgressStepBar-Button_side_right',
      );
      expect(leftButton).toBeInTheDocument();
      expect(rightButton).toBeInTheDocument();
    });

    it('клик по кнопке "вправо" вызывает scrollTo со следующим индексом', () => {
      renderComponent({ activeStepIndex: 0 });

      const rightButton = getRender().querySelector(
        '.ProgressStepBar-Button_side_right',
      );
      expect(rightButton).toBeInTheDocument();

      fireEvent.click(rightButton!);

      expect(mockScrollTo).toHaveBeenCalledWith(1);
    });

    it('клик по кнопке "влево" вызывает scrollTo с предыдущим индексом', () => {
      renderComponent({ activeStepIndex: 1 });

      const leftButton = getRender().querySelector(
        '.ProgressStepBar-Button_side_left',
      );
      expect(leftButton).toBeInTheDocument();

      fireEvent.click(leftButton!);

      expect(mockScrollTo).toHaveBeenCalledWith(0);
    });

    it('клик по кнопке "вправо" на последнем элементе вызывает scrollTo c последним индексом', () => {
      renderComponent({ activeStepIndex: steps.length - 1 });

      const rightButton = getRender().querySelector(
        '.ProgressStepBar-Button_side_right',
      );
      expect(rightButton).toBeInTheDocument();

      fireEvent.click(rightButton!);

      expect(mockScrollTo).toHaveBeenCalledWith(steps.length - 1);
    });

    it('клик по кнопке "влево" на первом элементе вызывает scrollTo с первым индексом', () => {
      renderComponent({ activeStepIndex: 0 });

      const leftButton = getRender().querySelector(
        '.ProgressStepBar-Button_side_left',
      );
      expect(leftButton).toBeInTheDocument();

      fireEvent.click(leftButton!);

      expect(mockScrollTo).toHaveBeenCalledWith(0);
    });
  });
});
