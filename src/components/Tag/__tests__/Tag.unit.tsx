import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { getParams, Tag, tagPropMode } from '../Tag';

type TagProps = React.ComponentProps<typeof Tag>;

const testId = 'Tag';

createRoot();
clearStack();

const renderComponent = (ctx: TestContext, props: TagProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Tag data-testid={testId} {...props} />
      </reatomContext.Provider>,
    );
  });
};

const getTag = (ctx: TestContext) =>
  document.querySelector(`#${testRootId(ctx)} [data-testid="${testId}"]`)!;

describe.concurrent('Компонент Tag', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() =>
        renderComponent(ctx, { label: 'sss', mode: 'link' }),
      ).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    const label = 'label';

    describe.concurrent('проверка className', () => {
      const className = 'className';

      test('присваивает className', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { label, className, mode: 'link' });
          expect(getTag(ctx)).toHaveClass(className);
        }));
    });

    describe.concurrent('проверка disabled', () => {
      test('при disabled=true отключает onClick в mode=button', (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();
          renderComponent(ctx, {
            label,
            disabled: true,
            mode: 'button',
            onClick: handleClick,
          });

          expect(getTag(ctx)).toBeDisabled();
          fireEvent.click(getTag(ctx));
          expect(handleClick).not.toBeCalled();
        }));

      test('при disabled=true отключает onChange в mode=check', (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();
          renderComponent(ctx, {
            label,
            disabled: true,
            checked: false,
            mode: 'check',
            onChange: handleChange,
          });

          expect(getTag(ctx)).toBeDisabled();
          fireEvent.click(getTag(ctx));
          expect(handleChange).not.toBeCalled();
        }));

      test('при disabled=true отключает onCancel в mode=cancel', (ctx) =>
        context.start(async () => {
          const handleCancel = vi.fn();
          renderComponent(ctx, {
            label,
            disabled: true,
            mode: 'cancel',
            onCancel: handleCancel,
          });

          fireEvent.click(getTag(ctx));
          expect(handleCancel).not.toBeCalled();
        }));

      test('при disabled=true отключает ссылку в mode=link', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            label,
            disabled: true,
            mode: 'link',
            href: '#',
          });

          expect(getTag(ctx)).not.toHaveAttribute('href');
        }));
    });
  });

  describe.concurrent('проверка getParams', () => {
    const onClick = vi.fn();
    const onCancel = vi.fn();
    const checked = true;

    const testModeButton = {
      view: 'filled',
      onClick,
      as: 'button',
      withAction: true,
    };

    const testModeLink = {
      view: 'filled',
      onClick,
      as: 'a',
      withAction: true,
    };

    const testModeCheck = {
      view: checked ? 'filled' : 'stroked',
      onClick: undefined,
      as: 'button',
      withAction: true,
    };

    const testModeCancel = {
      view: 'filled',
      onCancel,
      as: 'span',
    };

    const testModeInfo = {
      view: 'filled',
      as: 'span',
    };

    tagPropMode.forEach((mode) => {
      test(`возвращает верный объект при mode=${mode}`, (ctx) =>
        context.start(async () => {
          const params = getParams(mode, checked, onClick, undefined, onCancel);

          switch (mode) {
            case 'check':
              expect(params).toEqual(testModeCheck);
              return;
            case 'button':
              expect(params).toEqual(testModeButton);
              return;
            case 'link':
              expect(params).toEqual(testModeLink);
              return;
            case 'cancel':
              expect(params).toEqual(testModeCancel);
              return;
            case 'info':
              expect(params).toEqual(testModeInfo);
          }
        }));
    });
  });
});
