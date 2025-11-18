import { render, screen } from '@testing-library/react';
import React from 'react';

import { cn } from '../../../utils/bem';
import { ProgressLine } from '../ProgressLine';
import { ProgressLineProps, progressLinePropSize } from '../types';

const cnProgressLine = cn('ProgressLine');
const testId = 'ProgressLine';

const renderComponent = <ITEM,>(props: ProgressLineProps<ITEM>) => {
  return render(<ProgressLine {...props} data-testid={testId} />);
};

const getRender = () => screen.getByTestId(testId);

describe('Компонент ProgressLine', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });

  describe('проверка props', () => {
    it('присваивает className', () => {
      const className = 'test-class';
      renderComponent({ className });
      expect(getRender()).toHaveClass(className);
    });

    it('устанавливает ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent({ ref });
      expect(ref.current).toBe(getRender());
    });

    describe('проверка size', () => {
      progressLinePropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size });
          expect(getRender()).toHaveClass(cnProgressLine({ size }));
        });
      });
    });

    describe('проверка mode', () => {
      it('устанавливает mode="indeterminate" по умолчанию', () => {
        renderComponent({});
        expect(getRender()).toHaveClass(
          cnProgressLine({ mode: 'indeterminate' }),
        );
      });

      it('устанавливает mode="determinate" при наличии value', () => {
        renderComponent({ value: 50 });
        expect(getRender()).toHaveClass(
          cnProgressLine({ mode: 'determinate' }),
        );
      });

      it('устанавливает mode="step" при наличии steps', () => {
        renderComponent({ steps: ['Step 1'] });
        expect(getRender()).toHaveClass(cnProgressLine({ mode: 'step' }));
      });
    });

    describe('проверка steps', () => {
      const steps = ['Шаг 1', 'Шаг 2', 'Шаг 3'];

      it('отображает шаги', () => {
        renderComponent({ steps, getItemLabel: (item) => item });
        const stepElements = getRender().querySelectorAll(
          `.${cnProgressLine('Step')}`,
        );
        expect(stepElements.length).toBe(steps.length);
        steps.forEach((step) => {
          expect(screen.getByText(step)).toBeInTheDocument();
        });
      });

      it('не отображает шаги, если getItemLabel не передан', () => {
        renderComponent({ steps });
        const stepElements = getRender().querySelectorAll(
          `.${cnProgressLine('Label')}`,
        );
        expect(stepElements.length).toBe(0);
      });
    });

    describe('проверка value', () => {
      it('устанавливает CSS-переменную --progress-line-value', () => {
        renderComponent({ value: 30 });
        expect(getRender()).toHaveStyle('--progress-line-value: 0.3');
      });

      it('устанавливает --progress-line-value в 0, если value <= 0', () => {
        renderComponent({ value: -10 });
        expect(getRender()).toHaveStyle('--progress-line-value: 0');
      });

      it('устанавливает --progress-line-value в 1, если value >= 100', () => {
        renderComponent({ value: 110 });
        expect(getRender()).toHaveStyle('--progress-line-value: 1');
      });
    });
  });
});
