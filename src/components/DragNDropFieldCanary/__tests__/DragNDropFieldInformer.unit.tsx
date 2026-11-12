import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createIconMock } from '##/../__mocks__/IconMock';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { DragNDropFieldInformer } from '../DragNDropFieldInformer';

createRoot();
clearStack();

const testId = 'DragNDropFieldInformer';

type Props = React.ComponentProps<typeof DragNDropFieldInformer>;

const renderComponent = (ctx: TestContext, props: Props = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <DragNDropFieldInformer data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const iconText = 'TestIcon';
const Icon = createIconMock(iconText);

const getRender = (ctx: TestContext) =>
  document
    .getElementById(testRootId(ctx))
    ?.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
const getButton = (ctx: TestContext) => getRender(ctx)?.querySelector('button');
const getProgress = (ctx: TestContext) =>
  getRender(ctx)?.querySelector('[class*="DragNDropFieldInformer-Progress"]');

describe('Компонент DragNDropFieldInformer', () => {
  test('должен рендериться без ошибок', async (ctx) => {
    await context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    });
  });

  test('должен присваиваться дополнительный className', async (ctx) => {
    await context.start(async () => {
      const className = 'custom-class';
      renderComponent(ctx, { className });

      await tick();

      expect(getRender(ctx)).toHaveClass(className);
    });
  });

  test('ref должен быть присвоен', async (ctx) => {
    await context.start(async () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent(ctx, { ref });

      await tick();

      expect(ref.current).toBe(getRender(ctx));
    });
  });

  test('должен отображаться текст', async (ctx) => {
    await context.start(async () => {
      const text = 'Test text';
      renderComponent(ctx, { text });

      await tick();

      expect(getRender(ctx)).toHaveTextContent(text);
    });
  });

  describe('проверка icon', () => {
    test('иконка отображается', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { icon: Icon });

        await tick();

        expect(getRender(ctx)).toHaveTextContent(iconText);
      });
    });

    test('иконка не отображается в состоянии loading', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { icon: Icon, loading: true });

        await tick();

        expect(getRender(ctx)).not.toHaveTextContent(iconText);
      });
    });
  });

  describe('проверка loading', () => {
    test('отображается ProgressSpin при loading=true', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { loading: true });

        await tick();

        expect(getProgress(ctx)).toBeInTheDocument();
      });
    });

    test('отображается ProgressSpin при loading={50}', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { loading: 50 });

        await tick();

        expect(getProgress(ctx)).toBeInTheDocument();
      });
    });

    test('не отображается ProgressSpin при loading=false', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { loading: false });

        await tick();

        expect(getProgress(ctx)).not.toBeInTheDocument();
      });
    });
  });

  describe('проверка кнопки', () => {
    test('кнопка не отображается по умолчанию', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        expect(getButton(ctx)).not.toBeInTheDocument();
      });
    });

    test('кнопка отображается c withButton=true', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { withButton: true });

        await tick();

        expect(getButton(ctx)).toBeInTheDocument();
      });
    });

    test('на кнопке отображается иконка', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { withButton: true, buttonIcon: Icon });

        await tick();

        expect(getButton(ctx)).toHaveTextContent(iconText);
      });
    });

    test('у кнопки есть title', async (ctx) => {
      await context.start(async () => {
        const buttonLabel = 'Test title';
        renderComponent(ctx, { withButton: true, buttonLabel });

        await tick();

        expect(getButton(ctx)).toHaveAttribute('title', buttonLabel);
      });
    });

    test('onButtonClick вызывается при клике', async (ctx) => {
      await context.start(async () => {
        const onButtonClick = vi.fn();
        renderComponent(ctx, { withButton: true, onButtonClick });

        await tick();

        const button = getButton(ctx)!;
        fireEvent.click(button);
        expect(onButtonClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
