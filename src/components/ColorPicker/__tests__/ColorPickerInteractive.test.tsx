import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import {
  cnColorPickerInteractive,
  ColorPickerInteractive,
} from '../ColorPickerInteractive';

type ColorPickerInteractiveProps = React.ComponentProps<
  typeof ColorPickerInteractive
>;

const testId = cnColorPickerInteractive();

function getRender() {
  return screen.getByTestId(testId);
}

const renderComponent = (
  props: Omit<ColorPickerInteractiveProps, 'children'>,
) => {
  return render(
    <ColorPickerInteractive data-testid={testId} {...props}>
      {null}
    </ColorPickerInteractive>,
  );
};

describe('Компонент ColorPickerInteractive', () => {
  it('должен рендериться без ошибок', () => {
    expect(() =>
      renderComponent({
        onMove: jest.fn(),
        onKey: jest.fn(),
      }),
    ).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка className', () => {
      it('присваивает дополнительный класс', () => {
        const className = 'custom-class';
        renderComponent({ onMove: jest.fn(), onKey: jest.fn(), className });
        expect(getRender()).toHaveClass(className);
      });
    });

    describe('проверка style', () => {
      it('присваивает дополнительные стили', () => {
        const style = { color: 'red' };
        renderComponent({ onMove: jest.fn(), onKey: jest.fn(), style });
        expect(getRender()).toHaveStyle(style);
      });
    });
  });

  describe('проверка взаимодействия', () => {
    it('вызывает onMove при клике на левую кнопку', () => {
      const onMove = jest.fn();
      renderComponent({ onMove, onKey: jest.fn() });

      const buttons = screen.getAllByRole('button', { hidden: true });
      const leftButton = buttons[0];
      fireEvent.click(leftButton);

      expect(onMove).toHaveBeenCalledTimes(1);
      expect(onMove).toHaveBeenCalledWith({ left: 0, top: 0 });
    });

    it('вызывает onMove при клике на правую кнопку', () => {
      const onMove = jest.fn();
      renderComponent({ onMove, onKey: jest.fn() });

      const buttons = screen.getAllByRole('button', { hidden: true });
      const rightButton = buttons[1];
      fireEvent.click(rightButton);

      expect(onMove).toHaveBeenCalledTimes(1);
      expect(onMove).toHaveBeenCalledWith({ left: 1, top: 0 });
    });

    it('вызывает onKey при нажатии клавиш стрелок', () => {
      const onKey = jest.fn();
      renderComponent({ onMove: jest.fn(), onKey });

      const slider = screen.getByRole('slider');
      fireEvent.keyDown(slider, { keyCode: 39 }); // ArrowRight

      expect(onKey).toHaveBeenCalledTimes(1);
      expect(onKey).toHaveBeenCalledWith({ left: 0.05, top: 0 });
    });

    it('вызывает onKey при нажатии стрелки вниз', () => {
      const onKey = jest.fn();
      renderComponent({ onMove: jest.fn(), onKey });

      const slider = screen.getByRole('slider');
      fireEvent.keyDown(slider, { keyCode: 40 }); // ArrowDown

      expect(onKey).toHaveBeenCalledTimes(1);
      expect(onKey).toHaveBeenCalledWith({ left: 0, top: 0.05 });
    });

    it('вызывает onMove при mousedown и mousemove', () => {
      const onMove = jest.fn();
      renderComponent({ onMove, onKey: jest.fn() });

      const slider = screen.getByRole('slider');
      fireEvent.mouseDown(slider, { clientX: 50, clientY: 50 });
      fireEvent.mouseMove(slider, { clientX: 100, clientY: 100 });

      // onMove должен вызываться хотя бы один раз
      expect(onMove).toHaveBeenCalled();
    });

    // Пропускаем тест touch из-за сложности имитации TouchList
  });
});
