import { IconComponent } from '@consta/icons/Icon';
import { IconDinosaur } from '@consta/icons/IconDinosaur';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import {
  progressStepBarPropDirection,
  progressStepBarPropPosition,
  progressStepBarPropSize,
  progressStepBarPropStatus,
} from '../helpers';
import {
  cnProgressStepBarItem,
  ProgressStepBarItem,
} from '../ProgressStepBarItem/ProgressStepBarItem';

type ProgressStepBarItemProps = React.ComponentProps<
  typeof ProgressStepBarItem
>;

const testId = 'ProgressStepBarItem';

const renderComponent = (props: ProgressStepBarItemProps) => {
  return render(<ProgressStepBarItem {...props} data-testid={testId} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

function getButton() {
  return getRender().querySelector('button');
}

describe('Компонент ProgressStepBarItem', () => {
  it('рендерится без ошибок', () => {
    expect(() =>
      renderComponent({
        direction: 'horizontal',
        size: 'm',
      }),
    ).not.toThrow();
  });

  describe('проверка props', () => {
    it('className применяется', () => {
      const className = 'test-class';
      renderComponent({
        direction: 'horizontal',
        size: 'm',
        className,
      });
      expect(getRender()).toHaveClass(className);
    });

    it('label отображается', () => {
      const label = 'Test Label';
      renderComponent({ direction: 'horizontal', size: 'm', label });
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    it('content отображается', () => {
      const contentText = 'Test Content';
      renderComponent({
        direction: 'horizontal',
        size: 'm',
        content: <div>{contentText}</div>,
      });
      expect(screen.getByText(contentText)).toBeInTheDocument();
    });

    it('point (number) отображается', () => {
      const point = 5;
      renderComponent({ direction: 'horizontal', size: 'm', point });
      expect(screen.getByText(point)).toBeInTheDocument();
    });

    it('point (Icon) отображается', () => {
      const Icon: IconComponent = IconDinosaur;
      renderComponent({ direction: 'horizontal', size: 'm', point: Icon });
      expect(
        getRender().querySelector(`.${cnProgressStepBarItem('PointIcon')}`),
      ).toBeInTheDocument();
    });

    it('progress отображается', () => {
      renderComponent({ direction: 'horizontal', size: 'm', progress: true });
      expect(getRender().querySelector('.ProgressSpin')).toBeInTheDocument();
    });

    it('onClick вызывается', () => {
      const handleClick = jest.fn();
      renderComponent({
        direction: 'horizontal',
        size: 'm',
        onClick: handleClick,
      });
      const button = getButton();
      expect(button).not.toBeNull();
      fireEvent.click(button!);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('ref устанавливается', () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent({ direction: 'horizontal', size: 'm', ref });
      expect(ref.current).toBe(getRender());
    });

    it('pointRef устанавливается', () => {
      const pointRef = React.createRef<HTMLButtonElement>();
      renderComponent({ direction: 'horizontal', size: 'm', pointRef });
      expect(pointRef.current).toBe(getButton());
    });

    describe('проверка direction', () => {
      progressStepBarPropDirection.forEach((direction) => {
        it(`присваивает класс для direction=${direction}`, () => {
          renderComponent({ direction, size: 'm' });
          expect(getRender()).toHaveClass(cnProgressStepBarItem({ direction }));
        });
      });
    });

    describe('проверка size', () => {
      progressStepBarPropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ direction: 'horizontal', size });
          expect(getRender()).toHaveClass(cnProgressStepBarItem({ size }));
        });
      });
    });

    describe('проверка status', () => {
      progressStepBarPropStatus.forEach((status) => {
        it(`присваивает класс для status=${status}`, () => {
          renderComponent({ direction: 'horizontal', size: 'm', status });
          expect(getRender()).toHaveClass(cnProgressStepBarItem({ status }));
        });
      });
    });

    describe('проверка position', () => {
      progressStepBarPropPosition.forEach((position) => {
        it(`присваивает класс для position=${position}`, () => {
          renderComponent({ direction: 'horizontal', size: 'm', position });
          expect(getRender()).toHaveClass(cnProgressStepBarItem({ position }));
        });
      });
    });

    it('tooltip отображается по наведению', () => {
      const tooltipContent = 'Test Tooltip';
      renderComponent({
        direction: 'horizontal',
        size: 'm',
        tooltipContent,
      });
      const button = getButton();
      expect(button).not.toBeNull();
      fireEvent.mouseEnter(button!);
      expect(screen.getByText(tooltipContent)).toBeInTheDocument();
    });
  });
});
