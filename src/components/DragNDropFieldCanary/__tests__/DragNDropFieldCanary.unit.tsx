import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, waitFor } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { DragNDropField } from '../DragNDropFieldCanary';

createRoot();
clearStack();

type Props = React.ComponentProps<typeof DragNDropField>;

const testId = 'DragNDropFieldCanary';

const renderComponent = (ctx: TestContext, props: Props = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <DragNDropField
            {...props}
            data-testid={testId}
            style={{ width: 100, height: 100 }}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document
    .getElementById(testRootId(ctx))
    ?.querySelector(`[data-testid="${testId}"]`) as HTMLElement;

const createDtWithFiles = (files: File[] = []) => {
  // Create a proper DataTransfer object
  const dataTransfer = new DataTransfer();
  files.forEach((file) => dataTransfer.items.add(file));
  return dataTransfer;
};

const dropFiles = async (ctx: TestContext, files: File[]) => {
  const dataTransfer = createDtWithFiles(files);
  const element = getRender(ctx);

  await act(() => {
    // Simulate the full drag and drop sequence
    const dragEnterEvent = new DragEvent('dragenter', {
      bubbles: true,
      cancelable: true,
      dataTransfer,
    });
    element.dispatchEvent(dragEnterEvent);

    const dragOverEvent = new DragEvent('dragover', {
      bubbles: true,
      cancelable: true,
      dataTransfer,
    });
    element.dispatchEvent(dragOverEvent);

    const dropEvent = new DragEvent('drop', {
      bubbles: true,
      cancelable: true,
      dataTransfer,
    });
    element.dispatchEvent(dropEvent);
  });
};

const file1 = new File(['file1'], 'file1.png', { type: 'image/png' });
const file2 = new File(['file2'], 'file2.txt', { type: 'text/plain' });

describe('Компонент DragNDropFieldCanary', () => {
  test('должен рендериться без ошибок', (ctx) => {
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    });
  });

  test('ref должен быть присвоен', (ctx) => {
    context.start(async () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent(ctx, { ref });

      expect(ref.current).toBe(getRender(ctx));
    });
  });

  test('должен присваиваться дополнительный className', (ctx) => {
    context.start(async () => {
      const className = 'custom-class';
      renderComponent(ctx, { className });

      expect(getRender(ctx)).toHaveClass(className);
    });
  });

  test('не должен реагировать на drop в состоянии disabled', (ctx) => {
    context.start(async () => {
      const onDrop = vi.fn();
      renderComponent(ctx, { onDrop, disabled: true });

      await dropFiles(ctx, [file1]);

      expect(onDrop).not.toHaveBeenCalled();
    });
  });

  describe('проверка children', () => {
    test('рендерит React.ReactNode', (ctx) => {
      context.start(async () => {
        const childText = 'Custom content';
        renderComponent(ctx, { children: <div>{childText}</div> });

        const element = document
          .getElementById(testRootId(ctx))
          ?.querySelector(`:scope > div`) as HTMLElement;
        expect(element).toHaveTextContent(childText);
      });
    });

    test('рендерит с помощью render-функции', (ctx) => {
      context.start(async () => {
        const childText = 'Render prop content';
        renderComponent(ctx, {
          children: () => <div>{childText}</div>,
        });

        const element = document
          .getElementById(testRootId(ctx))
          ?.querySelector(`:scope > div`) as HTMLElement;
        expect(element).toHaveTextContent(childText);
      });
    });
  });

  describe('проверка callback', () => {
    test('onDrop вызывается с принятыми и отклоненными файлами', (ctx) => {
      context.start(async () => {
        const onDrop = vi.fn();
        renderComponent(ctx, {
          onDrop,
          accept: { 'image/png': ['.png'] },
          multiple: true,
        });

        await dropFiles(ctx, [file1, file2]);

        expect(onDrop).toHaveBeenCalledWith(
          [file1],
          expect.any(Array),
          expect.any(Object),
        );
      });
    });

    test('onDropAccepted вызывается с принятыми файлами', (ctx) => {
      context.start(async () => {
        const onDropAccepted = vi.fn();
        renderComponent(ctx, {
          onDropAccepted,
          accept: { 'image/png': ['.png'] },
        });

        await dropFiles(ctx, [file1]);

        expect(onDropAccepted).toHaveBeenCalledWith(
          [file1],
          expect.any(Object),
        );
      });
    });

    test('onDropRejected вызывается с отклоненными файлами', (ctx) => {
      context.start(async () => {
        const onDropRejected = vi.fn();
        const onDropAccepted = vi.fn();
        renderComponent(ctx, {
          onDropRejected,
          onDropAccepted,
          accept: { 'image/png': ['.png'] },
          multiple: true,
        });

        await dropFiles(ctx, [file2]);

        expect(onDropAccepted).not.toHaveBeenCalled();
        expect(onDropRejected).toHaveBeenCalledWith(
          expect.arrayContaining([expect.objectContaining({ file: file2 })]),
          expect.any(Object),
        );
      });
    });
  });

  describe('проверка ограничений', () => {
    test('`multiple=false` принимает только один файл', (ctx) => {
      context.start(async () => {
        const onDropAccepted = vi.fn();
        const onDropRejected = vi.fn();
        renderComponent(ctx, {
          onDropAccepted,
          onDropRejected,
          multiple: false,
        });

        await dropFiles(ctx, [file1, file2]);

        expect(onDropAccepted).not.toHaveBeenCalled();
        expect(onDropRejected).toHaveBeenCalled();
      });
    });

    test('`accept` фильтрует файлы по типу', (ctx) => {
      context.start(async () => {
        const onDropAccepted = vi.fn();
        const onDropRejected = vi.fn();
        renderComponent(ctx, {
          onDropAccepted,
          onDropRejected,
          accept: { 'image/png': ['.png'] },
          multiple: true,
        });

        await dropFiles(ctx, [file1, file2]);
        await waitFor(() => {
          expect(onDropAccepted).toHaveBeenCalledWith(
            [file1],
            expect.any(Object),
          );
        });

        await waitFor(() => {
          expect(onDropRejected).toHaveBeenCalledWith(
            expect.arrayContaining([
              expect.objectContaining({
                file: file2,
              }),
            ]),
            expect.any(Object),
          );
        });
      });
    });
  });
});
