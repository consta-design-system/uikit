import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Popover, PopoverProps } from '../Popover';

const testId = 'popover';
const targetTestId = 'target';
const popoverContentTestId = 'popoverContent';
const outsideTestId = 'outside';

const getRender = () => screen.getByTestId(testId);
const getPopoverContent = () => screen.getByTestId(popoverContentTestId);
const getOutside = () => screen.getByTestId(outsideTestId);

type TestProps = PopoverProps & { isOpen: boolean };

const renderComponent = ({ isOpen, children, ...popoverProps }: TestProps) => {
  const ref = React.createRef<HTMLDivElement>();
  return render(
    <>
      <div data-testid={outsideTestId} />
      <div data-testid={targetTestId} ref={ref}>
        target
      </div>
      {isOpen && (
        <Popover {...popoverProps} anchorRef={ref} data-testid={testId}>
          <div data-testid={popoverContentTestId}>popoverContent</div>
          {children as React.ReactNode}
        </Popover>
      )}
    </>,
  );
};

describe('Компонент Popover', () => {
  it('должен рендериться без ошибок', () => {
    renderComponent({ isOpen: true });
    expect(getRender()).toBeInTheDocument();
    expect(getPopoverContent()).toBeInTheDocument();
  });

  it('вызывает onClickOutside при клике за пределами компонента', () => {
    const onClickOutside = jest.fn();
    renderComponent({ isOpen: true, onClickOutside });

    const outside = getOutside();
    fireEvent.mouseDown(outside);

    expect(onClickOutside).toHaveBeenCalledWith(expect.any(MouseEvent));
  });

  it('рендерится в указанный контейнер', () => {
    const portal = document.createElement('div');
    portal.setAttribute('id', 'portal');
    document.body.appendChild(portal);

    renderComponent({ isOpen: true, container: portal });

    expect(portal).toContainElement(getRender());
    document.body.removeChild(portal);
  });

  it('присваивает className', () => {
    const className = 'test-classname';
    renderComponent({ isOpen: true, className });
    expect(getRender()).toHaveClass(className);
  });

  it('присваивает ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderComponent({ isOpen: true, ref });
    expect(ref.current).toBe(getRender());
  });

  it('присваивает viewportRef', () => {
    const viewportRef = React.createRef<HTMLDivElement>();
    const viewportTestId = 'viewport';
    render(
      <div ref={viewportRef} data-testid={viewportTestId}>
        <Popover viewportRef={viewportRef} data-testid={testId}>
          <div data-testid={popoverContentTestId} />
        </Popover>
      </div>,
    );
    expect(getRender()).toBeInTheDocument();
    expect(viewportRef.current).toBe(screen.getByTestId(viewportTestId));
  });

  describe('проверка isInteractive', () => {
    it('при isInteractive=true можно взаимодействовать с содержимым поповера', () => {
      const onClick = jest.fn();
      renderComponent({
        isOpen: true,
        isInteractive: true,
        children: (
          <button data-testid="popoverButton" onClick={onClick} type="button">
            button
          </button>
        ),
      });

      const button = screen.getByTestId('popoverButton');
      fireEvent.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('при isInteractive=false нельзя взаимодействовать с содержимым поповера', async () => {
      const onClick = jest.fn();
      renderComponent({
        isOpen: true,
        isInteractive: false,
        children: (
          <button data-testid="popoverButton" onClick={onClick} type="button">
            button
          </button>
        ),
      });

      const button = screen.getByTestId('popoverButton');

      expect(userEvent.click(button)).rejects.toThrow();

      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
