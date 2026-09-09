import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React, { createRef } from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { cn } from '##/utils/bem';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import {
  cnFileCanaryBase,
  FileBase,
} from '../../FileCanaryBase/FileCanaryBase';
import { filePropSize } from '../../types';

const cnIconFile = cn('TestIcon');
const iconTestID = 'test-icon';
const TestIcon = () => (
  <div data-testid={iconTestID} className={cnIconFile()} />
);

const defaultProps = {
  size: 'm' as const,
  extension: 'txt',
  icon: TestIcon,
  color: 'red',
};
const testId = cnFileCanaryBase();

createRoot();
clearStack();

const renderComponent = (
  ctx: TestContext,
  props: Partial<React.ComponentProps<typeof FileBase>> = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <FileBase data-testid={testId} {...defaultProps} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement;

const getIcon = (ctx: TestContext) =>
  document.querySelector(`#${testRootId(ctx)} [data-testid="${iconTestID}"]`);

describe('Компонент FileBase', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      renderComponent(ctx);
      expect(getRender(ctx)).toBeInTheDocument();
    }));

  describe('проверка props', () => {
    describe('проверка size', () => {
      filePropSize.forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size });
            expect(getRender(ctx)).toHaveClass(cnFileCanaryBase({ size }));
          }));
      });
    });

    describe('проверка extension', () => {
      test('не пустой extension', (ctx) =>
        context.start(async () => {
          const extension = 'pdf';
          renderComponent(ctx, { extension });
          const extensionElement = getRender(ctx).querySelector(
            `.${cnFileCanaryBase('Extension')}`,
          );
          expect(extensionElement).toBeInTheDocument();
          expect(extensionElement).toHaveTextContent(extension);
        }));

      test('пустой extension', (ctx) =>
        context.start(async () => {
          const extension = '';
          renderComponent(ctx, { extension });
          const extensionElement = getRender(ctx).querySelector(
            `.${cnFileCanaryBase('Extension')}`,
          );
          expect(extensionElement).toBeInTheDocument();
          expect(extensionElement).toHaveTextContent(extension);
        }));
    });

    test('проверка icon', (ctx) =>
      context.start(async () => {
        renderComponent(ctx);
        expect(getIcon(ctx)).toBeInTheDocument();
        expect(getIcon(ctx)?.parentElement).toHaveClass(
          cnFileCanaryBase('IconContainer'),
        );
      }));

    test('проверка color', (ctx) =>
      context.start(async () => {
        const color = 'var(--test-color)';
        renderComponent(ctx, { color });
        expect(getRender(ctx)).toHaveStyle(`background-color: ${color}`);
      }));

    test('проверка className', (ctx) =>
      context.start(async () => {
        const customClass = 'custom-class';
        renderComponent(ctx, { className: customClass });
        expect(getRender(ctx)).toHaveClass(customClass);
      }));
  });

  describe('проверка полиморфизма as и ref', () => {
    test('рендерится с тегом по умолчанию (div)', (ctx) =>
      context.start(async () => {
        renderComponent(ctx);
        expect(getRender(ctx).tagName).toBe('DIV');
      }));

    test('рендерится с переданным тегом (span)', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { as: 'span' });
        expect(getRender(ctx).tagName).toBe('SPAN');
      }));

    test('рендерится с тегом a и принимает атрибут href', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { as: 'a' });
        expect(getRender(ctx).tagName).toBe('A');
      }));

    test('переданный ref указывает на DOM-элемент', (ctx) =>
      context.start(async () => {
        const ref = createRef<HTMLElement>();
        renderComponent(ctx, { ref });
        expect(ref.current).toBe(getRender(ctx));
      }));
  });
});
