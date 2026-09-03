import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnColorPickerPoint, ColorPickerPoint } from '../ColorPickerPoint';

createRoot();
clearStack();

type ColorPickerPointProps = React.ComponentProps<typeof ColorPickerPoint>;

const testId = cnColorPickerPoint();

const renderComponent = (ctx: TestContext, props: ColorPickerPointProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ColorPickerPoint data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

describe('Компонент ColorPickerPoint', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () =>
        renderComponent(ctx, {
          color: '#ff0000',
        });

      expect(render).not.toThrow();
    }));

  describe('проверка props', () => {
    const color = '#00ff00';

    describe('проверка className', () => {
      test('присваивает дополнительный класс', (ctx) =>
        context.start(async () => {
          const className = 'custom-class';
          renderComponent(ctx, { color, className });

          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe('проверка style', () => {
      test('присваивает дополнительные стили', (ctx) =>
        context.start(async () => {
          const style = { color: 'red' };
          renderComponent(ctx, { color, style });

          expect(getRender(ctx)).toHaveStyle(style);
        }));
    });

    describe('проверка ref', () => {
      test('ref присваивается элементу', (ctx) =>
        context.start(async () => {
          const ref = React.createRef<HTMLDivElement>();
          renderComponent(ctx, { color, ref });

          expect(ref.current).toBe(getRender(ctx));
        }));
    });

    describe('проверка color', () => {
      test('цвет применяется к внутреннему элементу', (ctx) =>
        context.start(async () => {
          const color = '#123456';
          renderComponent(ctx, { color });

          const fillElement = getRender(ctx).querySelector(
            `.${cnColorPickerPoint('Fill')}`,
          );
          expect(fillElement).toHaveStyle({ backgroundColor: color });
        }));

      test('цвет корректно передается через style', (ctx) =>
        context.start(async () => {
          const color = 'rgb(255, 0, 0)';
          renderComponent(ctx, { color });

          const fillElement = getRender(ctx).querySelector(
            `.${cnColorPickerPoint('Fill')}`,
          );
          expect(fillElement).toHaveStyle({ backgroundColor: color });
        }));
    });
  });
});
