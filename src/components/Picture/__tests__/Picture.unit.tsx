import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { Picture } from '../Picture';
import { PictureProps, PicturePropSrc } from '../types';

createRoot();
clearStack();

const testId = 'Picture';

const renderComponent = (ctx: TestContext, props: PictureProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Picture {...props} data-testid={testId} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid=${testId}]`,
  ) as HTMLImageElement | null;

describe('Компонент Picture', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { src: 'https://example.com/image.jpg' });
      expect(getRender(ctx)).toBeInTheDocument();
    }));

  describe('проверка src', () => {
    test('должен не рендериться если src пустой', (ctx) =>
      context.start(async () => {
        const src = '';
        renderComponent(ctx, { src });

        const img = getRender(ctx);
        expect(img).not.toBeInTheDocument();
      }));

    test('присваивает src изображению', (ctx) =>
      context.start(async () => {
        const src = 'https://example.com/image.jpg';
        renderComponent(ctx, { src });

        const img = getRender(ctx);
        expect(img).toHaveAttribute('src', src);
      }));

    test('рендерит изображение из объекта с несколькими ключами', (ctx) =>
      context.start(async () => {
        const src: PicturePropSrc = {
          'gpnDefault--0--1x': 'https://example.com/image-1x.jpg',
          'gpnDefault--0--2x': 'https://example.com/image-2x.jpg',
        };
        renderComponent(ctx, { src });

        const expectedSrcSet =
          'https://example.com/image-1x.jpg 1x,https://example.com/image-2x.jpg 2x';

        const img = getRender(ctx);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', src['gpnDefault--0--1x']);
        expect(img).toHaveAttribute('srcSet', expectedSrcSet);
      }));
  });

  test('присваивает alt изображению', (ctx) =>
    context.start(async () => {
      const alt = 'Описание изображения';
      renderComponent(ctx, { src: 'https://example.com/image.jpg', alt });

      const img = getRender(ctx);
      expect(img).toHaveAttribute('alt', alt);
    }));

  test('присваивает дополнительный className', (ctx) =>
    context.start(async () => {
      const className = 'custom-class';
      renderComponent(ctx, { src: 'https://example.com/image.jpg', className });

      expect(getRender(ctx)).toHaveClass(className);
    }));

  test('присваивает ref', (ctx) =>
    context.start(async () => {
      const ref = React.createRef<HTMLImageElement>();
      renderComponent(ctx, {
        src: 'https://example.com/image.jpg',
        ref,
      });

      expect(ref.current).toBe(getRender(ctx));
    }));
});
