import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { DateTime, dateTimePropType, dateTimePropView } from '../DateTime';
import { getRender, testId } from './helpers';

createRoot();
clearStack();

type DateTimeProps = React.ComponentProps<typeof DateTime>;

const renderComponent = (ctx: TestContext, props: DateTimeProps = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <DateTime {...props} data-testid={testId} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe.concurrent('Компонент DateTime', () => {
  describe.concurrent('рендериться без ошибок', () => {
    test('должен рендериться без ошибок', (ctx) =>
      context.start(async () => {
        expect(() => renderComponent(ctx, {})).not.toThrow();
      }));

    dateTimePropType.forEach((type) => {
      dateTimePropView.forEach((view) => {
        test(`должен рендериться без ошибок при type="${type}" view="${view}"`, (ctx) =>
          context.start(async () => {
            expect(() => renderComponent(ctx, { type, view })).not.toThrow();
          }));
      });
    });
  });

  describe.concurrent('проверка className', () => {
    dateTimePropType.forEach((type) => {
      dateTimePropView.forEach((view) => {
        test(`className присваивается при type="${type}" view="${view}"`, (ctx) =>
          context.start(async () => {
            const className = 'className';

            renderComponent(ctx, { className, type, view });

            expect(getRender(ctx)).toHaveClass(className);
          }));
      });
    });
  });

  describe.concurrent('проверка ref', () => {
    dateTimePropType.forEach((type) => {
      dateTimePropView.forEach((view) => {
        test(`добавление аттрибута с помощью ref при type="${type}" view="${view}"`, (ctx) =>
          context.start(async () => {
            const refAttrName = 'data-test-ref';
            const refAttrValue = 'test-ref';
            const ref = { current: null } as React.RefObject<HTMLDivElement>;
            renderComponent(ctx, { type, view, ref });
            if (ref.current) {
              ref.current.setAttribute(refAttrName, refAttrValue);
            }
            expect(getRender(ctx)).toHaveAttribute(refAttrName, refAttrValue);
          }));
      });
    });
  });
});
