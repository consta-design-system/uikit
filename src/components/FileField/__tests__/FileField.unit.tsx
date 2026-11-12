import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { Button } from '##/components/Button/Button';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnFileField, FileField } from '../FileField';

createRoot();
clearStack();

type ComponentProps = React.ComponentProps<typeof FileField>;

const testId = cnFileField();

const renderComponent = (ctx: TestContext, props: ComponentProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <FileField {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe('Компонент FileField', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () =>
        renderComponent(ctx, {
          id: testId,
          children: (props) => (
            <Button data-testid={testId} label="label" {...props} />
          ),
        });

      expect(render).not.toThrow();
    }));

  describe('проверка children', () => {
    test(`отображается прокинутый компонент`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          id: testId,
          children: (props) => (
            <Button data-testid={testId} label="label" {...props} />
          ),
        });

        const fileField = document.querySelector(
          `[data-testid="${testId}"]`,
        ) as HTMLElement;
        expect(fileField).toBeInTheDocument();
      }));

    test(`прокинутый компонент имеет тег span`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          id: testId,
          children: (props) => (
            <Button data-testid={testId} label="label" {...props} />
          ),
        });

        const fileField = document.querySelector(
          `[data-testid="${testId}"]`,
        ) as HTMLElement;
        expect(fileField.tagName).toEqual('SPAN');
      }));
  });
});
