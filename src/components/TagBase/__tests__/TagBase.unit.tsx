import { cnIcon } from '@consta/icons/Icon';
import { IconAttach } from '@consta/icons/IconAttach';
import { act, fireEvent } from '@testing-library/react';
import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import {
  cnTagBase,
  TagBase,
  tagBasePropGroup,
  tagBasePropSize,
  tagBasePropView,
} from '../TagBase';

type TagBaseProps = React.ComponentProps<typeof TagBase>;

const testId = cnTagBase();

createRoot();
clearStack();

const renderComponent = (ctx: TestContext, props: TagBaseProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <TagBase data-testid={testId} {...props} />
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement;

const getCancelButton = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnTagBase('CancelButton')}`) as HTMLElement;

const getIcon = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnTagBase('Icon')}`) as HTMLElement;

describe('Компонент TagBase', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, { label: 'label' })).not.toThrow();
    }));

  describe('проверка props', () => {
    const label = 'label';

    describe('проверка label', () => {
      test('отображает текст метки', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { label });
          expect(getRender(ctx).textContent).toEqual(label);
        }));
    });

    describe('проверка size', () => {
      tagBasePropSize.forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { label, size });
            expect(getRender(ctx)).toHaveClass(cnTagBase({ size }));
          }));
      });
    });

    describe('проверка group', () => {
      tagBasePropGroup.forEach((group) => {
        test(`присваивает класс для group=${group}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { label, group });
            expect(getRender(ctx)).toHaveClass(cnTagBase({ group }));
          }));
      });
    });

    describe('проверка view', () => {
      tagBasePropView.forEach((view) => {
        test(`присваивает класс для view=${view}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { label, view });
            expect(getRender(ctx)).toHaveClass(cnTagBase({ view }));
          }));
      });
    });

    describe('проверка withAction', () => {
      test('присваивает класс для withAction', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { label, withAction: true });
          expect(getRender(ctx)).toHaveClass(cnTagBase({ withAction: true }));
        }));
    });

    describe('проверка onCancel', () => {
      test('отображает иконку на кнопке', (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();
          renderComponent(ctx, { label, onCancel: handleClick });
          expect(getCancelButton(ctx).children[0]).toHaveClass(cnIcon());
        }));

      test('кнопка закрытия срабатывает', (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();
          renderComponent(ctx, { label, onCancel: handleClick });
          fireEvent.click(getCancelButton(ctx));
          expect(handleClick).toHaveBeenCalledTimes(1);
        }));
    });

    describe('проверка onClick', () => {
      test('кнопка срабатывает', (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();
          renderComponent(ctx, { label, onClick: handleClick });
          fireEvent.click(getRender(ctx));
          expect(handleClick).toHaveBeenCalledTimes(1);
        }));
    });

    describe('проверка as', () => {
      const tags = ['a', 'div', 'span'] as const;

      tags.forEach((el) => {
        test(`должен рендериться как <${el}>`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { label, as: el });
            expect(getRender(ctx).tagName).toEqual(el.toUpperCase());
          }));
      });
    });

    describe('проверка className', () => {
      test('присваивает className', (ctx) =>
        context.start(async () => {
          const className = 'className';
          renderComponent(ctx, { label, className });
          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe('проверка icon', () => {
      test('отображает иконку', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { label, icon: IconAttach });
          expect(getIcon(ctx)).toHaveClass('IconAttach');
        }));
    });
  });
});
