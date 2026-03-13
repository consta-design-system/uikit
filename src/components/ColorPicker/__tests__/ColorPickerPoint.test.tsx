import { render, screen } from '@testing-library/react';
import React from 'react';

import { cnColorPickerPoint, ColorPickerPoint } from '../ColorPickerPoint';

type ColorPickerPointProps = React.ComponentProps<typeof ColorPickerPoint>;

const testId = cnColorPickerPoint();

function getRender() {
  return screen.getByTestId(testId);
}

const renderComponent = (props: ColorPickerPointProps) => {
  return render(<ColorPickerPoint data-testid={testId} {...props} />);
};

describe('Компонент ColorPickerPoint', () => {
  it('должен рендериться без ошибок', () => {
    expect(() =>
      renderComponent({
        color: '#ff0000',
      }),
    ).not.toThrow();
  });

  describe('проверка props', () => {
    const color = '#00ff00';

    describe('проверка className', () => {
      it('присваивает дополнительный класс', () => {
        const className = 'custom-class';
        renderComponent({ color, className });
        expect(getRender()).toHaveClass(className);
      });
    });

    describe('проверка style', () => {
      it('присваивает дополнительные стили', () => {
        const style = { color: 'red' };
        renderComponent({ color, style });
        expect(getRender()).toHaveStyle(style);
      });
    });

    describe('проверка ref', () => {
      it('ref присваивается элементу', () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent({ color, ref });
        expect(ref.current).toBe(getRender());
      });
    });

    describe('проверка color', () => {
      it('цвет применяется к внутреннему элементу', () => {
        const color = '#123456';
        renderComponent({ color });
        const fillElement = getRender().querySelector(
          `.${cnColorPickerPoint('Fill')}`,
        );
        expect(fillElement).toHaveStyle({ backgroundColor: color });
      });

      it('цвет корректно передается через style', () => {
        const color = 'rgb(255, 0, 0)';
        renderComponent({ color });
        const fillElement = getRender().querySelector(
          `.${cnColorPickerPoint('Fill')}`,
        );
        expect(fillElement).toHaveStyle({ backgroundColor: color });
      });
    });
  });
});
