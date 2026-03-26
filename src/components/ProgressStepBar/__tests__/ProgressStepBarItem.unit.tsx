import { IconComponent } from '@consta/icons/Icon';
import { IconDinosaur } from '@consta/icons/IconDinosaur';
import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import {
  progressStepBarPropDirection,
  progressStepBarPropPosition,
  progressStepBarPropSize,
  progressStepBarPropStatus,
} from '../helpers';
import {
  cnProgressStepBarItem,
  ProgressStepBarItem,
} from '../ProgressStepBarItem/ProgressStepBarItem';

createRoot();
clearStack();

type ProgressStepBarItemProps = React.ComponentProps<
  typeof ProgressStepBarItem
>;

const testId = 'ProgressStepBarItem';

const renderComponent = (
  ctx: TestContext,
  props: ProgressStepBarItemProps = { direction: 'horizontal', size: 'm' },
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ProgressStepBarItem {...props} data-testid={testId} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

function getRender(ctx: TestContext) {
  return document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  )!;
}

function getButton(ctx: TestContext) {
  return getRender(ctx).querySelector('button');
}

describe.concurrent('Компонент ProgressStepBarItem', () => {
  test('рендерится без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    test('className применяется', (ctx) =>
      context.start(async () => {
        const className = 'test-class';
        renderComponent(ctx, {
          direction: 'horizontal',
          size: 'm',
          className,
        });
        expect(getRender(ctx)).toHaveClass(className);
      }));

    test('label отображается', (ctx) =>
      context.start(async () => {
        const label = 'Test Label';
        renderComponent(ctx, { direction: 'horizontal', size: 'm', label });
        expect(screen.getByText(label)).toBeInTheDocument();
      }));

    test('content отображается', (ctx) =>
      context.start(async () => {
        const contentText = 'Test Content';
        renderComponent(ctx, {
          direction: 'horizontal',
          size: 'm',
          content: <div>{contentText}</div>,
        });
        expect(screen.getByText(contentText)).toBeInTheDocument();
      }));

    test('point (number) отображается', (ctx) =>
      context.start(async () => {
        const point = 5;
        renderComponent(ctx, { direction: 'horizontal', size: 'm', point });
        expect(screen.getByText(point)).toBeInTheDocument();
      }));

    test('point (Icon) отображается', (ctx) =>
      context.start(async () => {
        const Icon: IconComponent = IconDinosaur;
        renderComponent(ctx, {
          direction: 'horizontal',
          size: 'm',
          point: Icon,
        });
        expect(
          getRender(ctx).querySelector(
            `.${cnProgressStepBarItem('PointIcon')}`,
          ),
        ).toBeInTheDocument();
      }));

    test('progress отображается', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          direction: 'horizontal',
          size: 'm',
          progress: true,
        });
        expect(
          getRender(ctx).querySelector('.ProgressSpin'),
        ).toBeInTheDocument();
      }));

    test('onClick вызывается', (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();
        renderComponent(ctx, {
          direction: 'horizontal',
          size: 'm',
          onClick: handleClick,
        });
        const button = getButton(ctx);
        expect(button).not.toBeNull();
        fireEvent.click(button!);
        expect(handleClick).toHaveBeenCalledTimes(1);
      }));

    test('ref устанавливается', (ctx) =>
      context.start(async () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent(ctx, { direction: 'horizontal', size: 'm', ref });
        expect(ref.current).toBe(getRender(ctx));
      }));

    test('pointRef устанавливается', (ctx) =>
      context.start(async () => {
        const pointRef = React.createRef<HTMLButtonElement>();
        renderComponent(ctx, { direction: 'horizontal', size: 'm', pointRef });
        expect(pointRef.current).toBe(getButton(ctx));
      }));

    describe.concurrent('проверка direction', () => {
      progressStepBarPropDirection.forEach((direction) => {
        test(`присваивает класс для direction=${direction}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { direction, size: 'm' });
            expect(getRender(ctx)).toHaveClass(
              cnProgressStepBarItem({ direction }),
            );
          }));
      });
    });

    describe.concurrent('проверка size', () => {
      progressStepBarPropSize.forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { direction: 'horizontal', size });
            expect(getRender(ctx)).toHaveClass(cnProgressStepBarItem({ size }));
          }));
      });
    });

    describe.concurrent('проверка status', () => {
      progressStepBarPropStatus.forEach((status) => {
        test(`присваивает класс для status=${status}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              direction: 'horizontal',
              size: 'm',
              status,
            });
            expect(getRender(ctx)).toHaveClass(
              cnProgressStepBarItem({ status }),
            );
          }));
      });
    });

    describe.concurrent('проверка position', () => {
      progressStepBarPropPosition.forEach((position) => {
        test(`присваивает класс для position=${position}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              direction: 'horizontal',
              size: 'm',
              position,
            });
            expect(getRender(ctx)).toHaveClass(
              cnProgressStepBarItem({ position }),
            );
          }));
      });
    });

    test('tooltip отображается по наведению', (ctx) =>
      context.start(async () => {
        const tooltipContent = 'Test Tooltip';
        renderComponent(ctx, {
          direction: 'horizontal',
          size: 'm',
          tooltipContent,
        });
        const button = getButton(ctx);
        expect(button).not.toBeNull();
        fireEvent.mouseEnter(button!);
        expect(screen.getByText(tooltipContent)).toBeInTheDocument();
      }));
  });
});
