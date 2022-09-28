import { act, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { Button } from '../../../components/Button/Button';
import {
  appearTimeoutDefault,
  exitTimeoutDefault,
  TooltipProps,
  withTooltip,
} from '../withTooltip';

const testId = 'withTooltip';
const tooltipRole = 'Tooltip';

const ButtonWithTooltip = withTooltip()(Button);

const renderComponent = (props: TooltipProps) => {
  return render(
    <ButtonWithTooltip
      data-testid={testId}
      label="Button"
      tooltipProps={{ role: tooltipRole, ...props }}
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
      renderComponent({});
    });

    const component = getComponent();

    fireEvent.mouseEnter(component);
    act(() => {
      jest.advanceTimersByTime(appearTimeoutDefault);
    });

    const tooltip = getTooltip();
    expect(tooltip).not.toBeNull();

    fireEvent.mouseLeave(component);
    act(() => {
      jest.advanceTimersByTime(exitTimeoutDefault);
    });

    const tooltipUnVisible = getTooltips();

    expect(tooltipUnVisible).toEqual([]);
  });
  it('открывается/закрывается по onClick компонента', () => {
    renderComponent({ mode: 'click' });

    const component = getComponent();
    fireEvent.click(component);

    const tooltip = getTooltip();
    expect(tooltip).not.toBeNull();

    fireEvent.click(component);

    const tooltipUnVisible = getTooltips();

    expect(tooltipUnVisible).toEqual([]);
  });
});
