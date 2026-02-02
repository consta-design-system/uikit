import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { useRefs } from '##/hooks/useRefs';

import { useHover, UseHoverProps } from '../useHover';

const testId = 'useHover';

const TestComponent = (props: Omit<UseHoverProps, 'refs'>) => {
  const refs = useRefs<HTMLDivElement>(2);

  useHover({
    ...props,
    refs,
  });

  return (
    <>
      {refs.map((ref, index) => (
        <div key={index} ref={ref} data-testid={`${testId}-${index}`} />
      ))}
    </>
  );
};

export const delay = (timeout: number) =>
  act(() => jest.advanceTimersByTime(timeout));

const renderComponent = (props: Omit<UseHoverProps, 'refs'>) =>
  act(() => render(<TestComponent {...props} />));

export const getElement = (index: number = 0) =>
  screen.getByTestId(`${testId}-${index}`);
export const hoverOnElement = (number: number = 0) =>
  fireEvent.mouseEnter(getElement(number));

export const blurOnElement = (number: number = 0) =>
  fireEvent.mouseLeave(getElement(number));

describe(`Хук ${testId}`, () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  it('onHover должен вызываться при наведении', () => {
    jest.useFakeTimers();
    const onHover = jest.fn();
    renderComponent({ onHover, isActive: true });

    hoverOnElement();

    delay(0);

    expect(onHover).toHaveBeenCalled();
    expect(onHover).toHaveBeenCalledTimes(1);
  });
  it('onHover должен вызываться при наведении и с задержкой', () => {
    jest.useFakeTimers();
    const onHover = jest.fn();
    const hoverDelay = 100;
    renderComponent({ onHover, isActive: true, hoverDelay });

    hoverOnElement();

    expect(onHover).not.toHaveBeenCalled();

    delay(hoverDelay);

    expect(onHover).toHaveBeenCalled();
    expect(onHover).toHaveBeenCalledTimes(1);
  });

  it('onHover должен вызываться при наведении и с задержкой и не вызывается при повторных наведениях', () => {
    jest.useFakeTimers();
    const onHover = jest.fn();
    const hoverDelay = 100;
    renderComponent({ onHover, isActive: true, hoverDelay });

    hoverOnElement();

    expect(onHover).not.toHaveBeenCalled();
    delay(hoverDelay / 2);

    hoverOnElement();

    delay(hoverDelay / 2);
    expect(onHover).not.toHaveBeenCalled();

    hoverOnElement();
    delay(hoverDelay);
    expect(onHover).toHaveBeenCalled();
    expect(onHover).toHaveBeenCalledTimes(1);
  });

  it('onHover должен вызываться 1 раз если вызван на нескольких элементах в пределах таймаута', () => {
    jest.useFakeTimers();
    const onHover = jest.fn();
    const hoverDelay = 100;
    renderComponent({ onHover, isActive: true, hoverDelay });

    hoverOnElement();

    expect(onHover).not.toHaveBeenCalled();
    delay(hoverDelay / 2);

    hoverOnElement(1);

    delay(hoverDelay / 2);
    expect(onHover).not.toHaveBeenCalled();

    hoverOnElement(1);
    delay(hoverDelay);
    expect(onHover).toHaveBeenCalled();
    expect(onHover).toHaveBeenCalledTimes(1);
  });

  it('onHover не должен вызываться при isActive = false', () => {
    jest.useFakeTimers();
    const onHover = jest.fn();
    const hoverDelay = 100;
    renderComponent({ onHover, isActive: false, hoverDelay });

    hoverOnElement();

    expect(onHover).not.toHaveBeenCalled();

    delay(hoverDelay);

    expect(onHover).not.toHaveBeenCalled();
  });

  it('onHover не должен вызываться, если за ним вызывается onBlur в пределах таймаута', () => {
    jest.useFakeTimers();
    const onHover = jest.fn();
    const hoverDelay = 100;
    renderComponent({ onHover, isActive: true, hoverDelay });

    hoverOnElement();

    expect(onHover).not.toHaveBeenCalled();

    delay(hoverDelay / 2);
    blurOnElement();

    delay(hoverDelay);

    expect(onHover).not.toHaveBeenCalled();
  });

  it('onHover должен вызываться, если он вызывается за onBlur в пределах таймаута', () => {
    jest.useFakeTimers();
    const onHover = jest.fn();
    const hoverDelay = 100;
    renderComponent({
      onHover,
      isActive: true,
      hoverDelay,
      blurDelay: hoverDelay,
    });

    blurOnElement();

    expect(onHover).not.toHaveBeenCalled();

    delay(hoverDelay / 2);

    hoverOnElement();
    delay(hoverDelay);

    expect(onHover).toHaveBeenCalled();
  });

  it('onBlur должен вызываться при снятии курсора', () => {
    jest.useFakeTimers();
    const blurDelay = 100;
    const onBlur = jest.fn();
    renderComponent({
      onBlur,
      isActive: true,
      blurDelay,
    });

    hoverOnElement();

    delay(0);

    blurOnElement();

    delay(blurDelay);

    expect(onBlur).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('onBlur не должен вызываться если не было hover', () => {
    jest.useFakeTimers();
    const blurDelay = 100;
    const onBlur = jest.fn();
    renderComponent({
      onBlur,
      isActive: true,
      blurDelay,
    });

    delay(blurDelay);

    expect(onBlur).not.toHaveBeenCalled();
  });

  it('onBlur не должен вызываться при isActive = false', () => {
    jest.useFakeTimers();
    const blurDelay = 100;
    const onBlur = jest.fn();
    renderComponent({
      onBlur,
      isActive: false,
      blurDelay,
    });

    hoverOnElement();

    delay(0);

    blurOnElement();

    delay(blurDelay);

    expect(onBlur).not.toHaveBeenCalled();
  });

  it('onBlur должен вызываться последним в цепочке действий в пределах таймаута и 1 раз', () => {
    jest.useFakeTimers();
    const blurDelay = 100;
    const onBlur = jest.fn();
    renderComponent({
      onBlur,
      isActive: true,
      blurDelay,
      hoverDelay: blurDelay,
    });

    hoverOnElement();

    delay(blurDelay / 2);

    hoverOnElement(1);

    delay(blurDelay / 2);

    blurOnElement(1);

    delay(blurDelay / 2);

    hoverOnElement();

    delay(blurDelay / 2);

    blurOnElement();

    delay(blurDelay);

    expect(onBlur).not.toHaveBeenCalled();
  });
});
