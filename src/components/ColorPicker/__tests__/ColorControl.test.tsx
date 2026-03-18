import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import React from 'react';

import { ColorControl, ColorControlProps } from '../ColorControl';
import { hsvaModel } from '../models/hsvaModel';
import { HsvaColor } from '../types';

const testId = 'ColorControl';

function getRender() {
  return screen.getByTestId(testId);
}

// TODO: переписать renderComponent на использование дженериков
export type ColorControlComponent = <T>(
  props: ColorControlProps<T>,
) => RenderResult;

const renderComponent: ColorControlComponent = (props) => {
  return render(<ColorControl data-testid={testId} {...props} />);
};

describe('Компонент ColorControl', () => {
  it('должен рендериться без ошибок', () => {
    const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
    expect(() =>
      renderComponent({
        model: hsvaModel,
        value,
        onChange: jest.fn(),
      }),
    ).not.toThrow();
  });

  describe('проверка props', () => {
    const value: HsvaColor = { h: 120, s: 50, v: 75, a: 1 };

    describe('проверка className', () => {
      it('присваивает дополнительный класс', () => {
        const className = 'custom-class';
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          className,
        });
        expect(getRender()).toHaveClass(className);
      });
    });

    describe('проверка style', () => {
      it('присваивает дополнительные стили', () => {
        const style = { color: 'red' };
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          style,
        });
        expect(getRender()).toHaveStyle(style);
      });
    });

    describe('проверка ref', () => {
      it('ref присваивается элементу', () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent({ model: hsvaModel, value, onChange: jest.fn(), ref });
        expect(ref.current).toBe(getRender());
      });
    });

    describe('проверка disabled', () => {
      it('при disabled=true добавляет атрибут disabled на маркер и инпут', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          disabled: true,
        });
        const marker = screen.getByRole('button');
        expect(marker).toBeDisabled();
        const inputs = screen.getAllByRole('textbox');
        inputs.forEach((input) => {
          expect(input).toBeDisabled();
        });
      });

      it('при disabled=false не добавляет атрибут disabled', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          disabled: false,
        });
        const marker = screen.getByRole('button');
        expect(marker).not.toBeDisabled();
        const inputs = screen.getAllByRole('textbox');
        inputs.forEach((input) => {
          expect(input).not.toBeDisabled();
        });
      });
    });

    describe('проверка onlyMarker', () => {
      it('при onlyMarker=true не рендерит ColorPickerInput', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          onlyMarker: true,
        });
        const marker = screen.getByRole('button');
        expect(marker).toBeInTheDocument();
        const inputs = screen.queryAllByRole('textbox');
        expect(inputs).toHaveLength(0);
      });

      it('при onlyMarker=false (по умолчанию) рендерит ColorPickerInput', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
        });
        const marker = screen.getByRole('button');
        expect(marker).toBeInTheDocument();
        const inputs = screen.getAllByRole('textbox');
        expect(inputs.length).toBeGreaterThan(0);
      });
    });

    describe('проверка markerRef', () => {
      it('ref присваивается кнопке маркера', () => {
        const markerRef = React.createRef<HTMLButtonElement>();
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          markerRef,
        });
        expect(markerRef.current).toBe(screen.getByRole('button'));
      });
    });

    describe('проверка формата и alpha', () => {
      it('передает format и alpha в ColorPickerInput', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          format: 'hex',
          alpha: false,
        });
        const textBoxes = screen.getAllByRole('textbox');
        expect(textBoxes).toHaveLength(1);
        expect(textBoxes[0]).toHaveAttribute('type', 'text');
      });
    });
  });

  describe('проверка взаимодействия', () => {
    it('вызывает onChange при изменении значения в ColorPickerInput', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'hex',
        alpha: false,
      });
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '00ff00' } });
      fireEvent.blur(input);
      expect(onChange).toHaveBeenCalledTimes(1);
      const newColor = onChange.mock.calls[0][0];
      expect(newColor).toBeDefined();
    });
  });

  describe('проверка маппинга size и form для ColorMarker', () => {
    it('правильно маппит size xs -> xs', () => {
      const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange: jest.fn(),
        size: 'xs',
      });
      const marker = screen.getByRole('button');
      expect(marker).toHaveClass('ColorMarker_size_xs');
    });

    it('правильно маппит size s -> xs', () => {
      const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange: jest.fn(),
        size: 's',
      });
      const marker = screen.getByRole('button');
      expect(marker).toHaveClass('ColorMarker_size_xs');
    });

    it('правильно маппит size m -> s', () => {
      const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange: jest.fn(),
        size: 'm',
      });
      const marker = screen.getByRole('button');
      expect(marker).toHaveClass('ColorMarker_size_s');
    });

    it('правильно маппит size l -> m', () => {
      const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange: jest.fn(),
        size: 'l',
      });
      const marker = screen.getByRole('button');
      expect(marker).toHaveClass('ColorMarker_size_m');
    });

    it('правильно маппит form default -> default', () => {
      const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange: jest.fn(),
        form: 'default',
      });
      const marker = screen.getByRole('button');
      expect(marker).toHaveClass('ColorMarker_form_default');
    });

    it('правильно маппит form brick -> brick', () => {
      const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange: jest.fn(),
        form: 'brick',
      });
      const marker = screen.getByRole('button');
      expect(marker).toHaveClass('ColorMarker_form_brick');
    });

    it('правильно маппит form round -> round', () => {
      const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange: jest.fn(),
        form: 'round',
      });
      const marker = screen.getByRole('button');
      expect(marker).toHaveClass('ColorMarker_form_round');
    });
  });
});
