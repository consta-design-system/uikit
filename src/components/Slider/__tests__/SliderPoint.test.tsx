import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { SliderPointProps } from '../helper';
import { SliderPoint } from '../SliderPoint/SliderPoint';

const testId = 'SliderPoint';

const buttonLabel = 0;

const defaultProps: SliderPointProps = {
  value: 50,
  position: 50,
  buttonLabel,
};

const renderComponent = (props: SliderPointProps) => {
  return render(<SliderPoint data-testid={testId} {...props} />);
};

const getRender = () => {
  return screen.getByTestId(testId);
};

const getTooltip = () => {
  return document.querySelector('.Tooltip');
};

describe('Компонент SliderPoint', () => {
  it('рендерится без ошибок', () => {
    expect(() => renderComponent(defaultProps)).not.toThrow();
  });

  describe('проверка props', () => {
    it('применяет disabled', () => {
      const onFocus = jest.fn();
      renderComponent({ ...defaultProps, disabled: true, onFocus });
      const point = getRender();

      fireEvent.focus(point);

      expect(point).toHaveClass('SliderPoint_disabled');
      expect(onFocus).not.toHaveBeenCalled();
    });

    it('применяет hovered', () => {
      renderComponent({ ...defaultProps, hovered: true });
      expect(getRender()).toHaveClass('SliderPoint_hovered');
    });

    it('применяет active', () => {
      renderComponent({ ...defaultProps, active: true });
      expect(getRender()).toHaveClass('SliderPoint_active');
    });

    it('устанавливает position', () => {
      const position = 75;
      renderComponent({ position });
      expect(getRender()).toHaveStyle(`--slider-button-left: ${position}%`);
    });

    it('устанавливает aria-label', () => {
      renderComponent(defaultProps);
      expect(getRender()).toHaveAttribute(
        'aria-label',
        `${buttonLabel}-button`,
      );
    });
  });

  describe("проверка callback'ов", () => {
    it('вызывает onHover при наведении', () => {
      const onHover = jest.fn();
      renderComponent({ ...defaultProps, onHover });
      const point = getRender();

      fireEvent.mouseOver(point);
      expect(onHover).toHaveBeenCalledWith(true);

      fireEvent.mouseOut(point);
      expect(onHover).toHaveBeenCalledWith(false);
    });

    it('вызывает handlePress при mousedown', () => {
      const handlePress = jest.fn();
      renderComponent({ ...defaultProps, handlePress });

      fireEvent.mouseDown(getRender());
      expect(handlePress).toHaveBeenCalledWith(buttonLabel);
    });

    it('вызывает onKeyPress при keydown', () => {
      const onKeyPress = jest.fn();
      renderComponent({ ...defaultProps, onKeyPress });

      fireEvent.keyDown(getRender(), { key: 'ArrowRight' });
      expect(onKeyPress).toHaveBeenCalled();
    });

    it('вызывает onFocus при focus и blur', () => {
      const onFocus = jest.fn();
      renderComponent({ ...defaultProps, onFocus });
      const point = getRender();

      fireEvent.focus(point);
      expect(onFocus).toHaveBeenCalledWith(expect.any(Object), buttonLabel);

      fireEvent.blur(point);
      expect(onFocus).toHaveBeenCalledWith(expect.any(Object), null);
    });
  });

  describe('проверка Tooltip', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    const popoverPosition: SliderPointProps['popoverPosition'] = {
      x: 50,
      y: 50,
    };

    const showHoverTooltip = () => {
      fireEvent.mouseOver(getRender());
      act(() => {
        jest.runAllTimers();
      });
    };

    it('появляется при наведении', () => {
      renderComponent({ ...defaultProps, withTooltip: true, popoverPosition });

      showHoverTooltip();

      expect(getTooltip()).toBeInTheDocument();
    });

    it('появляется при фокусе', () => {
      renderComponent({ ...defaultProps, withTooltip: true, popoverPosition });
      fireEvent.focus(getRender());

      act(() => {
        jest.runAllTimers();
      });

      expect(getTooltip()).toBeInTheDocument();
    });

    it('исчезает при потере фокуса', () => {
      renderComponent({ ...defaultProps, withTooltip: true, popoverPosition });
      const point = getRender();

      fireEvent.focus(getRender());

      act(() => {
        jest.runAllTimers();
      });

      expect(getTooltip()).toBeInTheDocument();

      fireEvent.blur(point);

      act(() => {
        jest.runAllTimers();
      });

      expect(getTooltip()).not.toBeInTheDocument();
    });

    it('использует tooltipFormatter', () => {
      const formatter = (value?: number | string) => `${value}%`;

      renderComponent({
        ...defaultProps,
        withTooltip: true,
        tooltipFormatter: formatter,
        popoverPosition,
      });

      showHoverTooltip();

      expect(getTooltip()?.textContent).toBe(formatter(defaultProps.value));
    });

    it('не показывается если withTooltip=false', () => {
      renderComponent({ ...defaultProps, withTooltip: false, popoverPosition });
      showHoverTooltip();

      expect(getTooltip()).not.toBeInTheDocument();
    });
  });
});
