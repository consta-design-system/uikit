import { act, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { Button } from '##/components/Button';
import {
  appearTimeoutDefault,
  exitTimeoutDefault,
  TooltipProps,
  withTooltip,
} from '##/hocs/withTooltip';
import { animateTimeout, cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';

const testId = 'withTooltip';
const tooltipRole = 'Tooltip';

const ButtonWithTooltip = withTooltip()(Button);

const renderComponent = (
  props: TooltipProps,
  buttonProps: {
    onClick?: React.MouseEventHandler;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
  } = {},
) => {
  return render(
    <ButtonWithTooltip
      {...buttonProps}
      data-testid={testId}
      label="Button"
      tooltipProps={{ ...props, role: tooltipRole }}
    />,
  );
};

function getComponent() {
  return screen.getByTestId(testId);
}

function getTooltips() {
  return screen.queryAllByRole(tooltipRole);
}

function getTooltip(index = 0) {
  return screen.queryAllByRole(tooltipRole)[index];
}

describe('HOC withTooltip', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  it('открывается/закрывается по наведению с задержкой', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent({ content: 'mouseover' });
    });

    const component = getComponent();

    fireEvent.mouseEnter(component);

    act(() => {
      jest.advanceTimersByTime(appearTimeoutDefault + animateTimeout);
    });

    const tooltip = getTooltip();
    expect(tooltip).not.toBeNull();

    fireEvent.mouseLeave(component);

    act(() => {
      jest.advanceTimersByTime(exitTimeoutDefault + animateTimeout);
    });

    const tooltipUnVisible = getTooltip();

    expect(tooltipUnVisible).toHaveClass(
      cnMixPopoverAnimate({ animate: 'exiting' }),
    );
  });
  it('открывается/закрывается по onClick компонента', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent({ mode: 'click', content: 'click' });
    });

    const component = getComponent();
    fireEvent.click(component);
    act(() => {
      jest.advanceTimersByTime(animateTimeout);
    });

    const tooltip = getTooltip();
    expect(tooltip).not.toBeNull();

    fireEvent.click(component);
    act(() => {
      jest.advanceTimersByTime(animateTimeout);
    });

    const tooltipUnVisible = getTooltips();

    expect(tooltipUnVisible).toEqual([]);
  });

  it('если не передать content, то тултип не должен отображаться', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent({ mode: 'click', content: undefined });
    });

    const component = getComponent();
    fireEvent.click(component);

    act(() => {
      jest.advanceTimersByTime(animateTimeout);
    });

    const tooltipUnVisible = getTooltips();
    expect(tooltipUnVisible).toEqual([]);
  });

  it('onClick компонента срабатывает', () => {
    const onClick = jest.fn();
    renderComponent({ mode: 'click', content: 'content' }, { onClick });
    const component = getComponent();
    fireEvent.click(component);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('onMouseEnter компонента срабатывает', () => {
    const onMouseEnter = jest.fn();
    renderComponent({ mode: 'click', content: 'content' }, { onMouseEnter });
    const component = getComponent();
    fireEvent.mouseEnter(component);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('onMouseLeave компонента срабатывает', () => {
    const onMouseLeave = jest.fn();
    renderComponent({ mode: 'click', content: 'content' }, { onMouseLeave });
    const component = getComponent();
    fireEvent.mouseLeave(component);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('onClick тултипа срабатывает', () => {
    jest.useFakeTimers();
    const onClick = jest.fn();
    act(() => {
      renderComponent({ mode: 'click', content: 'content', onClick });
    });

    const component = getComponent();
    fireEvent.click(component);

    act(() => {
      jest.advanceTimersByTime(animateTimeout);
    });

    const tooltip = getTooltip();
    fireEvent.click(tooltip);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('onMouseEnter тултипа срабатывает', () => {
    jest.useFakeTimers();
    const onMouseEnter = jest.fn();
    act(() => {
      renderComponent({ mode: 'click', content: 'content', onMouseEnter });
    });

    const component = getComponent();
    fireEvent.click(component);

    act(() => {
      jest.advanceTimersByTime(animateTimeout);
    });

    const tooltip = getTooltip();
    fireEvent.mouseEnter(tooltip);

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('onMouseLeave тултипа срабатывает', () => {
    jest.useFakeTimers();
    const onMouseLeave = jest.fn();
    act(() => {
      renderComponent({ mode: 'click', content: 'content', onMouseLeave });
    });

    const component = getComponent();
    fireEvent.click(component);

    act(() => {
      jest.advanceTimersByTime(animateTimeout);
    });

    const tooltip = getTooltip();
    fireEvent.mouseLeave(tooltip);

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});
