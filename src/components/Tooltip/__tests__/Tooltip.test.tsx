import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Tooltip } from '../Tooltip';
import { TooltipProps } from '../types';

const testId = 'tooltip';
const targetTestId = 'target';
const tooltipContentTestId = 'popoverContent';
const outsideTestId = 'outside';

const getRender = () => screen.queryByTestId(testId);
const getTooltipContent = () => screen.queryByTestId(tooltipContentTestId);

type TestProps = TooltipProps;

const renderComponent = ({ ...tooltipProps }: TestProps) => {
  const ref = React.createRef<HTMLDivElement>();
  return render(
    <>
      <div data-testid={outsideTestId} />
      <div data-testid={targetTestId} ref={ref}>
        target
      </div>

      <Tooltip {...tooltipProps} anchorRef={ref} data-testid={testId}>
        <div data-testid={tooltipContentTestId}>tooltipContent</div>
        {tooltipProps.children}
      </Tooltip>
    </>,
  );
};

describe('Компонент Tooltip', () => {
  it('рендерится при isOpen=true', () => {
    renderComponent({ isOpen: true, children: '' });
    expect(getRender()).toBeInTheDocument();
    expect(getTooltipContent()).toBeInTheDocument();
  });

  it('не рендерится при isOpen=false', () => {
    renderComponent({ isOpen: false, children: '' });
    expect(getRender()).not.toBeInTheDocument();
    expect(getTooltipContent()).not.toBeInTheDocument();
  });

  it('присваивает ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderComponent({ isOpen: true, ref, children: '' });
    expect(ref.current).toBe(getRender());
  });

  it('присваивает className', () => {
    const className = 'test-classname';
    renderComponent({ isOpen: true, className, children: '' });
    expect(getRender()).toHaveClass(className);
  });

  describe('проверка isInteractive', () => {
    it('при isInteractive=true можно взаимодействовать с содержимым тултипа', () => {
      const onClick = jest.fn();
      renderComponent({
        isOpen: true,
        isInteractive: true,
        children: (
          <button data-testid="tooltipButton" onClick={onClick} type="button">
            button
          </button>
        ),
      });

      const button = screen.getByTestId('tooltipButton');
      fireEvent.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('при isInteractive=false нельзя взаимодействовать с содержимым тултипа', async () => {
      const onClick = jest.fn();
      renderComponent({
        isOpen: true,
        isInteractive: false,
        children: (
          <button data-testid="tooltipButton" onClick={onClick} type="button">
            button
          </button>
        ),
      });

      const button = screen.getByTestId('tooltipButton');

      expect(userEvent.click(button)).rejects.toThrow();

      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
