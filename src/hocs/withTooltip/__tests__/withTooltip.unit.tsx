import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { Button } from '##/components/Button';
import {
  appearTimeoutDefault,
  exitTimeoutDefault,
  TooltipProps,
  withTooltip,
} from '##/hocs/withTooltip';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
  tick,
} from '##/utils/vitest';

createRoot();
clearStack();

const testId = 'withTooltip';
const tooltipRole = 'Tooltip';

const ButtonWithTooltip = withTooltip()(Button);

const renderComponent = (
  ctx: TestContext,
  props: TooltipProps,
  buttonProps: {
    onClick?: React.MouseEventHandler;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
  } = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <ButtonWithTooltip
          {...buttonProps}
          data-testid={testId}
          label="Button"
          tooltipProps={{
            ...props,
            role: tooltipRole,
            container: document.getElementById(testPopoverId(ctx))!,
          }}
        />
      </reatomContext.Provider>,
    );
  });
};

function getComponent(ctx: TestContext) {
  return document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;
}

// function getTooltips() {
//   return document.querySelectorAll(`[role="${tooltipRole}"]`);
// }

function getTooltip(ctx: TestContext, index = 0) {
  return document.querySelector(
    `#${testPopoverId(ctx)} *[role="${tooltipRole}"]`,
  ) as HTMLElement;
}

describe.concurrent('HOC withTooltip', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, { content: 'test' })).not.toThrow();
    }));

  test('открывается/закрывается по наведению с задержкой', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { content: 'mouseover' });

      const component = getComponent(ctx);

      fireEvent.mouseEnter(component);

      await wrap(tick());
      await wrap(sleep(appearTimeoutDefault + animateTimeout));

      expect(getTooltip(ctx)).not.toBeNull();

      fireEvent.mouseLeave(component);

      await wrap(tick());
      await wrap(sleep(exitTimeoutDefault + animateTimeout));

      expect(getTooltip(ctx)).toBeNull();
    }));

  test('открывается/закрывается по onClick компонента', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { mode: 'click', content: 'click' });

      const component = getComponent(ctx);
      fireEvent.click(component);
      await wrap(tick());
      await wrap(sleep(appearTimeoutDefault + animateTimeout));

      expect(getTooltip(ctx)).not.toBeNull();

      fireEvent.click(component);
      await wrap(tick());
      await wrap(sleep(exitTimeoutDefault + animateTimeout));

      expect(getTooltip(ctx)).toBeNull();
    }));

  test('если не передать content, то тултип не должен отображаться', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { mode: 'click', content: undefined });

      const component = getComponent(ctx);
      fireEvent.click(component);

      await wrap(tick());
      await wrap(sleep(appearTimeoutDefault + animateTimeout));

      expect(getTooltip(ctx)).toBeNull();
    }));

  test('onClick компонента срабатывает', (ctx) =>
    context.start(async () => {
      const onClick = vi.fn();
      renderComponent(ctx, { mode: 'click', content: 'content' }, { onClick });
      const component = getComponent(ctx);
      fireEvent.click(component);
      expect(onClick).toHaveBeenCalledTimes(1);
    }));

  test('onMouseEnter компонента срабатывает', (ctx) =>
    context.start(async () => {
      const onMouseEnter = vi.fn();
      renderComponent(
        ctx,
        { mode: 'click', content: 'content' },
        { onMouseEnter },
      );
      const component = getComponent(ctx);
      fireEvent.mouseEnter(component);
      expect(onMouseEnter).toHaveBeenCalledTimes(1);
    }));

  test('onMouseLeave компонента срабатывает', (ctx) =>
    context.start(async () => {
      const onMouseLeave = vi.fn();
      renderComponent(
        ctx,
        { mode: 'click', content: 'content' },
        { onMouseLeave },
      );
      const component = getComponent(ctx);
      fireEvent.mouseLeave(component);
      expect(onMouseLeave).toHaveBeenCalledTimes(1);
    }));

  test('onClick тултипа срабатывает', (ctx) =>
    context.start(async () => {
      const onClick = vi.fn();
      renderComponent(ctx, { mode: 'click', content: 'content', onClick });

      const component = getComponent(ctx);
      fireEvent.click(component);

      await wrap(tick());
      await wrap(sleep(appearTimeoutDefault + animateTimeout));

      fireEvent.click(getTooltip(ctx));

      expect(onClick).toHaveBeenCalledTimes(1);
    }));

  test('onMouseEnter тултипа срабатывает', (ctx) =>
    context.start(async () => {
      const onMouseEnter = vi.fn();
      renderComponent(ctx, { mode: 'click', content: 'content', onMouseEnter });

      const component = getComponent(ctx);
      fireEvent.click(component);

      await wrap(tick());
      await wrap(sleep(appearTimeoutDefault + animateTimeout));

      fireEvent.mouseEnter(getTooltip(ctx));

      expect(onMouseEnter).toHaveBeenCalledTimes(1);
    }));

  test('onMouseLeave тултипа срабатывает', (ctx) =>
    context.start(async () => {
      const onMouseLeave = vi.fn();
      renderComponent(ctx, { mode: 'click', content: 'content', onMouseLeave });

      const component = getComponent(ctx);
      fireEvent.click(component);

      await wrap(tick());
      await wrap(sleep(appearTimeoutDefault + animateTimeout));

      fireEvent.mouseLeave(getTooltip(ctx));

      expect(onMouseLeave).toHaveBeenCalledTimes(1);
    }));
});
