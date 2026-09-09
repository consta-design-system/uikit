import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnSteps, Steps } from '../StepsCanary';
import { cnStepsStep } from '../StepsItem/StepsItem';

createRoot();
clearStack();

type StepsProps = React.ComponentProps<typeof Steps>;
type Item = {
  label: string;
  disabled?: boolean;
};
type OnChange = (value: Item | null, props: { e: React.MouseEvent }) => void;

const testId = 'StepsCanary';

const items: Item[] = [
  {
    label: 'один',
  },
  {
    label: 'два',
  },
  {
    label: 'три',
    disabled: true,
  },
];

const additionalClass = 'additionalClass';

const renderComponent = (
  ctx: TestContext,
  props: {
    size?: StepsProps['size'];
    onChange?: OnChange;
  },
) => {
  const handleChange = vi.fn();

  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Steps
            items={items}
            value={items[0]}
            getItemLabel={(item) => item.label}
            getItemDisabled={(item) => item.disabled || false}
            onChange={props.onChange || handleChange}
            className={additionalClass}
            data-testid={testId}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid=${testId}]`,
  ) as HTMLElement;

const getItems = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnSteps('Item')}`);

const getButtons = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnStepsStep('Button')}`);

const getButton = (ctx: TestContext, index = 0) =>
  getButtons(ctx)[index] as HTMLElement;

describe(`${testId}`, () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe('проверка props', () => {
    describe('проверка items', () => {
      test('количество совпадает с передаваемым', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          const itemsRender = getItems(ctx);
          expect(itemsRender.length).toEqual(items.length);
        }));
    });

    describe('проверка getLabel', () => {
      test('лейбл совпадает', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          expect(
            getItems(ctx)[0].querySelector(`.${cnStepsStep('Label')}`)
              ?.textContent,
          ).toEqual(`${items[0].label}`);
        }));
    });

    describe('проверка className', () => {
      test(`присвоился дополнительный класс`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          expect(getRender(ctx)).toHaveClass(additionalClass);
        }));
    });

    describe('проверка onChange', () => {
      test(`клик по элементу должен вызвать callback`, (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();

          renderComponent(ctx, { onChange: handleChange });

          const item = getButton(ctx, 1);
          fireEvent.click(item);

          expect(handleChange).toHaveBeenCalledTimes(1);
          expect(handleChange).toHaveBeenCalledWith(items[1], {
            e: expect.any(Object),
          });
        }));
    });

    describe('проверка getDisabled', () => {
      test(`клик по disabled элементу не должен вызывать handleChange`, (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();

          renderComponent(ctx, { onChange: handleChange });

          const item = getButton(ctx, 2);
          fireEvent.click(item);

          expect(handleChange).toHaveBeenCalledTimes(0);
        }));
    });
  });
});
