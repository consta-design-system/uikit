import { clearStack, context, top } from '@reatom/core';
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
} from '##/utils/vitest';

import {
  cnSidebar,
  Sidebar,
  SidebarProps,
  sidebarPropSize,
} from '../SidebarDeprecated';

createRoot();
clearStack();

const testId = cnSidebar();

const renderComponent = (ctx: TestContext, props: SidebarProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Sidebar
            {...props}
            data-testid={testId}
            container={document.getElementById(testPopoverId(ctx))!}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) => {
  return document.querySelector(
    `#${testPopoverId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement;
};
// aria-label="Overlay"
const getSidebarContent = (ctx: TestContext) => {
  return getRender(ctx).querySelector(`.${cnSidebar('Content')}`);
};

const getSidebarActions = (ctx: TestContext) => {
  return getRender(ctx).querySelector(`.${cnSidebar('Actions')}`);
};

const getOverlay = (ctx: TestContext) => {
  return document.querySelector(
    `#${testPopoverId(ctx)} [aria-label="Overlay"]`,
  ) as HTMLElement;
};

describe(`Компонент ${cnSidebar()}`, () => {
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

      const actions = getSidebarActions(ctx);
      expect(actions).toHaveTextContent(textContent);
    }));

  describe('проверка overlay', () => {
    test('overlay отображается при hasOverlay=true', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          isOpen: true,
          hasOverlay: true,
          children: <div>text</div>,
        });

        const overlay = getOverlay(ctx);

        expect(overlay).toBeInTheDocument();
      }));

    test('overlay не отображается при hasOverlay=false', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          isOpen: true,
          hasOverlay: false,
          children: <div>text</div>,
        });

        const overlay = getOverlay(ctx);

        expect(overlay).not.toBeInTheDocument();
      }));
  });

  describe("проверка callback'ов", () => {
    test('onEsc вызывается при нажатии Escape', (ctx) =>
      context.start(async () => {
        const handleEsc = vi.fn();
        renderComponent(ctx, { isOpen: true, onEsc: handleEsc });

        fireEvent.keyUp(document, { key: 'Escape' });

        expect(handleEsc).toHaveBeenCalledTimes(1);
      }));

    test('onClickOutside вызывается при клике вне сайдбара', (ctx) =>
      context.start(async () => {
        const handleClickOutside = vi.fn();
        renderComponent(ctx, {
          isOpen: true,
          onClickOutside: handleClickOutside,
        });

        fireEvent.mouseDown(getOverlay(ctx));

        expect(handleClickOutside).toHaveBeenCalledTimes(1);
      }));
  });

  describe('проверка props', () => {
    sidebarPropSize.forEach((size) => {
      test(`применяется класс для размера ${size}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { isOpen: true, size });

          const sidebarWindow = getRender(ctx);
          expect(sidebarWindow).toHaveClass(cnSidebar('Window', { size }));
        }));
    });
  });
});
