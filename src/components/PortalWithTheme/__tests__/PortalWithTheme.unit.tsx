import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
} from '##/utils/vitest';

import {
  generateThemeClassNames,
  presetGpnDark,
  presetGpnDefault,
  useTheme,
} from '../../Theme/Theme';
import { PortalWithTheme } from '../PortalWithTheme';

createRoot();
clearStack();

type PortalWithThemeProps = React.ComponentProps<typeof PortalWithTheme>;

const testId = 'PortalWithTheme';

const renderComponent = (
  ctx: TestContext,
  props: Omit<PortalWithThemeProps, 'preset'> & {
    preset?: PortalWithThemeProps['preset'];
  },
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <PortalWithTheme
          {...props}
          preset={props.preset || presetGpnDefault}
          data-testid={testId}
          container={document.getElementById(testPopoverId(ctx))!}
        />
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement | null;

describe.concurrent('Компонент Theme', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe.concurrent('проверка useTheme', () => {
    test('возвращает ожидаемый theme', (ctx) =>
      context.start(async () => {
        const Children = () => {
          const { theme } = useTheme();
          return <>{JSON.stringify(theme)}</>;
        };
        renderComponent(ctx, { children: <Children />, preset: presetGpnDark });
        expect(getRender(ctx)).toHaveTextContent(JSON.stringify(presetGpnDark));
      }));

    test('возвращает ожидаемый themeClassNames', (ctx) =>
      context.start(async () => {
        const Children = () => {
          const { themeClassNames } = useTheme();
          return <>{JSON.stringify(themeClassNames)}</>;
        };
        renderComponent(ctx, { children: <Children />, preset: presetGpnDark });
        expect(getRender(ctx)).toHaveTextContent(
          JSON.stringify(generateThemeClassNames(presetGpnDark)),
        );
      }));
  });
});
