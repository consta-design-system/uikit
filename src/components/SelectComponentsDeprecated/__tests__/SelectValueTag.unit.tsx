import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnTagBase } from '../../TagBase/TagBase';
import {
  cnSelectValueTag,
  SelectValueTag,
} from '../SelectValueTag/SelectValueTag';

createRoot();
clearStack();

type Props = React.ComponentProps<typeof SelectValueTag>;

const defaultProps: Props = {
  size: 's',
  label: 'Default label',
};

const renderComponent = (ctx: TestContext, props: Partial<Props> = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <SelectValueTag {...defaultProps} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} .${cnSelectValueTag()}`,
  ) as HTMLElement | null;

const getTagCancelButton = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(
    `.${cnTagBase('CancelButton')}`,
  ) as Element | null;

const clickCancelButton = (ctx: TestContext) => {
  const button = getTagCancelButton(ctx);
  if (button) {
    fireEvent.click(button);
  }
};

describe.concurrent('Компонент SelectValueTag', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    test('проверка label', (ctx) =>
      context.start(async () => {
        const label = 'Test label';
        renderComponent(ctx, { label });
        expect(getRender(ctx)).toHaveTextContent(label);
      }));

    describe.concurrent('проверка size', () => {
      (['s', 'm', 'l'] as const).forEach((size) => {
        test(`присваивает класс для size = ${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size, label: 'Test label' });

            expect(getRender(ctx)).toHaveClass(cnSelectValueTag({ size }));
          }));
      });
    });

    test('проверка handleRemove', (ctx) =>
      context.start(async () => {
        const handleRemove = vi.fn();
        renderComponent(ctx, { handleRemove });

        clickCancelButton(ctx);

        expect(handleRemove).toHaveBeenCalled();
      }));
  });
});
