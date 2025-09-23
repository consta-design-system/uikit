import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { SliderLineProps } from '../helper';
import { SliderLine } from '../SliderLine/SliderLine';

const testId = 'SliderLine';

const defaultLines: SliderLineProps['lines'] = [
  { width: 50, active: true },
  { width: 50, active: false },
];

const renderComponent = (props: Partial<SliderLineProps> = {}) => {
  return render(
    <SliderLine data-testid={testId} lines={defaultLines} {...props} />,
  );
};

const getRender = () => {
  return screen.getByTestId(testId);
};

const getLines = () => {
  return getRender().querySelectorAll('.SliderLine-Line');
};

const getActiveLine = () => {
  return getRender().querySelector('.SliderLine-Line_active');
};

const getInactiveLine = () => {
  return getRender().querySelector(
    '.SliderLine-Line:not(.SliderLine-Line_active)',
  );
};

describe('Компонент SliderLine', () => {
  it('рендерится без ошибок', () => {
    expect(() => renderComponent()).not.toThrow();
  });

  it('рендерит правильное количество сегментов линии', () => {
    renderComponent();
    expect(getLines().length).toBe(defaultLines.length);
  });

  it('устанавливает правильную ширину для сегментов', () => {
    renderComponent();
    const lines = getLines();
    lines.forEach((line, index) => {
      expect(line).toHaveStyle(
        `--slider-line-size: ${defaultLines[index].width}%`,
      );
    });
  });

  describe('проверка props', () => {
    it('применяет класс для view="division"', () => {
      renderComponent({ view: 'division' });
      expect(getRender()).toHaveClass('SliderLine_view_division');
    });

    it('применяет класс active для активного сегмента', () => {
      renderComponent();
      expect(getActiveLine()).toBeInTheDocument();
      expect(getInactiveLine()).toBeInTheDocument();
    });

    it('применяет класс hovered для активного сегмента', () => {
      renderComponent({ hovered: true });
      expect(getActiveLine()).toHaveClass('SliderLine-Line_hovered');
      expect(getInactiveLine()).not.toHaveClass('SliderLine-Line_hovered');
    });

    it('применяет класс disabled для всех сегментов', () => {
      renderComponent({ disabled: true });
      getLines().forEach((line) => {
        expect(line).toHaveClass('SliderLine-Line_disabled');
      });
    });
  });

  describe('проверка onHover', () => {
    it('вызывает onHover при наведении на активный сегмент', () => {
      const onHover = jest.fn();
      renderComponent({ onHover });
      const activeLine = getActiveLine();

      fireEvent.mouseEnter(activeLine!);
      expect(onHover).toHaveBeenCalledWith(true);

      fireEvent.mouseLeave(activeLine!);
      expect(onHover).toHaveBeenCalledWith(false);
    });

    it('не вызывает onHover при наведении на неактивный сегмент', () => {
      const onHover = jest.fn();
      renderComponent({ onHover });
      const inactiveLine = getInactiveLine();

      fireEvent.mouseEnter(inactiveLine!);
      expect(onHover).not.toHaveBeenCalled();
    });

    it('не вызывает onHover, если disabled=true', () => {
      const onHover = jest.fn();
      renderComponent({ onHover, disabled: true });
      const activeLine = getActiveLine();

      fireEvent.mouseEnter(activeLine!);
      expect(onHover).not.toHaveBeenCalled();
    });
  });
});
