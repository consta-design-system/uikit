import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnCollapse, Collapse } from '../Collapse';

createRoot();
clearStack();

const testId = cnCollapse();

const defaultChildren = 'Default children';
const defaultLabel = 'Default label';
const additionalClass = 'additionalClass';

const renderComponent = (
  ctx: TestContext,
  {
    label = defaultLabel,
    children = defaultChildren,
    isOpen = false,
    ...props
  }: any,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Collapse
            {...props}
            className={additionalClass}
            data-testid={testId}
            isOpen={isOpen}
            label={label}
          >
            {children}
          </Collapse>
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

const getLabelText = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnCollapse('LabelText')}`);

describe('Компонент Collapse', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe('проверка props', () => {
    describe('проверка label', () => {
      test(`label отображается`, (ctx) =>
        context.start(async () => {
          const label = 'fileName';

          renderComponent(ctx, { label });

          const labelElement = getLabelText(ctx) as HTMLDivElement;

          expect(labelElement.textContent).toEqual(label);
        }));
    });

    describe('проверка onClick', () => {
      test(`клик должен вызвать callback c ожидаемыми параметрами`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();

          renderComponent(ctx, { onClick: handleClick });

          const element = getLabelText(ctx) as HTMLDivElement;

          fireEvent.click(element);
          expect(handleClick).toHaveBeenCalled();
          expect(handleClick).toHaveBeenCalledTimes(1);
        }));
    });
  });
});
