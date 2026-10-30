import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cn } from '../../../utils/bem';
import { FieldGroup } from '../FieldGroup';

createRoot();
clearStack();

const cnFieldGroup = cn('FieldGroup');
const testId = 'FieldGroup';

const TestChild = (props: {
  'form'?: string;
  'size'?: string;
  'className'?: string;
  'data-testid'?: string;
}) => {
  const { form, size, ...otherProps } = props;
  return <div {...otherProps} data-form={form} data-size={size} />;
};

const renderComponent = (
  ctx: TestContext,
  props: React.ComponentProps<typeof FieldGroup>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <FieldGroup {...props} data-testid={testId} />
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement | null;

const getChild = (ctx: TestContext, itemId: string) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${itemId}"]`,
  ) as HTMLElement | null;

describe('Компонент FieldGroup', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() =>
        renderComponent(ctx, {
          children: [<TestChild key="0" data-testid="item-0" />],
        }),
      ).not.toThrow();
    }));

  describe('проверка props', () => {
    test('присваивает базовый класс', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          children: [<TestChild key="0" data-testid="item-0" />],
        });
        expect(getRender(ctx)).toHaveClass(cnFieldGroup());
      }));

    test('присваивает дополнительный className', (ctx) =>
      context.start(async () => {
        const className = 'test-class';
        renderComponent(ctx, {
          className,
          children: [<TestChild key="0" data-testid="item-0" />],
        });
        expect(getRender(ctx)).toHaveClass(className);
      }));

    test('устанавливает ref', (ctx) =>
      context.start(async () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent(ctx, {
          ref,
          children: [<TestChild key="0" data-testid="item-0" />],
        });
        expect(ref.current).toBe(getRender(ctx));
      }));

    test('прокидывает дополнительные атрибуты', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          style: { display: 'flex' },
          children: [<TestChild key="0" data-testid="item-0" />],
        });
        expect(getRender(ctx)).toHaveStyle('display: flex');
      }));
  });

  describe('проверка children', () => {
    test('рендерит всех детей', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          children: [
            <TestChild key="0" data-testid="item-0" />,
            <TestChild key="1" data-testid="item-1" />,
            <TestChild key="2" data-testid="item-2" />,
          ],
        });
        expect(getChild(ctx, 'item-0')).not.toBeNull();
        expect(getChild(ctx, 'item-1')).not.toBeNull();
        expect(getChild(ctx, 'item-2')).not.toBeNull();
      }));

    test('не рендерит детей при пустом массиве', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { children: [] });
        expect(getRender(ctx)?.children.length).toBe(0);
      }));
  });

  describe('проверка size', () => {
    test('прокидывает size всем детям', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          size: 'l',
          children: [
            <TestChild key="0" data-testid="item-0" />,
            <TestChild key="1" data-testid="item-1" />,
            <TestChild key="2" data-testid="item-2" />,
          ],
        });
        expect(getChild(ctx, 'item-0')).toHaveAttribute('data-size', 'l');
        expect(getChild(ctx, 'item-1')).toHaveAttribute('data-size', 'l');
        expect(getChild(ctx, 'item-2')).toHaveAttribute('data-size', 'l');
      }));
  });

  describe('проверка form', () => {
    test('прокидывает form в зависимости от позиции элемента', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          form: 'round',
          children: [
            <TestChild key="0" data-testid="item-0" />,
            <TestChild key="1" data-testid="item-1" />,
            <TestChild key="2" data-testid="item-2" />,
          ],
        });
        expect(getChild(ctx, 'item-0')).toHaveAttribute(
          'data-form',
          'roundClear',
        );
        expect(getChild(ctx, 'item-1')).toHaveAttribute(
          'data-form',
          'brickClear',
        );
        expect(getChild(ctx, 'item-2')).toHaveAttribute(
          'data-form',
          'brickRound',
        );
      }));

    test('использует form="default" по умолчанию', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          children: [
            <TestChild key="0" data-testid="item-0" />,
            <TestChild key="1" data-testid="item-1" />,
            <TestChild key="2" data-testid="item-2" />,
          ],
        });
        expect(getChild(ctx, 'item-0')).toHaveAttribute(
          'data-form',
          'defaultClear',
        );
        expect(getChild(ctx, 'item-2')).toHaveAttribute(
          'data-form',
          'brickDefault',
        );
      }));

    test('для единственного элемента прокидывает форму без изменений', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          form: 'round',
          children: [<TestChild key="0" data-testid="item-0" />],
        });
        expect(getChild(ctx, 'item-0')).toHaveAttribute('data-form', 'round');
      }));
  });
});
