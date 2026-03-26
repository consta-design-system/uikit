import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnFileCanaryBase } from '../FileCanaryBase/FileCanaryBase';
import { fileGenerator } from '../fileCanaryGenerator';
import { FileConfig } from '../types';

const iconDocTestId = 'icon-doc';
const IconDoc = () => <div data-testid={iconDocTestId} />;

const iconXlsTestId = 'icon-xls';
const IconXls = () => <div data-testid={iconXlsTestId} />;

const testId = 'custom-file';

const customConfig: FileConfig = {
  doc: { color: 'var(--file-color-document)', icon: IconDoc },
  xls: { color: 'var(--file-color-table)', icon: IconXls },
};

const CustomFile = fileGenerator(customConfig);

createRoot();
clearStack();

const renderComponent = (
  ctx: TestContext,
  props: React.ComponentProps<typeof CustomFile>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <CustomFile data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement;

describe.concurrent('fileGenerator', () => {
  describe.concurrent('использует переданный конфиг', () => {
    Object.entries(customConfig).forEach(([ext, config]) => {
      test(`для .${ext} отображает правильную иконку и цвет`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { extension: ext });

          const expectedIconTestId =
            ext === 'doc' ? iconDocTestId : iconXlsTestId;

          const extensionElement = getRender(ctx).querySelector(
            `.${cnFileCanaryBase('Extension')}`,
          );
          expect(extensionElement).toBeInTheDocument();
          expect(extensionElement).toHaveTextContent(ext);

          expect(screen.getByTestId(expectedIconTestId)).toBeInTheDocument();
          expect(
            getRender(ctx).style.getPropertyValue('background-color'),
          ).toBe(config.color);
        }));
    });
  });

  test('использует специальный конфиг для неизвестного расширения', (ctx) =>
    context.start(async () => {
      const extension = 'xyz';
      renderComponent(ctx, { extension });
      expect(document.querySelector('.IconFileUnknown')).toBeInTheDocument();
      expect(getRender(ctx).style.getPropertyValue('background-color')).toBe(
        'var(--file-color-unknown)',
      );
      const extensionElement = getRender(ctx).querySelector(
        `.${cnFileCanaryBase('Extension')}`,
      );
      expect(extensionElement).toBeInTheDocument();
      expect(extensionElement).toHaveTextContent(extension);
    }));
});
