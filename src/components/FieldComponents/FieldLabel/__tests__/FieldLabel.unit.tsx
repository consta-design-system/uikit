import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { IconMock } from '##/../__mocks__/IconMock';
import { iconSpaceMap } from '##/components/FieldComponents/FieldLabel/helpers';
import { cnText } from '##/components/Text';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { cnMixSpace } from '##/mixs/MixSpace';
import { setRef } from '##/utils/setRef';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { cnFieldLabel, FieldLabel } from '..';

createRoot();
clearStack();

type FieldLabelProps = React.ComponentProps<typeof FieldLabel>;

const testId = 'FieldLabel';

const renderComponent = (ctx: TestContext, props: FieldLabelProps = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <FieldLabel data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document
    .getElementById(testRootId(ctx))
    ?.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
const getStar = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnFieldLabel('Star')}`);
const getIcon = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.IconMock`);

describe(`Компонент ${testId}`, () => {
  test('должен рендериться без ошибок', async (ctx) => {
    await context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    });
  });

  describe('проверка ref', () => {
    test(`ref присвоен`, async (ctx) => {
      await context.start(async () => {
        const ref: { current: HTMLElement | null } = { current: null };

        renderComponent(ctx, {
          ref: (el: HTMLElement) => setRef(ref, el),
        });

        await tick();

        expect(ref.current).toBeTruthy();
      });
    });
  });

  describe('проверка className', () => {
    test(`Присваивается дополнительный className`, async (ctx) => {
      await context.start(async () => {
        const className = 'className';

        renderComponent(ctx, { className });

        await tick();

        expect(getRender(ctx)).toHaveClass(className);
      });
    });
  });

  describe('проверка required', () => {
    test(`Отображается элемент ${cnFieldLabel('Star')}`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { required: true });

        await tick();

        expect(getStar(ctx)).not.toBeNull();
      });
    });
  });

  describe('проверка children', () => {
    test(`Отображается children`, async (ctx) => {
      await context.start(async () => {
        const children = 'children';

        renderComponent(ctx, { children });

        await tick();

        expect(getRender(ctx)).toHaveTextContent(children);
      });
    });
  });

  describe('проверка icon', () => {
    test(`Отображается icon`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {
          icon: IconMock,
        });

        await tick();

        expect(getIcon(ctx)).toHaveTextContent('IconMock');
      });
    });
  });

  describe('проверка iconRef', () => {
    test(`iconRef присвоен`, async (ctx) => {
      await context.start(async () => {
        const ref: { current: HTMLElement | null } = { current: null };
        renderComponent(ctx, {
          icon: IconMock,
          iconRef: (el: HTMLElement) => setRef(ref, el),
        });

        await tick();

        expect(ref.current).toBeTruthy();
      });
    });
  });

  describe('проверка size', () => {
    const sizes = ['s', 'm', 'l', 'xs'] as const;
    sizes.forEach((size) => {
      test(`Должен рендериться как ${cnText({
        size,
      })}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { size });

          await tick();

          expect(getRender(ctx)).toHaveClass(cnText({ size }));
        });
      });
    });
  });

  describe('проверка as', () => {
    const tags = ['a', 'div', 'span'] as const;

    tags.forEach((el) => {
      test(`должен рендериться как <${el}>`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { as: el });

          await tick();

          expect(getRender(ctx)?.tagName).toEqual(el.toUpperCase());
        });
      });
    });
  });

  describe('проверка other props', () => {
    const props = ['data-attr', 'role', 'id'] as const;

    props.forEach((prop) => {
      test(`присваивается  ${prop}=${prop}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { [prop]: prop });

          await tick();

          expect(getRender(ctx)).toHaveAttribute(prop, prop);
        });
      });
    });
  });

  describe('проверка lineHeight', () => {
    test('Присваивается lineHeight="m"', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        expect(getRender(ctx)).toHaveClass(cnText({ lineHeight: 'm' }));
      });
    });
  });

  describe('проверка view', () => {
    test('Присваивается view="secondary"', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        expect(getRender(ctx)).toHaveClass(cnText({ view: 'secondary' }));
      });
    });
  });

  describe('проверка icon size', () => {
    const sizes = ['xs', 's', 'm', 'l'] as const;
    sizes.forEach((size) => {
      test(`Иконка имеет корректный отступ для size=${size}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { size, icon: IconMock });

          await tick();

          expect(getIcon(ctx)).toHaveClass(
            cnMixSpace({ mL: iconSpaceMap[size] }),
          );
        });
      });
    });
  });

  describe('проверка required', () => {
    test('Элемент * отображается, если required=true', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { required: true });

        await tick();

        expect(getStar(ctx)).toBeInTheDocument();
      });
    });

    test('Элемент * не отображается, если required=false', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { required: false });

        await tick();

        expect(getStar(ctx)).toBeNull();
      });
    });
  });
});
