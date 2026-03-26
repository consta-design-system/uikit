import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React, { createRef } from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { defaultConfig } from '../config';
import { File } from '../FileCanary';
import { cnFileCanaryBase } from '../FileCanaryBase/FileCanaryBase';

createRoot();
clearStack();

type ComponentProps = React.ComponentProps<typeof File>;

const testId = 'default-file';

const renderComponent = (ctx: TestContext, props: ComponentProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <File data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

describe.concurrent('Компонент File', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () => renderComponent(ctx, { extension: 'pdf' });
      await wrap(tick());
      expect(render).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка extensions', () => {
      Object.entries(defaultConfig).forEach(([ext, config]) => {
        test(`для .${ext} использует правильный цвет`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { extension: ext });
            await wrap(tick());

            const element = getRender(ctx);
            expect(element.style.getPropertyValue('background-color')).toBe(
              `${config.color}`,
            );

            const extensionElement = element.querySelector(
              `.${cnFileCanaryBase('Extension')}`,
            );
            expect(extensionElement).toBeInTheDocument();
            expect(extensionElement).toHaveTextContent(ext);
          }));
      });
    });

    test('передаёт пропс size в FileBase', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { extension: 'pdf', size: 's' });
        await wrap(tick());

        const element = getRender(ctx);
        expect(element).toHaveClass(cnFileCanaryBase({ size: 's' }));
      }));

    test('передаёт пропс className в FileBase', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { extension: 'doc', className: 'extra-class' });
        await wrap(tick());

        const element = getRender(ctx);
        expect(element).toHaveClass('extra-class');
      }));
  });

  describe.concurrent('проверка полиморфизма as и ref', () => {
    const extension = 'doc';

    test('рендерится с тегом по умолчанию (div)', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { extension });
        await wrap(tick());

        const element = getRender(ctx);
        expect(element.tagName).toBe('DIV');
      }));

    test('рендерится с переданным тегом (span)', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { as: 'span', extension });
        await wrap(tick());

        const element = getRender(ctx);
        expect(element.tagName).toBe('SPAN');
      }));

    test('рендерится с тегом a и принимает атрибут href', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { as: 'a', extension });
        await wrap(tick());

        const element = getRender(ctx);
        expect(element.tagName).toBe('A');
      }));

    test('переданный ref указывает на DOM-элемент', (ctx) =>
      context.start(async () => {
        const ref = createRef<HTMLElement>();
        renderComponent(ctx, { ref, extension });
        await wrap(tick());

        const element = getRender(ctx);
        expect(ref.current).toBe(element);
      }));
  });

  test('использует специальный конфиг для неизвестного расширения', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { extension: 'custom' });
      await wrap(tick());

      const element = getRender(ctx);
      expect(element.style.getPropertyValue('background-color')).toBe(
        'var(--file-color-unknown)',
      );

      const iconElement = element.querySelector('.IconFileUnknown');
      expect(iconElement).toBeInTheDocument();

      const extensionElement = element.querySelector(
        `.${cnFileCanaryBase('Extension')}`,
      );
      expect(extensionElement).toHaveTextContent('custom');
    }));
});
