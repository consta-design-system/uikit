import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import {
  cnTheme,
  generateThemeClassNames,
  presetGpnDark,
  presetGpnDefault,
  Theme,
  useTheme,
} from '../Theme';

type ThemeProps = React.ComponentProps<typeof Theme>;

const testId = cnTheme();

createRoot();
clearStack();

const renderComponent = (
  ctx: TestContext,
  props: Omit<ThemeProps, 'preset'> & { preset?: ThemeProps['preset'] },
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme
          {...props}
          preset={props.preset || presetGpnDefault}
          data-testid={testId}
        />
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document
    .getElementById(testRootId(ctx))!
    .querySelector(`[data-testid="${testId}"]`);

describe('Компонент Theme', () => {
  test('должен рендериться без ошибок', async (ctx) => {
    await context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    });
  });

  describe('проверка useTheme', () => {
    test('возвращает ожидаемый theme', async (ctx) => {
      await context.start(async () => {
        const Children = () => {
          const { theme } = useTheme();
          return <>{JSON.stringify(theme)}</>;
        };
        renderComponent(ctx, { children: <Children />, preset: presetGpnDark });
        expect(getRender(ctx)).toHaveTextContent(JSON.stringify(presetGpnDark));
      });
    });

    test('возвращает ожидаемый themeClassNames', async (ctx) => {
      await context.start(async () => {
        const Children = () => {
          const { themeClassNames } = useTheme();
          return <>{JSON.stringify(themeClassNames)}</>;
        };
        renderComponent(ctx, { children: <Children />, preset: presetGpnDark });
        expect(getRender(ctx)).toHaveTextContent(
          JSON.stringify(generateThemeClassNames(presetGpnDark)),
        );
      });
    });
  });
});
