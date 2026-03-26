import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import {
  cnIconFile,
  fileIconPropSize,
} from '../../../fileIcons/FileIcon/FileIcon';
import { cnFile, File } from '../File';

createRoot();
clearStack();

type FileProps = React.ComponentProps<typeof File>;

const testId = cnFile();

const renderComponent = (ctx: TestContext, props: FileProps = {}) => {
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

function getRender(ctx: TestContext) {
  return document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement;
}

function getLoader(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnFile('Loader')}`);
}

describe.concurrent('Компонент File', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка size', () => {
      fileIconPropSize.forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size });
            await wrap(tick());

            expect(getRender(ctx)).toHaveClass(cnIconFile({ size }));
          }));
      });
    });

    describe.concurrent('проверка extension', () => {
      test(`рисует верную иконку для extension=undefined`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());

          expect(getRender(ctx)).toHaveClass('FileIconUndefined');
        }));

      test(`рисует верную иконку для extension=doc`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { extension: 'doc' });
          await wrap(tick());

          expect(getRender(ctx)).toHaveClass('FileIconDoc');
        }));

      test(`рисует верную иконку для extension=undefined`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { extension: 'undefined' });
          await wrap(tick());

          expect(getRender(ctx)).toHaveClass('FileIconUndefined');
        }));
    });

    describe.concurrent('проверка loading', () => {
      test(`рисует верную иконку для loading=true`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { loading: true });
          await wrap(tick());

          expect(getRender(ctx)).toHaveClass('FileIconLoading');
        }));

      test(`при loadingWithProgressSpin = true появляется ProgressSpin`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            loading: true,
            loadingWithProgressSpin: true,
          });
          await wrap(tick());

          expect(getLoader(ctx)).toHaveClass(cnFile('Loader'));
        }));
    });
  });
});
