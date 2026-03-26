import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
  tick,
} from '##/utils/vitest';

import { cnSidebar, Sidebar, SidebarProps, sidebarPropSize } from '..';

createRoot();
clearStack();

const testId = 'Sidebar';

const renderComponent = (ctx: TestContext, props: SidebarProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Sidebar
            {...props}
            data-testid={testId}
            container={
              (document.getElementById(testPopoverId(ctx)) as HTMLDivElement)!
            }
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) => {
  return document.querySelector(
    `#${testPopoverId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;
};

const getSidebarContent = (ctx: TestContext) => {
  const render = getRender(ctx);
  return render.querySelector(`.${cnSidebar('Content')}`);
};

const getSidebarActions = (ctx: TestContext) => {
  const render = getRender(ctx);
  return render.querySelector(`.${cnSidebar('Actions')}`);
};

const getOverlay = (ctx: TestContext) => {
  return document.querySelector(
    `#${testPopoverId(ctx)} .${cnSidebar('Overlay')}`,
  );
};

describe.concurrent('Компонент Sidebar', () => {
  test('рендерится без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, { isOpen: true })).not.toThrow();
    }));

  test('SidebarContent отображается корректно', (ctx) =>
    context.start(async () => {
      const textContent = 'content';
      renderComponent(ctx, {
        isOpen: true,
        children: <Sidebar.Content>{textContent}</Sidebar.Content>,
      });
      await wrap(tick());
      const content = getSidebarContent(ctx);
      expect(content).toHaveTextContent(textContent);
    }));

  test('SidebarActions отображается корректно', (ctx) =>
    context.start(async () => {
      const textContent = 'content';
      renderComponent(ctx, {
        isOpen: true,
        children: <Sidebar.Actions>{textContent}</Sidebar.Actions>,
      });
      await wrap(tick());
      const actions = getSidebarActions(ctx);
      expect(actions).toHaveTextContent(textContent);
    }));

  describe.concurrent('проверка overlay', () => {
    test('overlay отображается при hasOverlay=true', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          isOpen: true,
          hasOverlay: true,
          children: <div>text</div>,
        });
        await wrap(tick());

        expect(getOverlay(ctx)).toBeInTheDocument();
      }));

    test('overlay не отображается при hasOverlay=false', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          isOpen: true,
          hasOverlay: false,
          children: <div>text</div>,
        });
        await wrap(tick());
        const overlay = getOverlay(ctx);
        expect(overlay).not.toBeInTheDocument();
      }));
  });

  describe.concurrent("проверка callback'ов", () => {
    test('onOpen вызывается при открытии', (ctx) =>
      context.start(async () => {
        const handleOpen = vi.fn();
        renderComponent(ctx, {
          isOpen: true,
          onOpen: handleOpen,
          children: <div>text</div>,
        });
        await wrap(tick());
        expect(handleOpen).toHaveBeenCalledTimes(1);
      }));

    test('onClose вызывается при закрытии', (ctx) =>
      context.start(async () => {
        const handleClose = vi.fn();
        renderComponent(ctx, {
          isOpen: false,
          onClose: handleClose,
          children: <div>text</div>,
        });
        await wrap(tick());
        expect(handleClose).toHaveBeenCalledTimes(1);
      }));

    test('onEsc вызывается при нажатии Escape', (ctx) =>
      context.start(async () => {
        const handleEsc = vi.fn();
        renderComponent(ctx, {
          isOpen: true,
          onEsc: handleEsc,
          children: <div>text</div>,
        });
        await wrap(tick());
        fireEvent.keyUp(document, { key: 'Escape' });
        expect(handleEsc).toHaveBeenCalledTimes(1);
      }));

    test('onClickOutside вызывается при клике вне сайдбара', (ctx) =>
      context.start(async () => {
        const handleClickOutside = vi.fn();
        renderComponent(ctx, {
          isOpen: true,
          onClickOutside: handleClickOutside,
          children: <div>text</div>,
        });
        await wrap(tick());
        const overlay = getOverlay(ctx);
        expect(overlay).toBeInTheDocument();
        overlay && fireEvent.mouseDown(overlay);
        expect(handleClickOutside).toHaveBeenCalledTimes(1);
      }));
  });

  describe.concurrent('проверка props', () => {
    test('присваивает ref', (ctx) =>
      context.start(async () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent(ctx, { isOpen: true, ref, children: '' });
        await wrap(tick());
        expect(ref.current).toBe(getRender(ctx));
      }));

    sidebarPropSize.forEach((size) => {
      test(`применяется класс для размера ${size}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            isOpen: true,
            size,
            children: <div>text</div>,
          });
          await wrap(tick());
          const sidebarWindow = getRender(ctx);
          expect(sidebarWindow).toHaveClass(cnSidebar('Window', { size }));
        }));
    });
  });
});
