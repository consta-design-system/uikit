import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { IconMock } from '##/../__mocks__/IconMock';
import { cnFieldLabel } from '##/components/FieldComponents';
import { cnText } from '##/components/Text';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { cnMixFlex } from '##/mixs/MixFlex';
import { setRef } from '##/utils/setRef';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { fieldPropStatus } from '../../__mocks__/variants';
import { FieldWrapper } from '..';
import { cnFieldWrapper } from '../cnFieldWrapper';
import { directionMap, spaceMap } from '../helpers';

createRoot();
clearStack();

type Props = React.ComponentProps<typeof FieldWrapper>;

const testId = 'FieldWrapper';

const renderComponent = (
  ctx: TestContext,
  {
    children = undefined,
    ...props
  }: Omit<Props, 'children'> & { children?: React.ReactNode } = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <FieldWrapper data-testid={testId} {...props}>
            {children}
          </FieldWrapper>
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document
    .getElementById(testRootId(ctx))
    ?.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
const getLabel = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnFieldLabel()}`) as HTMLElement;
const getLabelIcon = (ctx: TestContext) =>
  getLabel(ctx)?.querySelector(`.IconMock`);
const getCaption = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnFieldWrapper('Caption')}`) as HTMLElement;
const getStart = (ctx: TestContext) =>
  getLabel(ctx)?.querySelector(`.${cnFieldLabel('Star')}`);
const getSide = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnFieldWrapper('Side')}`);
const getSideText = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnFieldWrapper('SideText')}`);
const getCounter = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnFieldWrapper('Counter')}`);

describe(`Компонент ${testId}`, () => {
  test('должен рендериться без ошибок', async (ctx) => {
    await context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    });
  });

  describe('проверка ref', () => {
    test(`ref присвоен`, async (ctx) => {
      await context.start(async () => {
        const ref: { current: HTMLDivElement | null } = { current: null };

        renderComponent(ctx, {
          ref: (el: HTMLDivElement) => setRef(ref, el),
        });

        await tick();

        expect(ref.current).toBeTruthy();
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

  describe('проверка children', () => {
    test(`Пробрасывается children`, async (ctx) => {
      await context.start(async () => {
        const children = 'children';

        renderComponent(ctx, { children });

        await tick();

        expect(getRender(ctx)).toHaveTextContent(children);
      });
    });
  });

  describe('проверка label', () => {
    test(`Пробрасывается label`, async (ctx) => {
      await context.start(async () => {
        const label = 'label';

        renderComponent(ctx, { label });

        await tick();

        expect(getLabel(ctx)).toHaveTextContent(label);
      });
    });

    test(`при отсутствие label ${cnFieldLabel()} не рендериться`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { label: undefined });

        await tick();

        expect(getLabel(ctx)).toBeNull();
      });
    });
  });

  describe('проверка size', () => {
    const sizes = ['s', 'm', 'l', 'xs'] as const;
    sizes.forEach((size) => {
      test(`${cnFieldLabel()} рендериться как ${cnText({
        size,
      })}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { size, label: 'label' });

          await tick();

          expect(getLabel(ctx)).toHaveClass(cnText({ size }));
        });
      });
    });

    sizes.forEach((size) => {
      test(`gap для ${cnMixFlex(
        {},
      )} при size=${size} вычислен и присвоен`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { size, label: 'label' });

          await tick();

          expect(getRender(ctx)).toHaveClass(
            cnMixFlex({ gap: spaceMap[size] }),
          );
        });
      });
    });
  });

  describe('проверка labelIcon', () => {
    test(`Отображается icon`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {
          label: 'label',
          labelIcon: IconMock,
        });

        await tick();

        expect(getLabelIcon(ctx)).toHaveTextContent('IconMock');
      });
    });
  });

  describe('проверка labelIconRef', () => {
    test(`iconRef присвоен`, async (ctx) => {
      await context.start(async () => {
        const ref: { current: HTMLElement | null } = { current: null };
        renderComponent(ctx, {
          label: 'label',
          labelIcon: IconMock,
          labelIconRef: (el: HTMLElement) => setRef(ref, el),
        });

        await tick();

        expect(ref.current).toBeTruthy();
      });
    });
  });

  describe('проверка caption', () => {
    test(`Пробрасывается caption`, async (ctx) => {
      await context.start(async () => {
        const caption = 'caption';

        renderComponent(ctx, { caption });

        await tick();

        expect(getCaption(ctx)).toHaveTextContent(caption);
      });
    });

    test(`при отсутствие caption ${cnFieldLabel()} не рендериться`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { label: undefined });

        await tick();

        expect(getCaption(ctx)).toBeNull();
      });
    });
  });

  describe('проверка required', () => {
    test(`Отображается элемент ${cnFieldLabel('Star')}`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { label: 'label', required: true });

        await tick();

        expect(getStart(ctx)).not.toBeNull();
      });
    });
  });

  describe('проверка status', () => {
    const tags = [...fieldPropStatus, undefined] as const;
    tags.forEach((status) => {
      test(`${cnFieldWrapper('Caption')} должен рендериться как ${cnText({
        view: status || 'ghost',
      })}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { status, caption: 'caption' });

          await tick();

          expect(getCaption(ctx)).toHaveClass(
            cnText({ view: status || 'ghost' }),
          );
        });
      });
    });
  });

  describe('проверка side', () => {
    test(`Отображается элемент ${cnFieldWrapper('Side')}`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { side: 'side' });

        await tick();

        expect(getSide(ctx)).not.toBeNull();
      });
    });

    test(`Не отображается элемент ${cnFieldWrapper(
      'Side',
    )} если side не указан`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        expect(getSide(ctx)).toBeNull();
      });
    });

    test(`Отображается элемент ${cnFieldWrapper(
      'SideText',
    )} если side строка`, async (ctx) => {
      await context.start(async () => {
        const side = 'side';
        renderComponent(ctx, { side });

        await tick();

        expect(getSideText(ctx)).not.toBeNull();
        expect(getSideText(ctx)).toHaveTextContent(side);
      });
    });

    test(`Не отображается элемент ${cnFieldWrapper(
      'SideText',
    )} если side не строка`, async (ctx) => {
      await context.start(async () => {
        const side = 'side';
        renderComponent(ctx, { side: <div>{side}</div> });

        await tick();

        expect(getSideText(ctx)).toBeNull();
        expect(getSide(ctx)).toHaveTextContent(side);
      });
    });
  });

  describe('проверка counter', () => {
    test(`Отображается элемент ${cnFieldLabel('Counter')}`, async (ctx) => {
      await context.start(async () => {
        const counter = '10/100';
        renderComponent(ctx, { counter });

        await tick();

        expect(getCounter(ctx)).not.toBeNull();
        expect(getCounter(ctx)).toHaveTextContent(counter);
      });
    });

    test(`Форматирование counter`, async (ctx) => {
      await context.start(async () => {
        const counter = [10, 100] as [number, number];
        renderComponent(ctx, { counter });

        await tick();

        expect(getCounter(ctx)).not.toBeNull();
        expect(getCounter(ctx)).toHaveTextContent('10/100');
      });
    });
  });

  describe('проверка labelPosition', () => {
    const labelPositions = ['top', 'left'] as const;
    labelPositions.forEach((labelPosition) => {
      test(`direction применяется в соответствии с directionMap (labelPosition = ${labelPosition})`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { labelPosition });

          await tick();

          expect(getRender(ctx)).toHaveClass(
            cnMixFlex({ direction: directionMap[labelPosition] }),
          );
        });
      });
    });

    test(`gap для ${cnMixFlex(
      {},
    )} при labelPosition ==! 'top', должен быть 's'`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { labelPosition: 'left' });

        await tick();

        expect(getRender(ctx)).toHaveClass(cnMixFlex({ gap: 's' }));
      });
    });
  });

  describe('проверка labelHtmlFor', () => {
    test(`атрибут for присвоился к ${cnFieldLabel()} и отрендерил как <label>`, async (ctx) => {
      await context.start(async () => {
        const labelHtmlFor = 'id';
        renderComponent(ctx, { labelHtmlFor, label: 'label' });

        await tick();

        expect(getLabel(ctx)).toHaveAttribute('for', labelHtmlFor);
        expect(getLabel(ctx)?.tagName).toEqual('LABEL');
      });
    });
  });

  describe('проверка renderCounter', () => {
    test('Отображается корректный counter, если передана строка', async (ctx) => {
      await context.start(async () => {
        const counter = '10/100';
        renderComponent(ctx, { counter });

        await tick();

        expect(getCounter(ctx)).toHaveTextContent(counter);
      });
    });

    test('Отображается корректный counter, если передан массив', async (ctx) => {
      await context.start(async () => {
        const counter: [number, number] = [10, 100];
        renderComponent(ctx, { counter });

        await tick();

        expect(getCounter(ctx)).toHaveTextContent('10/100');
      });
    });

    test('Отображается корректный counter, если передано число', async (ctx) => {
      await context.start(async () => {
        const counter = 50;
        renderComponent(ctx, { counter });

        await tick();

        expect(getCounter(ctx)).toHaveTextContent('50');
      });
    });

    test('Не отображается counter, если он не передан', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        expect(getCounter(ctx)).toBeNull();
      });
    });
  });

  describe('проверка renderSide', () => {
    test('Отображается side, если передана строка', async (ctx) => {
      await context.start(async () => {
        const side = 'side text';
        renderComponent(ctx, { side });

        await tick();

        expect(getSideText(ctx)).toHaveTextContent(side);
      });
    });

    test('Отображается side, если передан React элемент', async (ctx) => {
      await context.start(async () => {
        const side = <div>Custom Side</div>;
        renderComponent(ctx, { side });

        await tick();

        expect(getSide(ctx)).toHaveTextContent('Custom Side');
      });
    });

    test('Не отображается side, если он не передан', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        expect(getSide(ctx)).toBeNull();
      });
    });
  });

  describe('проверка FieldCaption', () => {
    test('Отображается caption, если он передан', async (ctx) => {
      await context.start(async () => {
        const caption = 'Test Caption';
        renderComponent(ctx, { caption });

        await tick();

        expect(getCaption(ctx)).toHaveTextContent(caption);
      });
    });

    test('Не отображается caption, если он не передан', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        expect(getCaption(ctx)).toBeNull();
      });
    });

    test('Применяется корректный статус для caption', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { caption: 'Caption', status: 'alert' });

        await tick();

        expect(getCaption(ctx)).toHaveClass(cnText({ view: 'alert' }));
      });
    });
  });
});
